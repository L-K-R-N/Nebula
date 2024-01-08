
import { ITodoCard } from 'models/TodoCard.types';
import { TaskItem } from '../TaskItem/TaskItem';
import './TodoCard.styles.scss';
import { FaPlus } from "react-icons/fa6";
import { AddTaskModal } from 'components/modals/AddTaskModal/AddTaskModal';
import { useEffect, useState } from 'react';
import { IProject } from 'models/Project.types';
interface Props {
    card: ITodoCard;
    project: IProject
}

export const TodoCard: React.FC<Props> = ({card, project}) => {

    const [isAddModalShow, setIsAddModalShow] = useState(false)

    useEffect(() => {
        // console.log(project.tasks)
    }, [project.tasks])

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
            {card.tasks?.map((task) => 
                <TaskItem project={project} key={task.id} task={task}/>
            )}
        </div>
        <AddTaskModal card={card} project={project} isShow={isAddModalShow} setShow={setIsAddModalShow}/>
    </section>
    
        
    )
}