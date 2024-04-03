import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "@/lib/abis/Factory.json";
import { FACTORY_CONTRACT_ADDRESS } from "@/lib/const";

export function DialogAddProject() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [projectLink, setProjectLink] = useState<string>("");
    const [contactLink, setContactLink] = useState<string>("");

    const createNewProject = async () => {
        try {
            // Connect to Ethereum provider
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Instantiate the contract
            const contract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, contractABI, signer);

            // Call the contract function to create a new project
            const tx = await contract.createNewProject(title, description, about, projectLink, contactLink);

            // Wait for transaction to complete
            await tx.wait();
            console.log('Transaction successful:', tx.hash);

            // Reset form fields
            setTitle("");
            setDescription("");
            setAbout("");
            setProjectLink("");
            setContactLink("");
        } catch (error) {
            console.error('Error occurred while creating project:', error);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createNewProject();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"} className="mt-4">Create new project +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Project Information</DialogTitle>
                        <DialogDescription>
                            Add details about your project.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-80">
                        <Card className="w-full max-w-3xl">
                            <CardContent className="p-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea className="min-h-[100px]" id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="about">About</Label>
                                            <Textarea className="min-h-[100px]" id="about" placeholder="About your project" value={about} onChange={(e) => setAbout(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="link">Project Link</Label>
                                            <Input id="projectLink" placeholder="Link of your project" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="link">Contact Link</Label>
                                            <Input id="contactLink" placeholder="Twitter Link" value={contactLink} onChange={(e) => setContactLink(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollArea>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
