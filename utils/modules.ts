// use client-safe supabase import aus deinem Repo
import { supabase } from '@/utils/supabase'

export async function fetchProfileProgress() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { percent: 0, completed_modules: 0, total_modules: 10 }

  const { data } = await supabase
    .from('v_user_modules_progress')
    .select('percent, completed_modules, total_modules')
    .eq('user_id', user.id)
    .single()
  return data ?? { percent: 0, completed_modules: 0, total_modules: 10 }
}

export async function listModulesWithState() {
  const { data: modules, error } = await supabase
    .from('modules')
    .select('id, title, sort_order')
    .order('sort_order', { ascending: true })
  if (error) throw error

  const { data: prog } = await supabase
    .from('module_progress')
    .select('module_id, status')

  const doneSet = new Set((prog ?? []).filter(p => p.status === 'done').map(p => p.module_id))
  return (modules ?? []).map(m => ({ ...m, done: doneSet.has(m.id) }))
}

export async function setModuleDone(moduleId: number, done: boolean) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not signed in')
  await supabase.from('module_progress').upsert({
    user_id: user.id,
    module_id: moduleId,
    status: done ? 'done' : 'in_progress'
  })
}

export async function canTakeExam() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data } = await supabase
    .from('v_user_exam_access')
    .select('can_take_exam')
    .eq('user_id', user.id)
    .single()
  return !!data?.can_take_exam
}

