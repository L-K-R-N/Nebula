import { Header } from "components/layout/Header/Header"
import './ImportantsPage.styles.scss'
import { Control } from "components/layout/Control/Control"
import { Projects } from "components/layout/Projects/Projects"


interface Props {

}

export const ImportantsPage: React.FC<Props> = () => {

    return (
        <div className="importants-page">
            <Header/>
            <main className="main">
               
                    <Control/>
                    <Projects/>
                
            </main>
        </div>
    )
}