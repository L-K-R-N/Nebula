import { Header } from "components/layout/Header/Header"
import './ProjectsPage.styles.scss'
import { Control } from "components/layout/Control/Control"
import { Projects } from "components/layout/Projects/Projects"
import { useAppSelector } from "store"


interface Props {

}

export const ProjectsPage: React.FC<Props> = () => {
    const {projects} = useAppSelector(state => state.ProjectsReducer);

    return (
        <div className="project-page">
                    <Control/>
                    <Projects projects={projects}/>
        </div>
    )
}