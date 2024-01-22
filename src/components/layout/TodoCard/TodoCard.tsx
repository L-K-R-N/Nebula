
import { ITask, ITodoCard } from 'models/Project.types';
import { TaskItem } from '../TaskItem/TaskItem';
import './TodoCard.styles.scss';
import { FaPlus } from "react-icons/fa6";
import { AddTaskModal } from 'components/modals/AddTaskModal/AddTaskModal';
import { ReactNode, useEffect, useState } from 'react';
import {  IProject } from 'models/Project.types';
import { DndContext, DragEndEvent, closestCenter, rectIntersection, useDroppable } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateCards, updateTasks } from 'store/actionCreators/Projects';
import { CSS } from '@dnd-kit/utilities';
import { MoreBtn } from 'components/UI/MoreBtn';
import { IAction } from 'models/MoreList.types';
import { ChangeCardModal } from 'components/modals/ChangeCardModal/ChangeCardModal';
interface Props {
    card: ITodoCard;
    project: IProject;
}



export const TodoCard: React.FC<Props> = ({card, project}) => {
    const dispatch = useAppDispatch()
    const [isAddingTask, setIsAddingTask] = useState(false);
    const {setNodeRef, listeners, attributes, isDragging, transform, transition, setActivatorNodeRef} = useSortable({
        id: card.id
    })
    const [isChanging, setIsChanging] = useState(false)
    const [cardActions, setCardActions] = useState<IAction[]>([
        {
            title: "Удалить",
            action: handleDelete
        },
        {
            title: "Изменить",
            action: handleChange
        },
        {
            title: "Добавить задачу",
            action: handleAddTask
        }
    ])

    function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
        
        const newCards = project.cards.filter((c) => c.id !== card.id)
        dispatch(updateCards({
            projectId: project.id,
            newCards
        }))
        
    }

    function handleChange(e: React.MouseEvent<HTMLDivElement>) {
        
        setIsChanging(true)
        // console.log("Пост изменен")
    }


    function handleAddTask(e: React.MouseEvent<HTMLDivElement>) {
        
        setIsAddingTask(true)
        // console.log("Пост изменен")
    }
    // const dragEndHandler = (event: DragEndEvent) => {
        
    //     console.log('dragEnd', event);
    //     const {active, over} = event;
    //     if (active.id === over?.id) {
    //         return;
    //     }
        
    //         const sorting = (tasks: ITask[]) => {
    //             const oldIndex = tasks.findIndex((task) => task.id === active.id);
    //             const newIndex = tasks.findIndex((task) => task.id === over?.id);
    //             return arrayMove(tasks, oldIndex, newIndex)
    //         }
    //         dispatch(updateTasks({
    //             projectId: project.id,
    //             cardTitle: card.title,
    //             tasks: sorting(card.tasks)
    //         }))
        
        
    // }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1
    }
    return (
        <section className="todo-card"
            style={style}
            ref={setNodeRef}
            {...attributes}
            
        >
        <div className="todo-card__header todo-card__header_queue">
            <div 
                className="todo-card__handle"
                {...listeners}
                ref={setActivatorNodeRef}
            ></div>
            <h3 className="todo-card__title"
                
            >
                {card.title}

            </h3>
            <MoreBtn list={cardActions} color='white'/>
        </div>
        
            <div 
                className="todo-card__main"
                // ref={setNodeRef}
            >
                {/* {children} */}
            {/* <DndContext > */}
                   <SortableContext items={card.tasks}>
                    {card.tasks?.map((task) => 
                            <TaskItem card={card} project={project} key={task.id} task={task}/>
                        )}
                   </SortableContext>
            {/* </DndContext> */}
            </div>
        
        <ChangeCardModal card={card} project={project} isShow={isChanging} setShow={setIsChanging}/>
        <AddTaskModal card={card} project={project} isShow={isAddingTask} setShow={setIsAddingTask}/>
    </section>
    
        
    )
}