import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// This function formats a date string into a more readable format
// using date-fns. It takes a date string as input and returns a formatted date string.
export const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  return format(date, 'MMM dd, yyyy')
}

// This function takes a number and formats it into a more readable string
// with K for thousands and M for millions
export function countNumbers(num: number) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  return num
}
