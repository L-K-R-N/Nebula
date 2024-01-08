import { Header } from 'components/layout/Header/Header'
import './TodoPage.styles.scss'
import { FilterForm } from 'components/layout/FilterForm/FilterForm'
import { TodoArea } from 'components/layout/TodoArea/TodoArea'
import { useEffect, useState } from 'react'
import { ITodoCard } from 'models/TodoCard.types'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'hooks/useAppSelector'
import { IProject } from 'models/Project.types'
interface Props {
    
}

export const TodoPage: React.FC<Props> = () => {
    const {projects} = useAppSelector(state => state.ProjectsReducer)
    const {id} = useParams();
    const project = projects.find((p) => p.id === Number(id))
    // const [project, setProject] = useState<IProject>()
    useEffect(() => {
        // console.log(project)
        // setProject(projects.find((p) => p.id === Number(id)))
    }, [project])


    
    return (
        <div className="todo-page">

            {/* <section className="todo-page-control">
                <div className="wrapper todo-page-control__content">
                
                <FilterForm/>
                </div>
            </section> */}
            {project && 
                <TodoArea project={project}/>
            }
        </div>
    )
}