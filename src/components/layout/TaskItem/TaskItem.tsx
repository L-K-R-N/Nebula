
import { ITask } from 'models/TodoCard.types';
import './TaskItem.styles.scss';
import { BsStopwatchFill } from "react-icons/bs";
import { MoreBtn } from 'components/UI/MoreBtn';
import { useState } from 'react';
import { IAction } from 'models/MoreList.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateTasks } from 'store/actionCreators/Projects';
import { IProject } from 'models/Project.types';
import { ChangeTaskModal } from 'components/modals/ChangeTaskModal/ChangeTaskModal';
import { FaMarker } from 'react-icons/fa6';
import { FaComment } from 'react-icons/fa';
import { TaskCommentsModal } from 'components/modals/TaskCommentsModal/TaskCommentsModal';

interface Props {
    task: ITask;
    project: IProject;
}

export const TaskItem: React.FC<Props> = ({task, project}) => {

    const dispatch = useAppDispatch()
    const [isChanging, setIsChanging] = useState(false);
    const [isCommentsShow, setIsCommentsShow] = useState(false);
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
    function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        const newTasks = project.tasks.filter((t) => t.id !== task.id);
        dispatch(updateTasks({
            projectId: project.id,
            tasks: newTasks
        }))
        
    }

    function handleChange(e: React.MouseEvent<HTMLDivElement>) {
        setIsChanging(true)
        // console.log("Пост изменен")
    }

    return (
    <>
        <div className="task-item">
            <div className="task-item__header">
                <h5 className="task-item__title">{task.title}</h5>
                <MoreBtn list={projectActions} containerStyle={{
                                width: "34px",
                                height: "34px",
                            }}/>
            </div>
            <div className="task-item__main">
                <p className="task-item__desc">
                    {task.desc}
                </p>
                <hr />
            </div>
            <div className="task-item__footer">
            
                <BsStopwatchFill className='task-item__date-img'/>
                <div className="task-item__info">
                    <FaMarker className="task-item__notes"/>
                    <FaComment className="task-item__comments"
                        onClick={(e) => setIsCommentsShow(true)}
                    />
                
                </div>
            </div>
            <div></div>
        </div>
        <ChangeTaskModal task={task} project={project} isShow={isChanging} setShow={setIsChanging}/>
        <TaskCommentsModal 
            isShow={isCommentsShow} 
            setShow={setIsCommentsShow} 
            project={project} 
            task={task} 
            key={task.id}
        /> 
    </>
    
        
    )
}