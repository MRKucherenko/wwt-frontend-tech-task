import { useEffect, useState } from "react";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { useFiltersStore } from "@/store/useFiltersStore";
import { getFilters } from "@/shared/api/getFilters/getFilters";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query"

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}; 

export default function Modal({ isOpen, setIsOpen }: Props) {
  const {data} = useQuery({
    queryKey: ['filters'],
    queryFn: getFilters
  })
  const {t} = useTranslation('filter')
  const {filters, setFilters} = useFiltersStore()

  const [localFilters, setLocalFilters] = useState<Record<string, string[]>>({})
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    setLocalFilters(JSON.parse(JSON.stringify(filters)))
  }, [filters])

  const isChanged = Object.keys(localFilters).some((key) => {
  const local = localFilters[key] || []
  const global = filters[key] || []

  if (local.length !== global.length) return true

  return local.some((id) => !global.includes(id))
})

  if (!isOpen) return null;
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md">

  <div className="w-[700px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
    <div className="flex items-center border-b pb-4 mb-4">
      <h1 className="mx-auto text-xl font-semibold">{t("title")}</h1>

      <button
        className="text-2xl cursor-pointer hover:opacity-70"
        onClick={() => setIsOpen(false)}
      >
        ✖
      </button>
    </div>

    <div className="space-y-6">
      {data?.filterItems.map((section) => (
        <div key={section.id} className="border-b pb-4 mb-4">
          <h2 className="mb-2 font-semibold">{section.name}</h2>

          <div className="grid grid-cols-3 gap-2">
            {section.options.map((option) => (
              <div  key={option.id}>
              <input key={option.id} type="checkbox" checked={localFilters[section.id]?.includes(option.id) || false} onChange={(e) => {
                setLocalFilters((prev) => {
                  const current = prev[section.id] || []

                  return {
                    ...prev,
                    [section.id]: e.target.checked ? [...current, option.id] : current.filter((id) => id !== option.id)
                  }
              
                })
              }}/>
              <label htmlFor={option.id}>{option.name}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center mt-6">
      <button
        className="mx-auto w-[184px] h-[64px] rounded-2xl bg-orange-500 text-white"
        onClick={() => setIsConfirmOpen(true)}
        disabled={!isChanged}
      >
        {t("apply")}
      </button>

      <p
        className="cursor-pointer underline"
        onClick={() => setLocalFilters({})}
      >
         {t("clear")}
      </p>
    </div>

  </div>
</div>

      {isConfirmOpen && (
  <ConfirmModal 
   onConfirm={() => {
            setFilters(localFilters);
            setIsConfirmOpen(false);
            setIsOpen(false);
          }}
    
     onCancel={() => {
      setLocalFilters(filters)
      setIsConfirmOpen(false);
     }}
  />
)}
    </>
  );
}
