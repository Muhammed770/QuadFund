
import { ExternalLinkIcon } from "./externalLinkIcon";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { getProjectsByOwner } from "@/lib/functions";
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi'
import { ProjectListType, ProjectType } from "@/types/types";

export function ListOfProjects({ onProjectSelect }: { onProjectSelect: (item: ProjectType) => void }) {


  const account = useAccount()
  const address = account?.address ?? '';
  const lowercaseAddress = address.toLowerCase();
  const [projects, setProjects] = useState<ProjectListType>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType>();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('address:', address);

        const projects:ProjectListType = await getProjectsByOwner(lowercaseAddress);
        console.log('All projects:', projects);

        // Create a Set to store unique project names
        const uniqueProjectNames = new Set();

        const filteredProjects = projects.filter(project => {
          if (!uniqueProjectNames.has(project.name)) {
            uniqueProjectNames.add(project.name);
            return true;
          }
          return false;
        });
        setProjects(filteredProjects);
        
      } catch (error) {
        console.error('Error fetching all projects:', error);
      }
    };
    fetchProjects();
  }, [address]);

  return (
    //md:grid-cols-2
    <section className="grid gap-6 overflow-y-scroll">
      {projects.map((item, index) => (
        <div key={index} className={`bg-white border rounded-lg overflow-hidden shadow-sm dark:bg-gray-950 ${item.id === selectedProject?.id ? 'border-blue-300 border-4' : ''}`}>
          <div className="flex items-center space-x-4 p-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
              <Image alt="Avatar" className="aspect-[1/1] object-cover" height="80" src={item.logo} width="80" />
            </div>
            <div className="grid gap-1 not-italic">
              <h3 className="font-semibold text-sm leading-none">{item.name}</h3>
              <p className="text-xs text-gray-500 leading-none dark:text-gray-400">{item.description}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center justify-between text-sm space-x-2">
              <Link className="font-medium inline-flex items-center space-x-1.5 text-sm" href={item.website}>
                <ExternalLinkIcon className="h-4 w-4" />
                <span>View</span>
              </Link>
              <Button size="sm" variant="outline" onClick={() => { onProjectSelect(item); setSelectedProject(item) }} >Select</Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
