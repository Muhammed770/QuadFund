
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image";

export function ListOfProjects() {
  const itemsData = [
    {
      title: "Classic Leather Jacket",
      description: "Timeless style and quality craftsmanship",
      src: "https://images.unsplash.com/photo-1710975090677-5955bce9d325?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#"
    },
    {
      title: "Canvas Backpack",
      description: "Durable and stylish for urban adventures",
      src: "https://images.unsplash.com/photo-1707344088547-3cf7cea5ca49?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#"
    },
    {
      title: "Smartphone Stand",
      description: "Foldable and portable for hands-free convenience",
      src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#"
    },
    {
      title: "Wireless Earbuds",
      description: "High-fidelity audio with noise-cancellation",
      src: "https://images.unsplash.com/photo-1710975090677-5955bce9d325?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#"
    },
    {
      title: "Portable Espresso Maker",
      description: "Enjoy coffee on the go with this compact device",
      src: "https://images.unsplash.com/photo-1708649290066-5f617003b93f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#"
    }
  ];
  return (
    //md:grid-cols-2
    <section className="grid   gap-6 overflow-y-scroll"> 
      {itemsData.map((item, index) => (
        <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm dark:bg-gray-950">
          <div className="flex items-center space-x-4 p-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
              <Image alt="Avatar" className="aspect-[1/1] object-cover" height="80" src={item.src} width="80" />
            </div>
            <div className="grid gap-1 not-italic">
              <h3 className="font-semibold text-sm leading-none">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-none dark:text-gray-400">{item.description}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center justify-between text-sm space-x-2">
              <Link className="font-medium inline-flex items-center space-x-1.5 text-sm" href={item.link}>
                <ExternalLinkIcon className="h-4 w-4" />
                <span>View</span>
              </Link>
              <Button size="sm" variant="outline">Select</Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}


function ExternalLinkIcon(props: any) {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  )
}
