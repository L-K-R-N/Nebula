import { IProject } from '@/models/Project.types';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import cl from './ProjectList.module.scss';

interface Props {
   projects: IProject[];
}

export const ProjectList: React.FC<Props> = ({ projects }) => {
   return (
      <div className={cl.list}>
         {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
         ))}
      </div>
   );
};
