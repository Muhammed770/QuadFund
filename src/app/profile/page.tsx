
import { DialogAddProject } from "@/components/DialogAddProject";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
// import { useAccount } from 'wagmi'
import WalletAddress from '@/components/WalletAddress';

export default function ProfilePage() {
  const projectData = [
    {
      title: "Next.js",
      description: "The React Framework – created and maintained by @vercel.",
      src: "/placeholder.svg"
    },
    {
      title: "React",
      description: "A JavaScript library for building user interfaces.",
      src: "/placeholder.svg"
    },
    {
      title: "Vue.js",
      description: "The Progressive JavaScript Framework.",
      src: "/placeholder.svg"
    },
    {
      title: "Angular",
      description: "A platform and framework for building single-page client applications using HTML and TypeScript.",
      src: "/placeholder.svg"
    },
    {
      title: "Svelte",
      description: "A radical new approach to building user interfaces.",
      src: "/placeholder.svg"
    }
  ];

  const contributions = [
    {
      title: "Next.js",
      amount: "$20"
    },
    {
      title: "React",
      amount: "$10"
    },
    {
      title: "Vue.js",
      amount: "$10"
    },
    {
      title: "Angular",
      amount: "$10"
    },
    {
      title: "Svelte",
      amount: "$10"
    }
  ]

  const events = [
    {
      title: "Next.js",
      description: "The React Framework – created and maintained by @vercel.",
    },
    {
      title: "React",
      description: "A JavaScript library for building user interfaces.",
    }
  ]
  

  // const account = useAccount()

  return (
    <div className="grid md:p-12 p-5 mx-auto lg:grid-cols-2 lg:gap-6 xl:gap-8">
      <div className="space-y-4 lg:col-span-2">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage alt="@shadcn" src="/profile.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1.5">
              <h1 className="text-3xl font-bold"><WalletAddress /></h1>
              <div className="flex items-center space-x-2 text-sm">
                {/* {account && <p className="text-gray-500 dark:text-gray-400">{account.address}</p>} */}
                <p className="text-gray-500 dark:text-gray-400"><WalletAddress /></p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 text-sm lg:grid-cols-3">
          <div className="space-y-4 col-span-2">
            <div className="space-y-2">
              <div className='flex justify-between items-center'>
                <h2 className="text-xl font-bold">Your Projects</h2>
                {/* <div className=""><DialogAddProject  /></div> */}
              </div>
              {/* <p className="text-sm text-gray-500 dark:text-gray-400">You haven’t created any projects yet.</p> */}
              <div className="grid gap-4 pt-3 text-sm">
                {projectData.map((data, index) => (
                  <Card key={index} className="w-full overflow-hidden">

                    <CardContent className="flex p-0 gap-4">

                      {/* <Image width={200} height={100} className="md:object-contain" src={data.src} alt={data.title} /> */}
                      <div className="min-h-24 m-1">

                        <div className="absolute m-1 aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                          <Image alt="Avatar" className="aspect-[1/1] object-cover" height="80" src={data.src} width="80" />
                        </div>
                      </div>
                      <div className="p-2 ml-20">
                        <div className="text-left">
                          <h2 className="text-xl font-semibold ">{data.title}</h2>
                          <p className="text-sm text-gray-600">{data.description}</p>
                          {/* <p className="text-sm ">{data.contributors}</p> */}
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            </div>
            <div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Your Events</h2>
                  <div className="grid gap-4 pt-2 text-sm">
                    {events.map((data, index) => (
                      <Card key={index} className="w-full overflow-hidden">
                      
                        <CardContent className="gap-4">
                          <div className="pt-3">
                            <div className="">
                              <h4 className="text-lg font-semibold">{data.title}</h4>
                              <p className="text-sm text-gray-600">{data.description}</p>
                            </div>
                          </div>
                        
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* <p className="text-sm text-gray-500 dark:text-gray-400">You haven’t contributed to any projects yet.</p> */}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold mt-8">Your Contributions</h2>
                <div className="grid gap-4 pt-2 text-sm">
                {contributions.map((data, index) => (
                  <Card key={index} className="w-full overflow-hidden">

                    <CardContent className="gap-4">

                      {/* <Image width={200} height={100} className="md:object-contain" src={data.src} alt={data.title} /> */}
                      {/* <div className="min-h-24 m-1">

                        <div className="absolute m-1 aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                          <Image alt="Avatar" className="aspect-[1/1] object-cover" height="80" src={data.src} width="80" />
                        </div>
                      </div> */}
                      <div className="pt-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold">{data.title}</h4>
                          <p className="text-lg text-gray-600 ml-2">{data.amount}</p>
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                ))}
              </div>
              </div>
              
            </div>
          
        </div>
      </div>

    </div>
  )
}

