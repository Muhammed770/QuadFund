"use client"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HeartHandshake } from 'lucide-react';
import { useState } from "react"

const DialogAmount = () => {
    const [amount, setAmount] = useState(1)
 
    function onClick(adjustment: number) {
        setAmount(Math.max(1, Math.min(10000, amount + adjustment)))
    }
    return ( 
        <Dialog>
            <DialogTrigger asChild>
            <div className="flex justify-center items-center">
                <Button size="lg" className="text-xl"> <HeartHandshake className="mx-2" />Contribute</Button>
            </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Amount</DialogTitle>
                    <DialogDescription>
                        Choose the amount to contribute.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => onClick(-1)}
                        disabled={amount <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center">
                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                          $USD
                        </div>
                        <div className="text-7xl font-bold tracking-tighter">
                          <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} className="w-[200px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full flex items-center"
                        onClick={() => onClick(1)}
                        disabled={amount >= 10000}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
                <DialogFooter>
                    <Button>Contribute</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
 
export default DialogAmount;