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
import { ScrollArea } from "./ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { toast } from "sonner"

export function DialogAddProject() {

    const [isInterestedInVC, setIsInterestedInVC] = useState(false);

    function handleSubmit() {
        //Add to contract

        toast.success("Project created successfully")
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"} className="mt-4">Create new project +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Project Information</DialogTitle>
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
                                        <Input id="title" placeholder="Title" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea className="min-h-[100px]" id="description" placeholder="Description" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="about">About</Label>
                                        <Textarea className="min-h-[100px]" id="about" placeholder="About you project" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Logo</Label>
                                        <Input accept="image/*" id="logo" type="file" />
                                    </div>
                                    {/* <div className="space-y-2">
                                        <Label>Pictures</Label>
                                        <Input accept="image/*" id="pictures" multiple type="file" />
                                    </div> */}
                                    <div className="space-y-2">
                                        <Label htmlFor="link">Project Link</Label>
                                        <Input id="link" placeholder="Link of your project" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="link">Contact Link</Label>
                                        <Input id="ContactLink" placeholder="Twitter Link" />
                                    </div>
                                    <div className="space-y-2">
                                        <input type="checkbox" id="needsVc" onChange={(e)=>{setIsInterestedInVC(e.target.checked)}}/>
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
                {/* <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter> */}
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
