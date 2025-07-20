import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute) {
    if (accessToken) {
      return NextResponse.next(); 
    }

    if (refreshToken) {
      try {
        const response = await checkServerSession();
        const setCookies = response.headers['set-cookie'];

        if (setCookies) {
          const cookieArray = Array.isArray(setCookies)
            ? setCookies
            : [setCookies];

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              httpOnly: true,
              secure: true,
            };
            if (parsed.accessToken) {
              cookieStore.set('accessToken', parsed.accessToken, options);
            }
            if (parsed.refreshToken) {
              cookieStore.set('refreshToken', parsed.refreshToken, options);
            }
          }
        }

        return NextResponse.next({
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
      } catch {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }

    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};