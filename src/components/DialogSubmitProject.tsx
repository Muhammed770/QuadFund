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

export function DialogSubmitProject() {
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
                <Button variant={"secondary"}>Create new project +</Button>
                <ScrollArea className="h-80">

                    <ListOfProjects />
                </ScrollArea>
                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
