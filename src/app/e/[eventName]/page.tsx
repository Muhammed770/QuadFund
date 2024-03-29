import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { CardContent, Card } from "@/components/ui/card"
import Image from "next/image"
import { DialogSubmitProject } from "@/components/DialogSubmitProject"

const EventPage = ({ params }: { params: { eventName: string } }) => {
    const cardData = [
        {
            title: "Project A",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            contributors: "10 Contributors • $100K Matched",
            src: "https://images.unsplash.com/photo-1711139299064-f60e2753163f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Project B",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            contributors: "20 Contributors • $200K Matched",
            src: "https://images.unsplash.com/photo-1707344088547-3cf7cea5ca49?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Project C",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            contributors: "30 Contributors • $300K Matched",
            src: "https://images.unsplash.com/photo-1710975090677-5955bce9d325?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Project D",
            description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            contributors: "40 Contributors • $400K Matched",
            src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Project E",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            contributors: "50 Contributors • $500K Matched",
            src: "https://images.unsplash.com/photo-1708649290066-5f617003b93f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const contributorsData = [
        { username: "@zain", amount: "$5k", src: "https://ui.shadcn.com/avatars/04.png/?height=24&width=24" },
        { username: "@neda", amount: "$3.77k", src: "https://ui.shadcn.com/avatars/01.png/?height=24&width=24" },
        { username: "@shiyas", amount: "$2.87k", src: "https://ui.shadcn.com/avatars/02.png/?height=24&width=24" },
        { username: "@muhammed770", amount: "$1.57k", src: "https://ui.shadcn.com/avatars/04.png/?height=24&width=24" }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 md:p-8 p-4">
            <div className="flex-1 space-y-6">
                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-bold inline-flex">{params.eventName}</h1>
                    <div className="w-44">

                        <Badge className="flex-none bg-green-200" variant="secondary">Voting ends in:05:04:00</Badge>
                        <div className="lg:hidden">

                            <DialogSubmitProject />
                        </div>
                    </div>

                </div>


                <div className="flex gap-2 overflow-x-auto no-scrollbar ">


                    <Badge className="flex-none" variant="secondary">Ongoing round</Badge>

                    <Button variant="ghost">All projects</Button>
                    <Button variant="ghost">Infrastructure</Button>
                    <Button variant="ghost">DAO</Button>
                    <Button variant="ghost">Dev Tool</Button>
                    <Button variant="ghost">DeFi</Button>
                </div>
                {cardData.map((data, index) => (
                    <Card key={index} className="w-full overflow-hidden">
                        <CardContent className="flex  p-0 gap-4">

                            <Image width={200} height={100} style={{ objectFit: 'contain' }} className="max-md:hidden" src={data.src} alt={data.title} />
                            <div className="flex  p-2">

                                <div>
                                    <h2 className="text-xl font-semibold">{data.title}</h2>
                                    <p className="text-sm text-gray-600">{data.description}</p>
                                    <p className="text-sm">{data.contributors}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="w-full lg:w-96 space-y-6 ">
                <div className="bg-gray-100 p-4 rounded-md max-lg:hidden">
                    <h2 className="text-xl font-semibold">Total Donations</h2>
                    <p className="text-3xl font-bold">$68,143</p>
                    <h2 className="text-xl font-semibold mt-4">Available Matching Pool</h2>
                    <p className="text-3xl font-bold">$50,000</p>
                    <DialogSubmitProject />

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