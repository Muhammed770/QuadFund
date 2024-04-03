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
import { toast } from "sonner";
import { ethers } from "ethers";
import contractABI from "@/lib/abis/Contract.json";

const DialogAmount = () => {

    const [amount, setAmount] = useState(1)

    const contributeToProject = async () => {
        try {
            // Connect to Ethereum provider
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Instantiate the contract
            const contract = new ethers.Contract("0x2dc56b6b7a483298971a22463d042f9ae95fb969", contractABI, signer);

            // Call the contract function to contribute to the project
            const tx = await contract.contribute("0x02452356c1bf14d42c50566b9acb19c33d3377e2206a83948657d32ec4264d74", 1,{value:5});
            // Wait for transaction to complete
            await tx.wait();
            console.log('Transaction successful:', tx.hash);
        } catch (error) {
            console.error('Error occurred while contributing to project:', error);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            await contributeToProject();
            toast.success("Contributed to project successfully")
        }
        catch (error) {
            toast.error("Error occurred while contributing to project. Please try again.")
            console.error('Error while contributing:', error);
        }
    }


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
                    <Button onClick={(event) => { event.preventDefault(); handleSubmit(event as any); }}>Contribute</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogAmount;