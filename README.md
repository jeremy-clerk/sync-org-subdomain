This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## This Repo is a minimal reproduction of the Clerk Core 2 Satellite Domain Issue

### Background

Our production app running on clerk core v1 works perfectly fine with this
setup. Since we are trying to upgrade to core v2 we are running into errors.

### My Test Setup

- Nextjs 15 App
- Clerk w/ dynamic mode
- deployed via Vercel
- Primary Domain: devsuccess.app
- Satellite Domains: screeno.app, devsuccess.dev 

The Nextjs App redirects the user to a satellite domain if they have a subdomain in their publicMetadata.