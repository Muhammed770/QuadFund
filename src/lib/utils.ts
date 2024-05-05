import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function convertIPFSUriToUrl(ipfsUri: string): string {

  if (ipfsUri.includes("ipfs://")) {
    return ipfsUri.replace("ipfs://", "https://ipfs.io/ipfs/")
  }
  return ipfsUri
}


// return string maximum 15 words 
export function truncateString(str: string, num: number) {
  const words = str.split(" ")
  if (words.length <= num) {
    return str
  }
  return words.slice(0, num).join(" ") + '...'
}