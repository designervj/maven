import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/i18n';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localePrefix = SUPPORTED_LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!localePrefix) {
    request.nextUrl.pathname = `/en${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(request.nextUrl);
  }

  if (localePrefix === DEFAULT_LOCALE) {
    const pathWithoutLocale = pathname.replace(/^\/en/, '') || '/';
    request.nextUrl.pathname = pathWithoutLocale;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|images|logos|img|favicon.ico|icon.svg).*)',
  ],
};
