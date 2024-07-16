import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path == '/checkverify';
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        
        if ((path as string) !== '/profile') {
            return NextResponse.redirect(new URL('/profile', request.nextUrl));
        }
    } else if (!isPublicPath && !token) {
        
        if (path !== '/login') {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
        "/checkverify",
    ]
};
