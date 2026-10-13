import { NextResponse, type NextRequest } from 'next/server';
import { isComingSoon } from '@/lib/comingSoon';

// Yer tutucu modda ana sayfa dışındaki tüm sayfaları geçici olarak ana sayfaya yönlendir.
export function middleware(request: NextRequest) {
  if (!isComingSoon || request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url), 307);
}

export const config = {
  // API, Sanity paneli, Next dahili dosyaları ve statik dosyalar (nokta içeren yollar) hariç
  matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
};
