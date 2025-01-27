import type { NextRequest } from "next/server";


export const parse = (req: NextRequest) => {
    let domain = req.headers.get("host")!;
    domain = domain.replace("www.", "");

    const path = req.nextUrl.pathname;

    const searchParams = req.nextUrl.searchParams.toString();
    const fullPath = `${req.nextUrl.pathname}${
        searchParams.length > 0 ? `?${searchParams}` : ""
    }`;

    const key = decodeURIComponent(path.split("/")[1] ?? "");
    const fullKey = decodeURIComponent(path.slice(1));

    return { domain, path, fullPath, key, fullKey, searchParams };
};
