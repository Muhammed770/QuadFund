import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import {DialogAddEvent} from "@/components/DialogAddEvent"
export default function Home() {

  const events = [
    {
      title: "EthIndia",
      description: "Indias largest Ethereum hackathon rkrmvrvmem krmlkrmv rklvlrmlqvmrlvrm",
      content: "$10000"
    },
    {
      title: "HackFS",
      description: "Description 2",
      content: "$20000"
    },
    {
      title: "Hack@Arch",
      description: "Description 3",
      content: "$3000"
    },
    {
      title: "Proxy'23",
      description: "Description 4",
      content: "$1000"
    }
  ]

  return (
    <main className="flex-col">
      <div className="justify-center items-center md:p-10 p-6">

        <div className="flex justify-between">
          <text className="font-extrabold text-3xl">
            Events
          </text>
          <div className="">
            {/* <Button size="lg" >Create Event</Button> */}
            <DialogAddEvent />
          </div>
        </div>

        <div className="pt-7 md:grid grid-cols-3 gap-4">
          {events.map((event) => (
            <div className="flex-col justify-center items-center my-3">
              <Link
                href={`/e/${event.title}`}
              >
                <Card className="flex justify-between h-[200px]">
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                    <div className="md:py-6 md:flex ">
                      <div className="text-sm bg-gray-100 p-2 rounded-lg w-fit mr-2">open</div>
                      <div className="text-sm bg-gray-100 p-2 rounded-lg w-fit">12th June 2023</div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center">
                    <p className="font-bold text-lg">{event.content}</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
