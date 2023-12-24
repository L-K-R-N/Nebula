import { IProject } from 'models/Project.types';
import './ProjectCard.styles.scss';
import bookmarkIco from './assets/bookmark.svg'
import infoIco from './assets/info.svg'
import markIco from './assets/mark.svg'
import { MoreBtn } from 'components/UI/MoreBtn';
import { useNavigate } from 'react-router-dom';
import { IAction } from 'models/MoreList.types';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setProjects } from 'store/reducers/ProjectsSlice';
import { BtnIcon } from 'components/UI/BtnIcon';
import { MarkBtn } from 'components/UI/MarkBtn';
import { updateImportant } from 'store/actionCreators/Projects';



    



interface Props {
    project: IProject;
}

export const ProjectCard: React.FC<Props> = ({project}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {projects} = useAppSelector(state => state.ProjectsReducer);
    const [isImportant, setIsImportant] = useState(project.isImportant)
    const [projectActions, setProjectActions] = useState<IAction[]>([
        {
            title: "Удалить",
            action: handleDelete
        },
        {
            title: "Изменить",
            action: handleChange
        },
    
    ])



    useEffect(() => {
        dispatch(updateImportant({
            projectId: project.id,
            isImportant: isImportant
        }))

        console.log(project.isImportant)
    }, [isImportant])


    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        navigate(`/projects/:${project.id}`)
    }

    function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        
        const newProjects = [...projects];
        dispatch(setProjects(newProjects.filter((p) => p.id !== project.id)))
        console.log(projects)
        // console.log(newProjects)
    }

    function handleChange(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        console.log("Пост изменен")
    }


    function handleChangeImportant(e: React.MouseEvent<HTMLButtonElement>, isImportant: boolean) {
        e.stopPropagation()
        setIsImportant(isImportant ? false : true)
    }

    
    return (
        <div className="project-card" onClick={(e) => handleClick(e)}>
            <div className="project-card__header">
                <h4 className="project-card__info">
                    <span className="project-card__id">{project.id}. </span> 

                    <span className="project-card__title">{project.title} </span>  
        
                    <span className="project-card__date">({project.date})</span>
                </h4>
                <div className="project-card__control">
                   
                    <MarkBtn active={project.isImportant} setActive={(e) => handleChangeImportant(e, isImportant)}/>
                    <MoreBtn list={projectActions} containerStyle={{
                        width: "34px",
                        height: "34px",
                    }}/>
                    
                    
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