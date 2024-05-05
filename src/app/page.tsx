"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { DialogAddEvent } from "@/components/DialogAddEvent"
import { useAccount } from 'wagmi'
import { Button } from "@/components/ui/button"
import { Award } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { getAllEvents, weiToUSD } from "@/lib/functions"
import { useState, useEffect } from 'react';
import { QuadFundEventListType } from "@/types/types";
import { truncateString } from "@/lib/utils";
export default function Home() {
  const [events, setEvents] = useState<QuadFundEventListType>([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const events = await getAllEvents();

        console.log('All events:', events);
        setEvents(events);
      } catch (error) {
        console.error('Error fetching all events:', error);
      }
    };
    fetchAllEvents();
  }, []);



  const account = useAccount()

  return (
    <main className="flex-col">
      <div className="justify-center items-center md:p-10 p-6">

        <div className="flex justify-between">
          <text className="font-extrabold text-3xl">
            Events
          </text>
          <div className="">
            <Link href="/grants">
              <Button className="bg-white text-black border-2 border-black hover:bg-gray-50 mr-3">Explore Grants<Award /></Button>
            </Link>
            {account.address && <DialogAddEvent />}
          </div>
        </div>

        <div className="pt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events && events.map((event) => (
            <div key={event.id} className="flex-col justify-center items-center my-3">
              <Link href={{
                pathname: `/event/${event.name}`,
                query: { id: event.id, name: event.name }
              }}>
                <Card className="flex justify-between h-[200px] ">
                  <CardHeader >
                    <CardTitle>{event.name}</CardTitle>
                    <div>

                      <CardDescription className="max-h-[45px]">{truncateString(event.description,12)}</CardDescription>
                    </div>
                    <div className="md:py-6 md:flex ">
                      {parseInt(event.endTime) > Date.now() ?
                        <div className="text-sm bg-green-100 p-2 rounded-lg w-fit mr-2 flex items-center">
                          <div className="mx-1.5 relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </div>
                          Open
                        </div>
                        :
                        <div className="text-sm bg-red-100 p-2 rounded-lg w-fit mr-2 flex items-center">
                          <div className="mx-1.5 relative flex h-3 w-3">
                            <span className="inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </div>
                          Closed
                        </div>

                      }
                      <div className="text-xs text-slate-500  p-2 rounded-lg w-fit flex items-center">
                        <span className="mr-1"><Calendar size={18} /></span>
                        {/* {new Date(parseInt(event.startTime)).toLocaleDateString()} */}


                        {new Date(parseInt(event.endTime)).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center">
                    <p className="font-bold text-lg">${weiToUSD(event.prizePool)}</p>
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
