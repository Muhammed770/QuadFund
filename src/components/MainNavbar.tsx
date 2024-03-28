
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function MainNavbar() {
  return (
    <header className="flex items-center h-16 px-4 border-b w-full md:px-6">
      <Link className="mr-4" href="#">
        <HexagonIcon className="h-8 w-8" />
        <span className="sr-only">QuadFund</span>
      </Link>
      <div className="ml-auto flex items-center">
        {/* <Button size="sm" variant="outline">Connect Wallet</Button> */}
        <ConnectButton />
      </div>
    </header>
  )
}


function HexagonIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  )
}
