export function isBlogRoute(pathname: string): boolean {
  return (
    pathname === '/blog' ||
    pathname.startsWith('/blog/') ||
    pathname.startsWith('/kategori/') ||
    pathname.startsWith('/etiket/')
  );
}
