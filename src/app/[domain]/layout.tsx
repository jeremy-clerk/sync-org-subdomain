import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import "../globals.css";
import {dark} from "@clerk/themes";

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {

    return (
        <ClerkProvider
            afterSignOutUrl={(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string).concat("/login")}
            appearance={{baseTheme: dark}}
        >
            <html lang="en" className={"h-dvh dark bg-zinc-800 text-white"}>
            <body className={"h-full"}>
            <header className={"flex p-2 bg-zinc-600 rounded-md shadow justify-between min-h-[50px]"}>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </header>
            <main className={"flex flex-col items-center justify-center h-full"}>
            {children}
            </main>
            </body>
            </html>
        </ClerkProvider>
    );
}
