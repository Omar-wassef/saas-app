"use client"

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const SearchInput = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('topic') || ''

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const delayDebouncefn = setTimeout(() => {
            if(searchQuery){
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });
                
                router.push(newUrl, {scroll: false});
            }else{
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["topic"],
                });
                
                router.push(newUrl, { scroll: false });
            }
        },500)

    }, [searchQuery, pathname, router,searchParams])

  return (
    <div className="relative border border-black flex gap-2 px-2 py-1 rounded-lg items-center h-fit">
        <Image src="/icons/search.svg" alt="search" height={15} width={15}/>
        <input 
            placeholder="Search companions..."
            className="outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
  )
}

export default SearchInput