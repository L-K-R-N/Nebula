
import './Projects.styles.scss';
import { ProjectList } from '../ProjectList/ProjectList';
import { useSearchProject, useSortProjects } from 'hooks/useFilter';
import { useAppSelector } from 'hooks/useAppSelector';
import { IProject } from 'models/Project.types';

interface Props {
    projects: IProject[];
}

export const Projects: React.FC<Props> = ({projects}) => {
    
    

    
    return (
        <div className="projects">
            <div className="big-wrapper">
                {
                    projects.length ? <ProjectList projects={projects}/> : <h4>Проекты не найдены</h4>
                }
                
            </div>
        </div>
        
    )
}