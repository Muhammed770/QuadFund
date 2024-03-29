
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AddProjectForm() {
  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="p-6">
        <div className="grid gap-6">
          {/* <div className="grid gap-2">
            <h2 className="text-lg font-medium leading-6">Project Information</h2>
            <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">Add details about your project.</p>
          </div> */}
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
              <Label>Logo</Label>
              <Input accept="image/*" id="logo" type="file" />
            </div>
            <div className="space-y-2">
              <Label>Pictures</Label>
              <Input accept="image/*" id="pictures" multiple type="file" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="Enter tags" />
              <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">Comma-separated list of tags.</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2.5 p-4">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  )
}
