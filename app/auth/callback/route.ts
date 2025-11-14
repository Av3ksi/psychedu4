import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  console.log('AuthCallback: Processing callback');
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  // Locale aus Route-Parametern
  const locale = params.locale || 'de';

  if (!code) {
    console.log('AuthCallback: No code present, redirecting to login');
    return NextResponse.redirect(new URL(`/${locale}/login`, requestUrl.origin));
  }

  try {
    console.log('AuthCallback: Exchanging code for session');
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('AuthCallback: Error:', error.message);
      return NextResponse.redirect(
        new URL(`/${locale}/login?error=auth-failed`, requestUrl.origin)
      );
    }

    console.log('AuthCallback: Success, redirecting to dashboard');
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, requestUrl.origin));

  } catch (err) {
    console.error('AuthCallback: Unexpected error:', err);
    return NextResponse.redirect(new URL(`/${locale}/login?error=unexpected`, requestUrl.origin));
  }
}