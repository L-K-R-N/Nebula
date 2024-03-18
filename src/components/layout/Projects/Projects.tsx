import cl from './Projects.module.scss';
import { IProject } from '@/models/Project.types';
import { ProjectList } from '../ProjectList/ProjectList';
import { Message } from '@/components/UI/Message/Message';
import { Wrapper } from '../Wrapper/Wrapper';

interface Props {
   projects: IProject[];
}

export const Projects: React.FC<Props> = ({ projects }) => {
   return (
      <div className={cl.projects}>
         <Wrapper>
            {projects.length ? (
               <ProjectList projects={projects} />
            ) : (
               <Message>Проекты не найдены :(</Message>
            )}
         </Wrapper>
      </div>
   );
};
