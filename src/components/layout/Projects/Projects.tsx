import { IProject } from 'models/Project.types';

import {useState} from 'react'
import './Projects.styles.scss';
import { ProjectList } from '../ProjectList/ProjectList';
import { useSearchProject } from 'hooks/useFilter';
import { useTypesSelector } from 'hooks/useTypesSelector';

interface Props {
    
}

export const Projects: React.FC<Props> = () => {
    const [projects, setProjects] = useState<IProject[]>([
        {id: 1, title: 'Dao-do-list', desc: 'ато очень интересное тестовое задание', notes: ['React', 'TypeScript'], date: '10.03.2023', isImportant: true},
        {id: 2, title: 'Ao-do-list', desc: 'Рто очень интересное тестовое задание', notes: ['React', 'TypeScript'], date: '10.03.2023', isImportant: true},
        {id: 3, title: 'To-do-list', desc: 'Это очень интересное тестовое задание', notes: ['React', 'TypeScript'], date: '10.03.2023', isImportant: false},
    ])
    const {projectRequest, sortingBy} = useTypesSelector(state => state.filter)
    const searchedProjects = useSearchProject(projects, projectRequest, sortingBy)
    return (
        <div className="projects">
            <div className="wrapper">
                <ProjectList projects={searchedProjects}/>
            </div>
        </div>
        
    )
}