import { ClerkProvider } from "@clerk/nextjs";
import {dark} from "@clerk/themes"
import "../globals.css";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<ClerkProvider
			afterSignOutUrl={(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string).concat("/login")}
			signInFallbackRedirectUrl={"/dashboard"}
			appearance={{baseTheme: dark}}
		>
			<html lang="en" className={"dark bg-zinc-800 text-white h-dvh"}>
				<body className={"h-full"}>
					<main className={"flex flex-col justify-center items-center h-full"}>
					{children}
					</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
