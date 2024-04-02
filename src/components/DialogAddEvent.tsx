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

export function DialogAddEvent() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4">Add new event +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
                                        <Input id="title" placeholder="Title" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea className="min-h-[100px]" id="description" placeholder="Description" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="prize">Prize Pool ($)</Label>
                                        <Input id="prize" placeholder="Prize pool" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date">End Date </Label>
                                        <DatePickerDemo />
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
                    <Button>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
