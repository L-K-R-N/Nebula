import { IProject } from 'models/Project.types';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import './ProjectList.styles.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
    projects: IProject[];
}

export const ProjectList: React.FC<Props> = ({projects}) => {

    return (
        <div className="project-list">
            {projects.map((project) => 
                <ProjectCard key={project.id} project={project}/>
            )}
        </div>
        
    )
}