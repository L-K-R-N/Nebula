
import { ITask, ITodoCard } from 'models/Project.types';
import './TaskItem.styles.scss';
import { BsStopwatchFill } from "react-icons/bs";
import { MoreBtn } from 'components/UI/MoreBtn';
import { Fragment, useState } from 'react';
import { IAction } from 'models/MoreList.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateTasks } from 'store/actionCreators/Projects';
import {  IProject } from 'models/Project.types';
import { ChangeTaskModal } from 'components/modals/ChangeTaskModal/ChangeTaskModal';
import { FaMarker } from 'react-icons/fa6';
import { FaComment } from 'react-icons/fa';
import { TaskCommentsModal } from 'components/modals/TaskCommentsModal/TaskCommentsModal';
import { formatDistanceToNow } from 'date-fns';
import { ca, ru, ta } from 'date-fns/locale';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragOverlay, useDraggable } from '@dnd-kit/core';

interface Props {
    task: ITask;
    project: IProject;
    card: ITodoCard
}

export const TaskItem: React.FC<Props> = ({task, project, card}) => {
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
    // const {attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef} = useSortable({
        //     id: task.id,
    //     data: {
            
    //     }
    // })

    function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        
        const newTasks = card.tasks.filter((t) => t.id !== task.id)
        dispatch(updateTasks({
            projectId: project.id,
            cardId: card.id,
            newTasks: newTasks
        }))
        
    }

    function handleChange(e: React.MouseEvent<HTMLDivElement>) {
        
        setIsChanging(true)
        // console.log("Пост изменен")
    }
    
    function handleCommentsOpen(e: React.MouseEvent<SVGElement, MouseEvent>) {
        e.stopPropagation();
        e.preventDefault();
        
        setIsCommentsShow(true)
        console.log(isCommentsShow)
    }
    const {attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef, isDragging} = useSortable({
        id: task.id,
        
        data: {
            cardId: card.id,
            // taskIndex: card.tasks.indexOf(task)
        }
    })
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? .59 : 1
    }
    return (
    <div 
        className='task-item-container'
        
        {...attributes}
        style={style}
        ref={setNodeRef} 
    >
        
        <div 
            className="task-item" 
            
        >
             <div 
                className="task-item__handle"
                {...listeners}
                ref={setActivatorNodeRef}
            ></div>
            <div className="task-item__header">
                <h5 className="task-item__title">{task.title}</h5>
                <MoreBtn list={projectActions} containerStyle={{
                                width: "30px",
                                height: "30px",
                            }}/>
            </div>
            <div className="task-item__main">
                <p className="task-item__desc"  
                //  ref={setActivatorNodeRef}
                 >
                    {task.desc}
                </p>
                <hr />
            </div>
            <div className="task-item__footer">
            
                <span className='task-item__date'><BsStopwatchFill className='task-item__date_ico'/> 
                {task.date.completion > new Date() && formatDistanceToNow(task.date.completion, {
                    locale: ru,
                    addSuffix: true
                })  }
                {task.date.completion < new Date() && "Время вышло"}  </span>
                <div className="task-item__info">
                    <FaMarker className="task-item__notes"/>
                    <FaComment className="task-item__comments"
                        onClick={(e) => handleCommentsOpen(e)}
                    />
                
                </div>
            </div>
           
        </div>
        <ChangeTaskModal card={card} task={task} project={project} isShow={isChanging} setShow={setIsChanging}/>
        <TaskCommentsModal 
            
            isShow={isCommentsShow} 
            setShow={setIsCommentsShow} 
            project={project} 
            task={task} 
            card={card}
            key={task.id}
        /> 
        
    </div>
    
        
    )
}