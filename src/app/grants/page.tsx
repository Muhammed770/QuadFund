
import { CardHeader, CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card"
import Link from 'next/link'
import { Award } from 'lucide-react';

export default function Component() {

    const cardData = [
        {
          title: "Graph",
          description: "The Graph grants program is a gateway for contributing to web3. Grants are awarded for protocol, tooling, subgraph and dapp development, and growth initiatives.",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_of_The_Graph.jpg/378px-Logo_of_The_Graph.jpg",
          link: "https://thegraph.com/ecosystem/grants/"
        },
        {
          title: "Alliance DAO",
          description: "Accelerating the best crypto founders Alliance is the leading crypto accelerator & founder community.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpGigtUm9qDYqJF9h6bjfNDdaNO9wG34Jj32Em4GRCJw&s",
          link: "https://alliance.xyz/apply"
        },
        {
          title: "Scroll",
          description: "Scroll is the native zkEVM Layer 2 Solution for Ethereum. ",
          image: "https://chainbroker.io/_next/image/?url=https%3A%2F%2Fstatic.chainbroker.io%2Fmediafiles%2Fprojects%2Fscroll%2Fscroll.jpeg&w=768&q=75",
          link: "https://www.suci.io/programs/project-two-ky966-as65s-9l6kb"
        },
        {
            title: "1inch Foundation",
            description: "The 1inch Foundation Grant Program fosters growth and expansion of the 1inch Network and incentivizes contributions through grants and resources",
            image: "https://cryptologos.cc/logos/1inch-1inch-logo.png?v=029",
            link: "https://1inch.io/foundation-grant-program/"
        },
        {
            title: "Arbitrium",
            description: "The Arbitrum Foundation Grant Program supports builders with milestones-based funding for growth.",
            image: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029",
            link: "https://arbitrum.foundation/grants"
        },
        {
            title: "Polygon",
            description: "Polygon Village’s mission is to fuel the evolution of web3 startups by offering founders the support and resources they need to thrive.",
            image: "https://i.pinimg.com/474x/9b/1e/97/9b1e977d00b5d887608b156705a10759.jpg",
            link: "https://polygon.technology/village"
        },
      ];

  return (
    <div className="md:p-10 p-4">
       <div className="text-2xl font-bold flex justify-center pb-5">GRANTS <Award size={35}/></div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cardData.map((card, index) => (
        <Link href={card.link} target="_blank">
          <Card key={index} className="h-[260px] overflow-auto no-scrollbar">
            <CardHeader className="">
              <img
                alt="Logo"
                className="aspect-square rounded-xl overflow-hidden"
                height={80}
                src={card.image}
                width={80}
              />
            </CardHeader>
            <CardContent className="">
              <CardTitle className="text-base">{card.title}</CardTitle>
              <CardDescription className="text-sm">{card.description}</CardDescription>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

