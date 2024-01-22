import { IProject } from 'models/Project.types';
import './ProjectCard.styles.scss';
import { MoreBtn } from 'components/UI/MoreBtn';
import { useNavigate } from 'react-router-dom';
import { IAction } from 'models/MoreList.types';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setCurrentProject, setProjects } from 'store/reducers/ProjectsSlice';
import { MarkBtn } from 'components/UI/MarkBtn';
import { updateProjectImportant } from 'store/actionCreators/Projects';
import { ChangeProjectModal } from 'components/modals/ChangeProjectModal/ChangeProjectModal';
import { Notes } from '../Notes/Notes';
import { formatDistanceToNow } from 'date-fns';
import {ru} from 'date-fns/locale'


    



interface Props {
    project: IProject;
}

export const ProjectCard: React.FC<Props> = ({project}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {projects} = useAppSelector(state => state.ProjectsReducer);
    const [isImportant, setIsImportant] = useState(project.isImportant);
    const [isChanging, setIsChanging] = useState(false)
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
        dispatch(updateProjectImportant({
            projectId: project.id,
            isImportant: isImportant
        }))

        // console.log(project.isImportant)
    }, [isImportant])

    

    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(setCurrentProject(project))
        navigate(`/projects/${project.id}`)
    }

    function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        const newProjects = projects.filter((p) => p.id !== project.id);
        // const newProjects = [...projects];
        dispatch(setProjects([...newProjects]))
        console.log(projects)
        console.log('Результат фильтра', projects.filter((p) => p.id !== project.id))
        // projects.forEach(p => {
           
        //     // console.log('Этот проект:', project.id)
        //     // console.log('После удаления:', projects)
        // })
    }

    function handleChange(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        setIsChanging(true)
        console.log("Пост изменен")
    }


    function handleChangeImportant(e: React.MouseEvent<HTMLButtonElement>, isImportant: boolean) {
        e.stopPropagation()
        setIsImportant(isImportant ? false : true)
    }


    
    return (
        <>
            <div className="project-card" onClick={(e) => handleClick(e)}>
                
                <div className="project-card__header">
                    <h4 className="project-card__info">

                        <span className="project-card__title">{project.title}</span>  
            
                        <span className="project-card__date">{ 
                            formatDistanceToNow(project.date, {
                                locale: ru,
                                addSuffix: true,
                            })
                        }</span>
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
                    {/* <img className="project-card__desc-ico" src={infoIco} alt="" /> */}
                    <Notes project={project} notes={project.notes}/>
                    
                </div>
                
            </div>
            <ChangeProjectModal isShow={isChanging} setShow={setIsChanging} project={project}/>
        </>
    )
}