import { Header } from "components/layout/Header/Header"
import './ImportantsPage.styles.scss'
import { Control } from "components/layout/Control/Control"
import { Projects } from "components/layout/Projects/Projects"
import { useAppSelector } from "store"


interface Props {

}

export const ImportantsPage: React.FC<Props> = () => {
    const {projects} = useAppSelector(state => state.ProjectsReducer);
    const importantProjects = projects.filter((project) => project.isImportant)
    return (
        <div className="importants-page">
            <main className="main">
               
                    <Control/>
                    <Projects projects={importantProjects}/>
                
            </main>
        </div>
    )
}