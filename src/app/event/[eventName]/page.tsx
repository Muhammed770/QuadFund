"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { CardContent, Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { DialogSubmitProject } from "@/components/DialogSubmitProject"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeartHandshake } from 'lucide-react';
import { ExternalLinkIcon } from "@/components/externalLinkIcon"
import DialogAmount from "@/components/DialogAmount"
import { getEventById, weiToUSD } from "@/lib/functions"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getProjectsByEventId } from "@/lib/functions"
import { ProjectType, QuadFundEventType, ContributionsType } from "@/types/types"
import { getContributionsByProjectId, getContributionsByEventId } from "@/lib/functions"
import { set } from "date-fns"
import { useAccount } from 'wagmi'
import { ethers } from "ethers"
import { toast } from "sonner";
import contractABI from "@/lib/abis/Contract.json";
const EventPage = ({ params }: { params: { eventName: string } }) => {

    const queries = useSearchParams();
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [eventId, setEventId] = useState<string>(""); // Store fetched id
    const [projects, setProjects] = useState<ProjectType[]>([]); // Store fetched projects
    const [projectContributors, setProjectContributors] = useState([])
    const [topContributors, setTopContributors] = useState<ContributionsType[]>()
    const [eventData, setEventData] = useState<QuadFundEventType[]>();
    const [sumOfContributions, setSumOfContributions] = useState<number>(0);
    // const [topContributors, setTopContributors] = useState([])
    const account = useAccount()
    const address = account?.address ?? '';
    console.log('address:', address);

    const id = queries.get('id') as string;
    const name = queries.get('name') as string;
    const fetchContributors = async (id: string) => {
        try {
            console.log('Project ID:', id);
            const projectContributions: any = await getContributionsByProjectId(id);
            setProjectContributors(projectContributions);
        } catch (error) {
            console.error('Error fetching contributors:', error);
        }
    }

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setIsLoading(false); // Set loading to false after fetching
                if (typeof id === 'string') {
                    setEventId(id);
                    const event = await getEventById(id);
                    setEventData(event);
                    console.log('event data:', event);

                    const projects = await getProjectsByEventId(id);
                    const topContributors = await getContributionsByEventId(id);
                    const sumOfContributions = projects.reduce((acc: number, curr: ProjectType) => acc + Number(curr.contributionsReceived), 0)
                    console.log('sum of contributions:', sumOfContributions);
                    setSumOfContributions(sumOfContributions)
                    setProjects(projects);

                    setTopContributors(topContributors);


                }
                console.log('Event ID:', id);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };
        fetchEvent();
    }, []);

    const slicedAddress = (address: string) => address.slice(0, 4) + "..." + address.slice(-4);

    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        if (eventData) {
            setStartDate(new Date(Number(eventData[0].startTime)));
            setEndDate(new Date(Number(eventData[0].endTime)));

        }
    }, [eventData]);

    // const startDate = new Date('2024-04-20');
    // const endDate = new Date('2024-04-21');

    const timeCalc = setInterval(function () {

        const now = new Date().getTime();
        const timeleft = endDate ? endDate.getTime() - now : 0;
        const startsInDuration = startDate ? startDate.getTime() - now : 0;

        let days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;

        if (startsInDuration > 0 && timeleft > 0) {
            days = Math.floor(startsInDuration / (1000 * 60 * 60 * 24));
            hours = Math.floor(
                (startsInDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            minutes = Math.floor(
                (startsInDuration % (1000 * 60 * 60)) / (1000 * 60)
            );
            seconds = Math.floor((startsInDuration % (1000 * 60)) / 1000);
        }
        if (startsInDuration < 0 && timeleft > 0) {
            days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            hours = Math.floor(
                (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
        }
        if (timeleft <= 0) {
            (days = 0), (hours = 0), (minutes = 0), (seconds = 0);
        }
        if (days || hours || minutes || seconds) {
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
        }
    }, 1000);

    console.log("event owner address", eventData && eventData[0].owner.id.toLowerCase());
    console.log("account address", address.toLowerCase() == (eventData && eventData[0].owner.id.toLowerCase()));

    const handlePublishResults = async () => {
        try {
            console.log('Publishing results');
            //LOADING HANDLE



            // Connect to Ethereum provider
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Instantiate the contract
            const contract = new ethers.Contract(id, contractABI, signer);
            const tx = await contract.publishResult();
            // Wait for transaction to complete
            await tx.wait();
            toast.success("Results published successfully")
            console.log('Transaction successful:', tx.hash);
        } catch (error) {
            toast.error("Error occurred while publishing results. Please try again.")
            console.error('Error publishing results:', error);

        }
    }
    // if (!id || !name) {
    //     return <div>Loading...</div>;
    // }
    return (
        <div className="flex flex-col lg:flex-row gap-8 md:p-8 p-4">
            <div className="flex-1 space-y-6">
                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-bold inline-flex">{name}</h1>
                    <div className="w-44">

                        {eventData && Number(eventData[0].endTime) > Date.now() && <div> <p className="text-xs text-gray-600 ml-2">Voting ends in:</p><Badge className="flex-none bg-red-200 p-2" variant="secondary"> {days}D {hours}H {minutes}M {seconds}S </Badge>
                            <div className="lg:hidden">

                                <DialogSubmitProject projectId={id} />
                            </div>
                        </div>
                        }
                    </div>

                </div>


                <div className="flex gap-2 overflow-x-auto no-scrollbar justify-between">




                    {eventData && Number(eventData[0].endTime) > Date.now() ?

                        <Badge className="flex-none bg-green-100 text-stone-800 p-2" variant="secondary">
                            <div className="mx-1.5 relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                            Ongoing round
                        </Badge>
                        :
                        <Badge className="flex-none bg-red-100 text-stone-800 p-2" variant="secondary">
                            <div className="mx-1.5 relative flex h-3 w-3">
                                <span className="inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </div>
                            Rounds closed
                        </Badge>
                    }


                    {

                        eventData &&
                            !eventData[0].resultPublished &&
                            (Number(eventData[0].endTime) < Date.now()) &&
                            eventData[0].owner.id.toLowerCase() === address.toLowerCase() ?
                            <Button className="w-44" variant="default" onClick={() => handlePublishResults()}>Publish Results</Button>
                            : null
                    }
                    
              





                </div>
                {projects && projects.map((data, index) => (
                    <div>

                        <Drawer>
                            <DrawerTrigger className="w-full" onClick={() => fetchContributors(data.id)}>
                                <Card key={index} className="w-full overflow-hidden">

                                    <CardContent className="flex p-0 gap-4">

                                        {/* <Image width={200} height={100} className="md:object-contain" src={data.src} alt={data.title} /> */}
                                        <div className="min-h-24 m-1">
                                            <div className="absolute m-1 aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                                                <Image alt="Avatar" className="aspect-[1/1] object-cover" height="80" src={data.logo} width="80" />
                                            </div>
                                            {/* {(data as { src: string })?.src && (
                                                <div className="absolute m-1 aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                                                    <Image alt="Avatar" className="aspect-[1/1] object-cover" height="80" src={(data as { src: string }).src} width="80" />
                                                </div>
                                            )} */}
                                        </div>
                                        <div className="p-2 ml-20">
                                            <div className=" flex flex-col items-start">
                                                <h2 className="text-xl font-semibold ">{data.name}</h2>
                                                <p className="text-sm text-gray-600">{data.description}</p>
                                                <div className="flex ">
                                                    <p className="text-sm ">${weiToUSD(data.contributionsReceived)} Contributions</p>
                                                    <span className="ml-2">•</span>
                                                    <p className="text-sm ml-2">${weiToUSD(data.matchingPrizePool)} Matched</p>
                                                </div>
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            </DrawerTrigger>

                            <DrawerContent className="">
                                <DrawerHeader className="md:flex md:px-12 p-4 justify-between">
                                    <div className="flex">
                                        <Image width={200} height={100} className="object-contain h-[130px]" src={data.logo} alt="title" />
                                        <div className="p-5">
                                            <DrawerTitle className="text-3xl font-extrabold">{data.name}</DrawerTitle>
                                            <DrawerDescription className="text-xl">{data.description}</DrawerDescription>
                                            <Link className="font-medium inline-flex items-center space-x-1.5 text-sm" href={data.website}>
                                                <ExternalLinkIcon className="h-4 w-4" />
                                                <span>View</span>
                                            </Link>
                                        </div>
                                    </div>
                                    {eventData && Number(eventData[0].endTime) > Date.now() && <DialogAmount projectId={data.id} />}
                                </DrawerHeader>
                                <Tabs defaultValue="about" className="md:px-12 px-4 pb-4">
                                    <TabsList>
                                        <TabsTrigger value="about">About</TabsTrigger>
                                        <TabsTrigger value="contributers">Contributers</TabsTrigger>
                                        <TabsTrigger value="owner">Owner</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="about" className="h-[330px] overflow-scroll no-scrollbar">
                                        <div className="mt-4 p-3">
                                            <h2 className="text-xl font-semibold">About</h2>
                                            <p className="text-lg pt-2">{data.about}</p>
                                        </div>
                                        <div className="mt-4 p-3">
                                            <h2 className="text-xl font-semibold">Contact</h2>
                                            {data && typeof data === 'object' && (
                                                <Link href={data.twitter}>
                                                    <div className="pt-3"><Image src={"/twitter.svg"} alt="Twitter" width={30} height={30} /></div>
                                                </Link>
                                            )}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="contributers" className="h-[330px] overflow-scroll no-scrollbar">
                                        <div>
                                            <h2 className="text-xl font-semibold">Top Contributions</h2>
                                            <div className="space-y-2 mt-2">
                                                {(projectContributors as { user: { id: string }, amount: number }[])?.map((data, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <Avatar>
                                                            <AvatarImage alt="avatar" src="https://ui.shadcn.com/avatars/04.png/?height=24&width=24" />
                                                        </Avatar>
                                                        <span className="font-medium">{slicedAddress(data.user.id)}</span>
                                                        <span>-</span>
                                                        <span className="ml-auto">${weiToUSD(data.amount.toString())}</span>
                                                    </div>
                                                ))}
                                                <Button className="w-full mt-2" variant="outline">
                                                    View Leaderboard
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="owner" className="h-[330px] overflow-scroll no-scrollbar">
                                        <div>
                                            <h2 className="text-xl font-semibold">Owner</h2>
                                            <div className="space-y-2 mt-2">
                                                <div className="flex items-center space-x-2">
                                                    <Avatar>
                                                        <AvatarImage alt="owner" src="https://ui.shadcn.com/avatars/04.png/?height=24&width=24" />
                                                    </Avatar>
                                                    <span className="font-medium">{data.owner.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </DrawerContent>

                        </Drawer>
                    </div>
                ))}
            </div>
            <div className="w-full lg:w-96 space-y-6 ">
                <div className="bg-gray-100 p-4 rounded-md max-lg:hidden">
                    <h2 className="text-xl font-semibold">Total Donations</h2>
                    <p className="text-3xl font-bold">${weiToUSD((sumOfContributions).toString())}</p>
                    <h2 className="text-xl font-semibold mt-4">Available Matching Pool</h2>
                    {eventData && <p className="text-3xl font-bold">${weiToUSD(eventData[0].prizePool)}</p>}
                    {eventData && Number(eventData[0].endTime) > Date.now() && <DialogSubmitProject projectId={""} />}

                </div>
                <div>
                    <h2 className="text-xl font-semibold">Top Contributions</h2>
                    <div className="space-y-2 mt-2">
                        {topContributors && topContributors.map((data, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage alt="Avatar" src="https://ui.shadcn.com/avatars/04.png/?height=24&width=24" />
                                </Avatar>
                                <span className="font-medium">{slicedAddress(data.user?.id)}</span>
                                <span className="ml-auto">${weiToUSD(data.amount.toString())}</span>
                            </div>
                        ))}
                        <Button className="w-full mt-2" variant="outline">
                            View Leaderboard
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EventPage;