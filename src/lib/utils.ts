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