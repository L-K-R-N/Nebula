import { Header } from "components/layout/Header/Header"
import './ProjectsPage.styles.scss'
import { Control } from "components/layout/Control/Control"
import { Projects } from "components/layout/Projects/Projects"
import { useAppSelector } from "hooks/useAppSelector"
import { useSearchProject, useSortProjects } from "hooks/useFilter"
import { useEffect } from "react"


interface Props {

}

export const ProjectsPage: React.FC<Props> = () => {
    const {projects} = useAppSelector(state => state.ProjectsReducer);
    const {search, sortingBy} = useAppSelector(state => state.FilterReducer)
    const sortedProjects = useSortProjects(projects, sortingBy.value);
    const searchedProjects = useSearchProject(sortedProjects, search)

    
    return (
        <div className="project-page">
                    <Control/>
                    <Projects projects={searchedProjects}/>
        </div>
    )
}