import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  hasMore?: boolean
  isLoading: boolean
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  hasMore,
  isLoading,
  onPageChange
}: PaginationProps) {
  const handlePrevPage = () => {
    console.log("Prev clicked, current page:", currentPage)
    if (currentPage > 1) {
      const newPage = currentPage - 1
      console.log("Calling onPageChange with:", newPage)
      onPageChange(newPage)
    }
  }

  const handleNextPage = () => {
    console.log("Next clicked, current page:", currentPage)
    const newPage = currentPage + 1
    console.log("Calling onPageChange with:", newPage)
    onPageChange(newPage)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1 || isLoading}
        onClick={handlePrevPage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage}
      </span>
      <Button
        variant="outline"
        size="icon"
        disabled={isLoading}
        onClick={handleNextPage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
