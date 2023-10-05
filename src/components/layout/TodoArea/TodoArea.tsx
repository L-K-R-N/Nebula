
import { ITodoCard } from 'models/TodoCard.types';
import { TodoCard } from '../TodoCard/TodoCard';
import './TodoArea.styles.scss';

interface Props {
    cards: ITodoCard[];
}

export const TodoArea: React.FC<Props> = ({cards}) => {
   
    return (
        <div className='todo-area'>
            <div className="wrapper todo-area__content">
            {cards.map((card) => 
                <TodoCard key={card.id} card={card}/>
            )}
            </div>
        </div>
        
    )
}