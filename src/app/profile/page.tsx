"use client"
import { DialogAddProject } from "@/components/DialogAddProject";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { getProjectsByOwner,getEventByOwner,getContributionsByUser,weiToUSD } from "@/lib/functions";
import WalletAddress from '@/components/WalletAddress';
import { useEffect,useState } from "react";
import { useAccount } from 'wagmi'
import { set } from "date-fns";
import { ProjectListType,QuadFundEventListType } from "@/types/types"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ethers } from "ethers";
import contractABI from "@/lib/abis/Contract.json";

export default function ProfilePage() {
  
  const [projects, setProjects] = useState<ProjectListType>([])
  const [events, setEvents] = useState<QuadFundEventListType>([])
  const [contributions, setContributions] = useState([])
  const account = useAccount()
  const address = account?.address ?? '';
  const lowercaseAddress = address.toLowerCase();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('address:', address);

        const projects = await getProjectsByOwner(lowercaseAddress);
        setProjects(projects);
        const events = await getEventByOwner(lowercaseAddress);
        setEvents(events);
        const contributions = await getContributionsByUser(lowercaseAddress);
        setContributions(contributions);
        console.log('All projects:', projects);
        console.log('All events:', events);
        console.log('All contributions:', contributions);
      } catch (error) {
        console.error('Error fetching all projects:', error);
      }
    };
    fetchProjects();
  }, [address]);


const handleSubmit = async (projectId:string) => {
  try {
    // Connect to Ethereum provider
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    console.log(projectId)
    const parts = projectId.split('-');
    const contractId = parts[0]
    const id = parseInt(parts[1])
    console.log(contractId)
    console.log(id)
    const contract = new ethers.Contract(contractId, contractABI, signer);

    const tx = await contract.withdrawFunds(id);
    // Wait for transaction to complete
    await tx.wait();
    toast.success("Fund withdrawn successfully")
    console.log('Transaction successful:', tx.hash);
} catch (error) {
    toast.error("Error occurred while withdrawing fund. Please try again.")
    console.error('Error occurred while withdrawing fund:', error);
}
}

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
              {projects.length>0 ? <div className="grid gap-4 pt-3 text-sm">
                {projects.map((data, index) => (
                  <Card key={index} className="w-full overflow-hidden">

                    <CardContent className="flex p-0 gap-4 justify-between items-center">
                    <div className="flex">
                      <div className="min-h-24 m-1">
                        <div className="absolute m-1 aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                          <Image alt="Avatar" className="aspect-[1/1] object-cover" height="80" src={data.logo} width="80" />
                        </div>
                      </div>
                      <div className="p-2 ml-24">
                        <div className="text-left">
                          <h2 className="text-xl font-semibold ">{data.name}</h2>
                          <p className="text-sm text-gray-600">{data.description}</p>
                          {/* <p className="text-sm ">{data.contributors}</p> */}
                        </div>
                      </div>
                    </div>
                    {!data.isWithdrawnFund && <div className="px-4">
                      <Button onClick={(event) => { event.preventDefault(); handleSubmit(data.id); }}>Withdraw Fund</Button>
                    </div>}
                      

                    </CardContent>
                  </Card>
                ))}
              </div> : <p className="text-sm text-gray-500 dark:text-gray-400">You haven't contributed to any projects yet.</p>}
            </div>
            </div>
            <div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Your Events</h2>
                  {events.length>0 ? <div className="grid gap-4 pt-2 text-sm">
                    {events.map((data, index) => (
                      <Card key={index} className="w-full overflow-hidden">
                      
                        <CardContent className="gap-4">
                          <div className="pt-3">
                            <div className="">
                              <h4 className="text-lg font-semibold">{data.name}</h4>
                              <p className="text-sm text-gray-600">{data.description}</p>
                            </div>
                          </div>
                        
                        </CardContent>
                      </Card>
                    ))}
                  </div> : <p className="text-sm text-gray-500 dark:text-gray-400">You haven’t created any events yet.</p>}
                  
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold mt-8">Your Contributions</h2>
                {contributions.length>0 ? <div className="grid gap-4 pt-2 text-sm">
                {contributions.map((data: any, index: number) => (
                  <Card key={index} className="w-full overflow-hidden">
                    <CardContent className="gap-4">
                      <div className="pt-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold">{(data as any).project.name}</h4>
                          <p className="text-lg text-gray-600 ml-2">${weiToUSD(data.amount)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div> : <p className="text-sm text-gray-500 dark:text-gray-400">You haven’t contributed to any projects yet.</p>}
              </div>
              
            </div>
          
        </div>
      </div>

    </div>
  )
}

