
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Home() {

  const events = [
    {
      title: "EthIndia",
      description: "Description 1",
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
            <Button size="lg" >Create Event</Button>
          </div>
        </div>

        <div className="pt-7">
          {events.map((event) => (
            <div className="flex-col justify-center items-center my-3">
              <Card className="flex justify-between">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                  <span className="text-sm bg-gray-200 p-1 rounded-lg">12th June 2023</span>
                </CardHeader>
                <CardContent className="flex justify-center items-center mt-5">
                  <p className="font-bold text-lg">{event.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
