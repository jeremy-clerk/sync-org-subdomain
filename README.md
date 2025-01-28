
# This repo is an example of using a subdomain for an organization with Clerk

Disclaimer: This code has not been thoroughly tested and is not officially supported.

### Background

- The user must have a subdomain in their `publicMetadata`
- The session token must be customized to include:
  - `{"subdomain": {{user.public_metadata.subdomain}} }`
- The subdomain must match the slug of an org that the user is a member of.
- Vercel must have a wildcard subdomain set.
- This will automatically set the active org to be whatever the 'subdomain' is set to in the user's `publicMetadata`. Even if they change their active org, it will force activate whatever org slug is set in their metadata.

### Local Dev Setup

For local dev, I setup all requests to `*.localdev.test` to resolve to `127.0.0.1`

- Install dnsmasq
- Add the proper records
- If you don't know how to do this, google "Wildcard domain for local development"
- Change the `dev` command in `package.json` to use the correct host (`-H <your local domain>` )

# How It Works
- When a user signs-in (or for any request) they are redirected to the `/set/${orgSlug}` path if their current org doesn't match the subdomain in their metadata
  - This path will set their current session active with the orgSlug (pulled from the path)
  - This is done with a client side page, where the only purpose is to set this property.
- They are then redirected back to the `/dashboard` route.
- When a user is created, you would need to set the publiMetadata to include a property for `subdomain`. This subdomain will need to match the slug of the organization.

## Considerations
If you change the metadata, it appears that 2 refreshes are required for the subdomain to update. Not sure if this could be optimized.

There are other ways to achieve this that don't require the redirects.
- Client component after sign-in that sets active org based on some factor
- Using organizationSync options in middleware



### WARNINGS

> [!WARNING]
> There is no error handling present.
> i.e. checking for if the user is part of an org, etc.
> This can result in an infinite redirect loop.

> [!WARNING]
> THIS IS JUST AN EXAMPLE AND NOT OFFICIALLY SUPPORTED