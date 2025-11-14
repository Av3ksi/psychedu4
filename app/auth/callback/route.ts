import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  // Standardmäßig 'de', aber kann über ?locale=en überschrieben werden
  const locale = requestUrl.searchParams.get('locale') || 'de';

  if (!code) {
    return NextResponse.redirect(new URL(`/${locale}/login`, requestUrl.origin));
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        new URL(`/${locale}/login?error=auth-failed`, requestUrl.origin)
      );
    }

    return NextResponse.redirect(new URL(`/${locale}/dashboard`, requestUrl.origin));

  } catch (err) {
    console.error('AuthCallback: Unexpected error:', err);
    return NextResponse.redirect(new URL(`/${locale}/login?error=unexpected`, requestUrl.origin));
  }
}


