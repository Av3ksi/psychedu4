import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  // Extrahiere locale aus der URL
  const pathname = requestUrl.pathname;
  const locale = pathname.split('/')[1] || 'de';

  if (!code) {
    return NextResponse.redirect(new URL(`/${locale}/login`, requestUrl.origin));
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(
        new URL(`/${locale}/login?error=auth-failed`, requestUrl.origin)
      );
    }

    return NextResponse.redirect(new URL(`/${locale}/dashboard`, requestUrl.origin));

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.redirect(new URL(`/${locale}/login?error=unexpected`, requestUrl.origin));
  }
}