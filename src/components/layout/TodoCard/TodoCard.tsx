
import { ITask, ITodoCard } from 'models/TodoCard.types';
import { TaskItem } from '../TaskItem/TaskItem';
import './TodoCard.styles.scss';
import { FaPlus } from "react-icons/fa6";
import { AddTaskModal } from 'components/modals/AddTaskModal/AddTaskModal';
import { useEffect, useState } from 'react';
import { ICards, IProject } from 'models/Project.types';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateTasks } from 'store/actionCreators/Projects';
interface Props {
    card: ITodoCard;
    project: IProject
}

export const TodoCard: React.FC<Props> = ({card, project}) => {
    const dispatch = useAppDispatch()
    const [isAddModalShow, setIsAddModalShow] = useState(false)

    useEffect(() => {
        // console.log(project.tasks)
    }, [project.tasks])

    const dragEndHandler = (event: DragEndEvent) => {
        
        console.log('dragEnd', event);
        const {active, over} = event;
        if (active.id === over?.id) {
            return;
        }
        
            const sorting = (tasks: ITask[]) => {
                const oldIndex = tasks.findIndex((task) => task.id === active.id);
                const newIndex = tasks.findIndex((task) => task.id === over?.id);
                return arrayMove(tasks, oldIndex, newIndex)
            }
            dispatch(updateTasks({
                projectId: project.id,
                cardTitle: card.title,
                tasks: sorting(card.tasks)
            }))
        
        
    }
    return (
        <section className="todo-card">
        <div className="todo-card__header todo-card__header_queue">
            <h3 className="todo-card__title">
                {card.title}
            </h3>
            <FaPlus className="todo-card__add"
                onClick={() => setIsAddModalShow(true)}
            />
        </div>
        <div className="todo-card__main">
            <DndContext collisionDetection={closestCenter} onDragEnd={dragEndHandler}>
                <SortableContext items={card.tasks} strategy={verticalListSortingStrategy}>
                    {card.tasks?.map((task) => 
                        <TaskItem card={card} project={project} key={task.id} task={task}/>
                    )}
                </SortableContext>
            </DndContext>
        </div>
        <AddTaskModal card={card} project={project} isShow={isAddModalShow} setShow={setIsAddModalShow}/>
    </section>
    
        
    )
}