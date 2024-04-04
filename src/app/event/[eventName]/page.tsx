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
import { getEventById } from "@/lib/functions"
import { useEffect,useState } from "react"
import { useSearchParams } from "next/navigation"
import { getProjectsByEventId } from "@/lib/functions"
import { QuadFundEventListType } from "@/types/types"

const EventPage = ({ params }: { params: { eventName: string } }) => {

    const queries = useSearchParams();
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [eventId, setEventId] = useState<string>(""); // Store fetched id
    const [projects, setProjects] = useState([]); // Store fetched projects

    const id = queries.get('id') as string;
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                
                setIsLoading(false); // Set loading to false after fetching
                if (typeof id === 'string') {
                    setEventId(id);
                    const event = await getEventById(id);
                    const projects = await getProjectsByEventId(id);
                    setProjects(projects);
                    console.log('Projects:', projects);
                    console.log('Event:', event);
                }
                console.log('Event ID:', id);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };
        fetchEvent();
    }, []);


    const cardData = [
        {
            title: "Project A",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "https://images.unsplash.com/photo-1711139299064-f60e2753163f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            images: ["https://images.unsplash.com/photo-1711139299064-f60e2753163f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1707344088547-3cf7cea5ca49?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1710975090677-5955bce9d325?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1708649290066-5f617003b93f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
            link: "#",
            contributors: "10 Contributors • $100K Matched",
            owner: "@zain",
            projectContributorsData: [
                { username: "@zain", amount: "$5k", src: "https://ui.shadcn.com/avatars/04.png/?height=24&width=24" },
                { username: "@neda", amount: "$$3.77k", src: "https://ui.shadcn.com/avatars/01.png/?height=24&width=24" },
                { username: "@shiyas", amount: "$2.87k", src: "https://ui.shadcn.com/avatars/02.png/?height=24&width=24" },
                { username: "@muhammed770", amount: "$1.57k", src: "https://ui.shadcn.com/avatars/04.png/?height=24&width=24" }
            ]
        },
        {
            title: "Project B",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            contributors: "20 Contributors • $200K Matched",
            owner: "@zain",
            src: "https://images.unsplash.com/photo-1707344088547-3cf7cea5ca49?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            images: [],
            link: "#",
            projectContributorsData: []
        },
        {
            title: "Project C",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            contributors: "30 Contributors • $300K Matched",
            owner: "@zain",
            src: "https://images.unsplash.com/photo-1710975090677-5955bce9d325?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            images: [],
            link: "#",
            projectContributorsData: []
        },
        {
            title: "Project D",
            description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            contributors: "40 Contributors • $400K Matched",
            owner: "@zain",
            src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            images: [],
            link: "#",
            projectContributorsData: []
        },
        {
            title: "Project E",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            contributors: "50 Contributors • $500K Matched",
            owner: "@zain",
            src: "https://images.unsplash.com/photo-1708649290066-5f617003b93f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            images: [],
            link: "#",
            projectContributorsData: []
        }
    ];

    const contributorsData = [
        { username: "@zain", amount: "$5k", src: "https://ui.shadcn.com/avatars/04.png/?height=24&width=24" },
        { username: "@neda", amount: "$3.77k", src: "https://ui.shadcn.com/avatars/01.png/?height=24&width=24" },
        { username: "@shiyas", amount: "$2.87k", src: "https://ui.shadcn.com/avatars/02.png/?height=24&width=24" },
        { username: "@muhammed770", amount: "$1.57k", src: "https://ui.shadcn.com/avatars/04.png/?height=24&width=24" }
    ];
    // if (!id || !name) {
    //     return <div>Loading...</div>;
    // }
    return (
        <div className="flex flex-col lg:flex-row gap-8 md:p-8 p-4">
            <div className="flex-1 space-y-6">
                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-bold inline-flex">{params.eventName}</h1>
                    <div className="w-44">

                        <Badge className="flex-none bg-red-200 p-2" variant="secondary">Voting ends in:05:04:00</Badge>
                        <div className="lg:hidden">

                            <DialogSubmitProject projectId={eventId} />
                        </div>
                    </div>

                </div>


                <div className="flex gap-2 overflow-x-auto no-scrollbar ">


                    <Badge className="flex-none bg-green-100 text-stone-800 p-2" variant="secondary">
                        <div className="mx-1.5 relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="inline-flex rounded-full h-3 w-3 bg-green-500"></span></div>Ongoing round
                    </Badge>

                    {/* <Button variant="ghost">All projects</Button>
                    <Button variant="ghost">Infrastructure</Button>
                    <Button variant="ghost">DAO</Button>
                    <Button variant="ghost">Dev Tool</Button>
                    <Button variant="ghost">DeFi</Button> */}
                </div>
                {projects && projects.map((data, index) => (
                    <div>
                        {/* <Card key={index} className="w-full overflow-hidden">

                            <CardContent className="md:flex p-0 gap-4">

                                <Image width={200} height={100} className="md:object-contain" src={data.src} alt={data.title} />
                                <div className="p-2">
                                    <div className="text-left">
                                        <h2 className="text-xl font-semibold ">{data.title}</h2>
                                        <p className="text-sm text-gray-600">{data.description}</p>
                                        <p className="text-sm ">{data.contributors}</p>
                                    </div>
                                </div>

                            </CardContent>
                        </Card> */}
                        <Drawer>
                            <DrawerTrigger className="w-full">
                                <Card key={index} className="w-full overflow-hidden">

                                    <CardContent className="flex p-0 gap-4">

                                        {/* <Image width={200} height={100} className="md:object-contain" src={data.src} alt={data.title} /> */}
                                        <div className="min-h-24 m-1">
                                            {(data as { src: string })?.src && (
                                                <div className="absolute m-1 aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                                                    <Image alt="Avatar" className="aspect-[1/1] object-cover" height="80" src={(data as { src: string }).src} width="80" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-2 ml-20">
                                            <div className="text-left">
                                                <h2 className="text-xl font-semibold ">{(data as { name: string, contributionsReceived: string, description: string, matchingPrizePool: string }).name}</h2>
                                                <p className="text-sm text-gray-600">{(data as { description: string }).description}</p>
                                                <div className="flex">
                                                    <p className="text-sm ">{(data as { contributionsReceived: string }).contributionsReceived}</p>
                                                    <p className="text-sm ">{(data as { matchingPrizePool: string }).matchingPrizePool}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            </DrawerTrigger>

                            <DrawerContent className="">
                                <DrawerHeader className="md:flex md:px-12 p-4">
                                    <Image width={200} height={100} className="object-contain" src={(data as { src: string }).src} alt="title" />
                                    <div className="p-5">
                                        <DrawerTitle className="text-3xl font-extrabold">{(data as { name: string }).name}</DrawerTitle>
                                        <DrawerDescription className="text-xl">{(data as { description: string }).description}</DrawerDescription>
                                        <Link className="font-medium inline-flex items-center space-x-1.5 text-sm" href={(data as { website: string }).website}>
                                            <ExternalLinkIcon className="h-4 w-4" />
                                            <span>View</span>
                                        </Link>
                                    </div>
                                    <DialogAmount />
                                </DrawerHeader>
                                <Tabs defaultValue="about" className="md:px-12 px-4 pb-4">
                                    <TabsList>
                                        <TabsTrigger value="about">About</TabsTrigger>
                                        <TabsTrigger value="contributers">Contributers</TabsTrigger>
                                        <TabsTrigger value="owner">Owner</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="about" className="h-[330px] overflow-scroll no-scrollbar">
                                        {/* <div className="flex items-center overflow-x-auto no-scrollbar ">
                                            {data.images.map((image, index) => (
                                                <div key={index} className="mx-1">
                                                    <img className="max-w-[400px] h-[200px] rounded-lg" src={image} alt={data.title} />
                                                </div>
                                            ))}
                                        </div> */}
                                        <div className="mt-4 p-3">
                                            <h2 className="text-xl font-semibold">About</h2>
                                            <p className="text-lg pt-2">{(data as { about: string }).about}</p>
                                        </div>
                                        <div className="mt-4 p-3">
                                            <h2 className="text-xl font-semibold">Contact</h2>
                                            {data && typeof data === 'object' && (
                                                <Link href={(data as { twitter: string }).twitter}>
                                                    <div className="pt-3"><Image src={"/twitter.svg"} alt="Twitter" width={30} height={30} /></div>
                                                </Link>
                                            )}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="contributers" className="h-[330px] overflow-scroll no-scrollbar">
                                        <div>
                                            <h2 className="text-xl font-semibold">Top Contributors</h2>
                                            {/* <div className="space-y-2 mt-2">
                                                {data.projectContributorsData.map((data, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <Avatar>
                                                            <AvatarImage alt={data.username} src={data.src} />
                                                        </Avatar>
                                                        <span className="font-medium">{data.username}</span>
                                                        <span className="ml-auto">{data.amount}</span>
                                                    </div>
                                                ))}
                                                <Button className="w-full mt-2" variant="outline">
                                                    View Leaderboard
                                                </Button>
                                            </div> */}
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
                                                    <span className="font-medium">{(data as { owner: { id: string } }).owner.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                {/* <DrawerFooter>
                          <Button>Submit</Button>
                          <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose>
                        </DrawerFooter> */}
                            </DrawerContent>

                        </Drawer>
                    </div>
                ))}
            </div>
            <div className="w-full lg:w-96 space-y-6 ">
                <div className="bg-gray-100 p-4 rounded-md max-lg:hidden">
                    <h2 className="text-xl font-semibold">Total Donations</h2>
                    <p className="text-3xl font-bold">$68,143</p>
                    <h2 className="text-xl font-semibold mt-4">Available Matching Pool</h2>
                    <p className="text-3xl font-bold">$50,000</p>
                    <DialogSubmitProject projectId={""}/>

                </div>
                <div>
                    <h2 className="text-xl font-semibold">Top Contributors</h2>
                    <div className="space-y-2 mt-2">
                        {contributorsData.map((data, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage alt={data.username} src={data.src} />
                                </Avatar>
                                <span className="font-medium">{data.username}</span>
                                <span className="ml-auto">{data.amount}</span>
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