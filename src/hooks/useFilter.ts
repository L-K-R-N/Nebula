import { useMemo } from 'react';

import { compareAsc } from 'date-fns';
import { IProject } from '@/models/Project.types';
import { TSorting } from '@/models/Filter.types';

export const useSortProjects = (projects: IProject[], sortingBy: TSorting) => {
   const newProjects = [...projects];
   switch (sortingBy) {
      case 'title':
         return newProjects.sort((a, b) => a.title.localeCompare(b.title));

      case 'desc':
         return newProjects.sort((a, b) => {
            let returnedProject: number = -1;

            if (a.desc && b.desc) {
               returnedProject = a.desc?.localeCompare(b.desc);
            }
            return returnedProject;
         });

      case 'date':
         return newProjects.sort((a, b) => compareAsc(b.date, a.date));
      default:
         return newProjects;
   }
};

export const useSearchProject = (projects: IProject[], request: string) => {
   const searchedProjects = useMemo(() => {
      return projects.filter((project) =>
         project.title.toLowerCase().includes(request.toLowerCase()),
      );
   }, [request, projects]);

   return searchedProjects;
};
