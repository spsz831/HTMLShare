import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { url, cookies, redirect } = context;
  const path = url.pathname;

  // Paths that require authentication: index page and api/pages (for creation)
  // We leave /view/* open so shared links are public
  const isProtectedPath = path === '/';
  const isProtectedApi = path.startsWith('/api/') && !path.startsWith('/api/health');

  if (isProtectedPath || isProtectedApi) {
    const token = cookies.get('htmlshare_auth')?.value;

    if (token !== 'authenticated') {
      if (isProtectedApi) {
        return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      // Redirect to login page for browser navigation
      return redirect('/login');
    }
  }

  return next();
});
