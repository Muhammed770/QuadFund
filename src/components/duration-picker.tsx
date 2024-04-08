
"use client"
import { useState ,useEffect } from 'react';

export function DurationPicker({ oneDurationSelect }: { oneDurationSelect : (days:number , hours:number, minutes:number) => void}) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    oneDurationSelect(days || 0, hours || 0, minutes || 0)
  }, [days, hours, minutes])

  return (
    <div className="grid w-full max-w-sm rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="border-t border-gray-200 dark:border-gray-800" />
      <div className="grid flex-1 overflow-hidden items-center justify-center p-4">
        <div className="flex gap-4">
          <div className="grid items-center gap-2" >
            <span className="justify-items-center  font-medium">Days</span>
            <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-900" />
            <input
              type="number"
              value={days}
              onChange={(e) => {
                if (Number(e.target.value) >= 0)
                  setDays(parseInt(e.target.value))
              }
              }
              className="h-12 w-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-black"
            />
          </div>
          <div className="grid items-center justify-items-center gap-2">
            <span className=" font-medium">Hours</span>
            <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-900" />
            <input
              type="number"
              value={hours}
              onChange={(e) => {
                if (Number(e.target.value) >= 0 && Number(e.target.value) < 24)
                  setHours(parseInt(e.target.value))
              }
              }
              className="h-12 w-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-black"
            />
          </div>
          <div className="grid items-center gap-2 justify-items-center">
            <span className=" font-medium">Minutes</span>
            <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-900" />
            <div className="h-12 w-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center">
              <input
                type="number"
                value={minutes}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0  && Number(e.target.value) < 60)
                    setMinutes(parseInt(e.target.value))
                  
                }
                }
                className="h-12 w-12 rounded-full border  border-gray-200 dark:border-gray-800 flex items-center justify-center text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-black "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
