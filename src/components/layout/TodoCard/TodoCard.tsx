
import { ITodoCard } from 'models/TodoCard.types';
import { TaskItem } from '../TaskItem/TaskItem';
import './TodoCard.styles.scss';
import plus from './assets/plus.svg'
interface Props {
    card: ITodoCard;

}

export const TodoCard: React.FC<Props> = ({card}) => {

    return (
        <section className="todo-card">
        <div className="todo-card__header todo-card__header_queue">
            <h3 className="todo-card__title">
                {card.title}
            </h3>
            <img className="todo-card__add" src={plus} alt="" />
        </div>
        <div className="todo-card__main">
            {card.tasks?.map((task) => 
                <TaskItem key={task.id} task={task}/>
            )}
        </div>
    </section>
    
        
    )
}