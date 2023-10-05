import {useMemo} from 'react';

import { IProject } from "models/Project.types";




export const useSortProjects = (projects: IProject[], sortBy: string) => {

    

    switch (sortBy) {
        case 'title':
            return projects.sort((a, b) => a.title.localeCompare(b.title));
            
        case 'desc':
            return projects.sort((a, b) => a.desc.localeCompare(b.desc));
            
        // case 'date':
        //     return projects.sort((a, b) => a.title.localeCompare(b.title));
        default: 
            return projects;
    }
    
    
}


export const useSearchProject = (projects: IProject[], request: string, sortBy: string) => {

    const sortedProjects = useSortProjects(projects, sortBy);
    const searchedProjects = useMemo(() => {
        
            return sortedProjects.filter((project) => project.title.toLowerCase().includes(request.toLowerCase()) 
            )
         
    }, [request, projects]);
    
    return searchedProjects;
}

