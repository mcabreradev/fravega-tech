import { Loader2 } from "lucide-react"
import { LoadingSpinnerProps } from "@/types"

export function LoadingSpinner({ className = "", size = 24 }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className="animate-spin" size={size} />
    </div>
  )
}
