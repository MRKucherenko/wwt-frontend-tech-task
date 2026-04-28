import Modal from "@/components/Modal/Modal"
import { useFiltersStore } from "@/store/useFiltersStore"
import { useState } from "react";
import { buildSearchRequest } from "@/shared/api/types/SearchRequest/buildSearchRequest";

export default function Home() {
      const [isOpen, setIsOpen] = useState<boolean>(false);
    const {filters} = useFiltersStore()
    return (
        <>
        <button onClick={() => setIsOpen(true)} className="mx-auto w-[184px] h-[64px] rounded-2xl bg-orange-500 text-white flex items-center justify-center m-4">Open modal</button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
       <pre>{JSON.stringify(buildSearchRequest(filters), null, 2)}</pre>
        </>
    )
} 