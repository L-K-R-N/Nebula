import { Header } from 'components/layout/Header/Header'
import './TodoPage.styles.scss'
import { FilterForm } from 'components/layout/FilterForm/FilterForm'
import { TodoArea } from 'components/layout/TodoArea/TodoArea'
import { useState } from 'react'
import { ITodoCard } from 'models/TodoCard.types'
interface Props {
    
}

export const TodoPage: React.FC<Props> = () => {
    const [cards, setCards] = useState<ITodoCard[]>([
        {id: 1, 
        tasks: [{id: 1, 
                date: '01.10.2023', 
                desc: 'Описание описание',
                isFixed: true,
                title: 'Создать to-do',

                }],
        title: 'Queue'
        },
        {id: 2, 
        tasks: [{id: 1, 
                date: '01.10.2023', 
                desc: 'Описание описание',
                isFixed: true,
                title: 'Создать приложение to-do',

                }],
        title: 'Development'
        },
        {id: 3, 
        tasks: [{id: 1, 
                date: '01.10.2023', 
                desc: 'Описание описание',
                isFixed: true,
                title: 'Создать приложение to-do',

                },
                {id: 2, 
                    date: '20.09.2023', 
                    desc: 'Описание описание описание',
                    isFixed: false,
                    title: 'Создать приложение to-do',
    
                    },
                ],
        title: 'Done'
        },
    ])
    return (
        <div className="todo-page">

            <section className="todo-page-control">
                <div className="wrapper todo-page-control__content">
                <h2 className="todo-page-control__title">
                    Название проекта
                </h2>
                {/* <FilterForm/> */}
                </div>
            </section>
            <TodoArea cards={cards}/>
        </div>
    )
}