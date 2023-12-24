import {useMemo} from 'react';

import { IProject } from "models/Project.types";
import { SortingType } from 'models/Filter.types';




export const useSortProjects = (projects: IProject[], sortingBy: SortingType) => {
    const newProjects = [...projects]
    switch (sortingBy) {
        case 'title':
            return newProjects.sort((a, b) => a.title.localeCompare(b.title));
            
        case 'desc':
            return newProjects.sort((a, b) => a.desc.localeCompare(b.desc));
            
        case 'id':
            return newProjects.sort((a, b) => a.id - b.id);
        default: 
            return newProjects;
    }
    
}


export const useSearchProject = (projects: IProject[], request: string) => {

    const searchedProjects = useMemo(() => {
        
    return projects.filter((project) => project.title.toLowerCase().includes(request.toLowerCase()) 
    )
         
    }, [request, projects]);
    
    return searchedProjects;
}

