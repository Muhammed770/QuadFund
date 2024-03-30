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
import { AddProjectForm } from "./add-project-form"
export function DialogAddProject() {
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

                    <AddProjectForm />
                </ScrollArea>
                {/* <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}
