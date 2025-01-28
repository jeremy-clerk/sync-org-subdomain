
# This repo is an example of using a subdomain to sync the active organization in Clerk

### Background

- The user must have a subdomain that in their `publicMetadata`
- The session token must be customized to include have:
  - `{"subdomain": {{user.public_metadata.subdomain}} }`
- The subdomain must match the slug of an org that the user is a member of. 
- Vercel must have a wildcard subdomain set. 

### Local Dev Setup

For local dev, I setup all requests to `*.localdev.test` to resolve to `127.0.0.1`

- Install dnsmasq 
- Add the proper records
- If you don't know how to do this, google "Wildcard domain for localhost"
- Change the `dev` command in `package.json` to use the correct host (`-H <your local domain>` )

# How It Works
- When a user signs-in (or for any request) they are redirected to the `/set/${orgSlug}` path if their current org doesn't match the subdomain in their metadata
  - This path will set their current session active with the orgSlug (pulled from the path)
- They are then redirected back to the `/dashboard` route.


### WARNINGS

> [!WARNING] 
> There is no error handling present.