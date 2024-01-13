
import { ITodoCard } from 'models/TodoCard.types';
import { TodoCard } from '../TodoCard/TodoCard';
import './TodoArea.styles.scss';
import { IProject } from 'models/Project.types';
import { useEffect, useMemo, useState } from 'react';

interface Props {
    project: IProject;
}

export const TodoArea: React.FC<Props> = ({project}) => {
    const cards = useMemo(() => {
        const cards: ITodoCard[] = [
            {
                id: 1, 
                tasks: project.tasks.queue,
                title: 'queue'
            },
            {
                id: 2, 
                tasks: project.tasks.development,
                title: 'development'
            },
            {
                id: 3, 
                tasks: project.tasks.done,
                title: 'done'
            },]
        return cards
    }, [project.tasks])
    
    // const [cards, setCards] = useState<ITodoCard[]>([
    //     {id: 1, 
    //     tasks: project.tasks.filter((task) => task.status === "queue"),
    //     title: 'Queue'
    //     },
    //     {id: 2, 
    //         tasks: project.tasks.filter((task) => task.status === "development"),
    //     title: 'Development'
    //     },
    //     {id: 3, 
    //         tasks: project.tasks.filter((task) => task.status === "done"),
    //     title: 'Done'
    //     },
    // ])

    useEffect(() => {
        // console.log('Карты обновлены')
    }, [cards])
    return (
        <div className='todo-area'>
            <div className="big-wrapper todo-area__content">
            {cards.map((card) => 
                <TodoCard project={project} key={card.id} card={card}/>
            )}
            </div>
        </div>
        
    )
}