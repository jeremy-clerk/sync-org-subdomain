"use client";

import { useClerk} from "@clerk/nextjs";
import {useEffect} from "react";
import {useParams, useSearchParams, useRouter} from "next/navigation";

export default function setActiveOrg(){
    const {setActive, session, loaded} = useClerk();
    const params = useParams()
    const router = useRouter();

    useEffect(()=>{
        if(!loaded) return
        (async ()=>
        {
            await setActive({organization: params.orgSlug as string})
            await session?.reload()
            await router.push("/dashboard")
        }
    )()},[loaded])


    return null;

}