"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteOrders} from "../../_actions/orders"
import { useRouter } from "next/navigation"

export function DeleteDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem

      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteOrders(id)
          router.refresh()
        })
      }
    >
      Delete
    </DropdownMenuItem>
  )
}