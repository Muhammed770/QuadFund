"use client"
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
import { ListOfProjects } from "./list-of-projects"
import { ScrollArea } from "./ui/scroll-area"
import { DialogAddProject } from "./DialogAddProject"
import { toast } from "sonner"
import { ProjectType } from "@/types/types"
import { useState } from "react"
import { ethers } from "ethers"
import { useSearchParams } from "next/navigation"
import contractABI from "@/lib/abis/Contract.json";

export function DialogSubmitProject(props: { projectId: string }) {

    const queries = useSearchParams();

    const projectContractAddr = queries.get('id') as string;

    const [projectSelected, setProjectSelected] = useState<ProjectType>();
    const handleSubmit = async () => {
        //Add to contract
        try {
            if(projectSelected){

                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(projectContractAddr, contractABI, signer);
    
                // Call the contract function to create a new project
                const tx = await contract.creatNewProject(projectSelected?.name,projectSelected.description,projectSelected.logo,projectSelected.about,projectSelected.website,projectSelected.twitter);
    
                // Wait for transaction to complete
                await tx.wait();
                console.log('Transaction successful:', tx.hash);
    
                console.log("Project selected:", projectSelected);
                toast.success("Project added successfully")
            } else {
                toast.error("Please select a project")
            }

        } catch (error) {
            console.error('Error submitting project:', error);
            toast.error("Error submitting project")
        }
    }

    const handleProjectSelect = (item: ProjectType) => {
        setProjectSelected(item);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full mt-4">Submit your project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit your project</DialogTitle>
                    <DialogDescription>
                        Select a project or create new one. Click submit when you're done.
                    </DialogDescription>
                </DialogHeader>
                <DialogAddProject projectId={props.projectId} />
                <ScrollArea className="h-80">

                    <ListOfProjects onProjectSelect={handleProjectSelect} />
                </ScrollArea>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={!projectSelected}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
