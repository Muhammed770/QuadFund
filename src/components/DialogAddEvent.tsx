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
import { ScrollArea } from "./ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, Card } from "@/components/ui/card"
import { DatePickerDemo } from "./DatePicker"
import { toast } from "sonner"
import {  ethers } from "ethers"
import contractABI from "@/lib/abis/Factory.json"
import { USDToWei } from "@/lib/functions"
import { FACTORY_CONTRACT_ADDRESS } from "@/lib/const"
import { useState } from "react"

export function DialogAddEvent() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string | number | readonly string[] | undefined>("");
    const [prizePool, setPrizePool] = useState<string>("0")
    const [endDate, setEndDate] = useState<number | undefined>();
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);


    // const handleTitleChange =(e :React.ChangeEvent<HTMLInputElement>)=> {
    //     setTitle(e.target.value);
    // }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setIsFormSubmitting(true);
            // Connect to the Ethereum network using MetaMask or other injected providers
            console.log("endDate", endDate);

            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();



            //Instantiate the contract
            const contract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, contractABI, signer);
            // Call the contract function to add a new event
            console.log("prizePool", prizePool)
            // console.log("prizePool in ETH", ethers.utils.parseEther(prizePool.toString()))
            const amountinwei = USDToWei(prizePool) * 10 ** 18;
            const tx = await contract.createFundingContract(title, description, amountinwei, endDate, { value: amountinwei+1000000 });
            //waiting for transaction to completew
            await tx.wait();
            console.log('Transaction successfull', tx.hash);
            setTitle("")
            setDescription("")
            setPrizePool("0")

            console.log(tx.hash);
            toast.success("Event created successfully")

        } catch (error) {
            console.log("Error occured while creating event", error);
            setIsFormSubmitting(false);
        }
    }

    const handleDateSelect = (date: number) => {
        setEndDate(date); // Update the endDate state
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4">Add new event +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>

                    <DialogHeader>
                        <DialogTitle>Event Information</DialogTitle>
                        <DialogDescription>
                            Add details about your project.
                        </DialogDescription>
                    </DialogHeader>
                    {/* <Button variant={"secondary"}>Create new project +</Button> */}
                    <ScrollArea className="h-80">

                        <Card className="w-full max-w-3xl">
                            <CardContent className="p-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input id="title" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea className="min-h-[100px]" id="description" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="prize">Prize Pool (USD)</Label>
                                            <Input id="prize" type="text" placeholder="Prize pool" value={prizePool} onChange={(e) => { setPrizePool(e.target.value) }} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="date">End Date </Label>
                                            <DatePickerDemo onDateSelect={handleDateSelect} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollArea>
                    {/* <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter> */}
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button disabled={isFormSubmitting} type="submit">Submit</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
