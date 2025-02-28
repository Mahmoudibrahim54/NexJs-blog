import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "./i81n.config";

/* MIDDLEWARE */
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = Object.values(i18n.locales).some(
    (locale) =>
      pathname.startsWith(`/${locale.lang}/`) || pathname === `/${locale.lang}`,
  );
  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale =
    request.cookies.get("BROWSER_LANGUAGE")?.value || i18n.defaultLocale.lang;
  request.nextUrl.pathname = `/${locale}/${pathname}`;

  // e.g. incoming request is /products
  // The new URL is now /ar/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: [
    "/((?!api|_next/static|_next/image|_next/public|_next/font|favicon.ico|opengraph-image|robots.txt|sitemap|/en|ar/|bg-image.png|website_logo_sm_en.png|website_logo_sm_ar.png|website_logo_ar.png|website_logo_en.png|ReemKufi-VariableFont_wght.woff2|NotoSansArabic-SemiBold.ttf|NotoKufiArabic-VariableFont_wght.woff2).*)",
  ],
};
