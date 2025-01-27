import Link from "next/link";
import {currentUser} from "@clerk/nextjs/server";

export default async function Page(){
    const user = await currentUser();

     return(
         <div>
         <h1>
             Hello, {user?.firstName}
         </h1>
             <Link href={"/dashboard"} >Go To /dashboard</Link>
         </div>
     )
}