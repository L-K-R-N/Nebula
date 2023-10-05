import { IProject } from 'models/Project.types';
import './ProjectCard.styles.scss';
import moreIco from 'assets/more.svg';
import bookmarkIco from 'assets/bookmark.svg'
import infoIco from 'assets/info.svg'
import markIco from 'assets/mark.svg'
interface Props {
    project: IProject;
    click: () => void;
}

export const ProjectCard: React.FC<Props> = ({project, click}) => {

    return (
        <div className="project-card" onClick={() => click()}>
            <div className="project-card__header">
                <h4 className="project-card__info">
                    <span className="project-card__id">{project.id}. </span> 

                    <span className="project-card__title">{project.title} </span>  
        
                    <span className="project-card__date">({project.date})</span>
                </h4>
                <div className="project-card__control">
                   
                    <img 
                        className="project-card__important" 
                        src={bookmarkIco} 
                        alt={project.isImportant ? 'Удалить из важного' : 'Добавить в важное'} 
                        style={{
                            filter: project.isImportant ?  'invert(82%) sepia(11%) saturate(4195%) hue-rotate(320deg) brightness(103%) contrast(101%)' : 'invert(47%) sepia(1%) saturate(431%) hue-rotate(314deg) brightness(95%) contrast(86%)'
                        }}/>
                    <img 
                        className="project-card__change" 
                        src={moreIco} 
                        alt='Изменить'
                        />
                    
                    
                </div>
            </div>
            <div className="project-card__main">
                <p className="project-card__desc">
                   {project.desc}
                   
                </p>
                <img className="project-card__desc-ico" src={infoIco} alt="" />
                <div className="project-card__notes">
                    {project.notes.map((note) => 
                        <span key={note} className="project-card__note">
                            {note}
                        </span>
                    )}
                    
                    
                </div>
                <img className="project-card__notes-ico" src={markIco} alt="" />
            </div>
        </div>
        
    )
}