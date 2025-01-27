import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

import {  parse } from "./utils";

const isPublicRoute = createRouteMatcher([
    "/login(.*)",
    "/sso-callback(.*)",
    "/api(.*)",
]);

const isDev = () => {
    return process.env.NODE_ENV === 'development'
}

export default clerkMiddleware(
    async (auth, request) => {

        if (isPublicRoute(request)) return;

        await auth.protect({
            unauthenticatedUrl: new URL("/login", (isDev() ? `http://` : 'https://').concat(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string)).toString()
        });

        const { userId, redirectToSignIn, sessionClaims, orgSlug} = await auth();

        if (!userId) return redirectToSignIn();

        const { path, domain, fullPath, searchParams } = parse(request);

        const prefix = (sessionClaims?.subdomain && sessionClaims?.subdomain !== '') ? sessionClaims?.subdomain : null

        const userCustomDomain = prefix ? (prefix as string).concat(".",(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string)) : null

        const nextDomain = `${
            isDev() ||
                domain.includes("localhost")
                ? "http://"
                : "https://"
        }${userCustomDomain ?? domain}`;

        // if user is on wrong domain, redirect to correct domain
        if (userCustomDomain && userCustomDomain !== domain) {
            return NextResponse.redirect(`${nextDomain}${fullPath}`);
        }
        // if orgslug doesn't match our publicMetadata.subdomain redirect
        if(orgSlug !== prefix && !request.nextUrl.pathname.match(`set/${prefix}`)){
            return NextResponse.redirect(`${nextDomain}/set/${prefix}`)
        }

        // redirect from root to dashboard
        if (path === "/") {
            return NextResponse.redirect(
                `${nextDomain}/dashboard?${searchParams}`,
            );
        }

        return NextResponse.rewrite(
            new URL(`/${userCustomDomain ?? domain}${fullPath}`, request.url),
        );
    }
);

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}