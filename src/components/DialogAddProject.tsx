"use client"
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
import contractABI from "@/lib/abis/Contract.json";
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { useStorageUpload } from "@thirdweb-dev/react"
import { convertIPFSUriToUrl } from "@/lib/utils"
import { useSearchParams } from "next/navigation";

export function DialogAddProject(props: { projectId: string }) {

    const queries = useSearchParams();

    const projectContractAddr = queries.get('id') as string;
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [projectLink, setProjectLink] = useState<string>("");
    const [contactLink, setContactLink] = useState<string>("");
    const [isInterestedInVC, setIsInterestedInVC] = useState(false);
    const [logo, setLogo] = useState<any>(null);

    const { mutateAsync: upload } = useStorageUpload();

    const uploadDataToIPFS = async (): Promise<string> => {
        const file = logo ? logo[0] : null;
        const extension = file.name.split('.').pop();
        const newFile = new File([file], `image.${extension}`, { type: file.type });
        const uris = await upload({ data: [newFile] });
        console.log("uri",uris)
        return uris[0]
    }
    // console.log(projectContractAddr)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            let ipfsLink = ""
            event.preventDefault();
            // Connect to Ethereum provider

            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Instantiate the contract
            const contract = new ethers.Contract(projectContractAddr, contractABI, signer);
            if(typeof logo === null){
                toast.error("Please upload a logo")
                return
            } 
            else {
                ipfsLink = await uploadDataToIPFS()

                ipfsLink = convertIPFSUriToUrl(ipfsLink)
                console.log("ipfsLink", ipfsLink);

            }
            console.log(ipfsLink)
            console.log(title)
            console.log(description)
            console.log(about)
            console.log(projectLink)
            console.log(contactLink)

            // Call the contract function to create a new project
            const tx = await contract.creatNewProject(title, description, ipfsLink, about, projectLink, contactLink);

            // Wait for transaction to complete
            await tx.wait();
            console.log('Transaction successful:', tx.hash);

            // Reset form fields
            setTitle("");
            setDescription("");
            setAbout("");
            setProjectLink("");
            setContactLink("");
            toast.success("Project created successfully")
        } catch (error) {
            console.log("Error occured while creating project", error);
            toast.error("Error occured while creating project")
        }
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
                                            <Label>Logo</Label>
                                            <Input accept="image/*" id="logo" type="file" onChange={(e) => setLogo(e.target.files)} />
                                        </div>
                                        {/* <div className="space-y-2">
                                            <Label>Pictures</Label>
                                            <Input accept="image/*" id="pictures" multiple type="file" />
                                        </div> */}
                                        <div className="space-y-2">
                                            <Label htmlFor="link">Project Link</Label>
                                            <Input id="projectLink" placeholder="Link of your project" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="link">Contact Link</Label>
                                            <Input id="contactLink" placeholder="Twitter Link" value={contactLink} onChange={(e) => setContactLink(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <input type="checkbox" id="needsVc" onChange={(e) => { setIsInterestedInVC(e.target.checked) }} />
                                            <label
                                                htmlFor="needsVc"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1"
                                            >
                                                I'm interested in connecting with potential investors (VCs).
                                                <span className="tooltiptext text-xs text-gray-500 font-light pl-2">We will send your projects to potential investors for secure funding and mentorship.Costs $10.</span>
                                            </label>
                                        </div>
                                        {isInterestedInVC && <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" placeholder="Email address" />
                                        </div>}
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
