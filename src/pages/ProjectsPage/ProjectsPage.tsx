import { Header } from "components/layout/Header/Header"
import './ProjectsPage.styles.scss'
import { Control } from "components/layout/Control/Control"
import { Projects } from "components/layout/Projects/Projects"


interface Props {

}

export const ProjectsPage: React.FC<Props> = () => {

    return (
        <div className="project-page">
            <Header/>
            <main className="main">
               
                    <Control/>
                    <Projects/>
                
            </main>
        </div>
    )
}