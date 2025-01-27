import Link from "next/link";
import {auth} from "@clerk/nextjs/server";
import {OrganizationSwitcher} from "@clerk/nextjs";

export default async function Dashboard() {
	const {orgId} = await auth()
	return <div>
		<h1>Dashboard</h1>
		<p>{orgId}</p>
		<OrganizationSwitcher />
		<Link href={"/user"} >Go To /user</Link>
	</div>
		;
}
