
import { ITask, ITodoCard } from 'models/Project.types';
import { TodoCard } from '../TodoCard/TodoCard';
import './TodoArea.styles.scss';
import { IProject } from 'models/Project.types';
import { useEffect, useMemo, useState } from 'react';
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCorners, rectIntersection, useSensor, useSensors } from '@dnd-kit/core';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateCard, updateCards, updateTasks } from 'store/actionCreators/Projects';
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { TaskItem } from '../TaskItem/TaskItem';
import { setProjects } from 'store/reducers/ProjectsSlice';

interface Props {
    project: IProject;
}

type TDndItems = 'card' | 'task';

export const TodoArea: React.FC<Props> = ({project}) => {
    const dispatch = useAppDispatch()
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [currentCard, setCurrentCard] = useState<ITodoCard | null>(null);
    const [currentTask, setCurrentTask] = useState<ITask | null>(null);
    
    // const cards = useMemo(() => {
    //     const cards: ITodoCard[] = [
    //         {
    //             id: 1, 
    //             tasks: project.card.tasks.queue,
    //             title: 'queue'
    //         },
    //         {
    //             id: 2, 
    //             tasks: project.tasks.development,
    //             title: 'development'
    //         },
    //         {
    //             id: 3, 
    //             tasks: project.tasks.done,
    //             title: 'done'
    //         },]
    //     return cards
    // }, [project.tasks])
    
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


    function findValueOfItems(id: UniqueIdentifier | undefined, type: TDndItems, cards: ITodoCard[]) {
        if (type === 'card') {
          return cards.find((task) => task.id === id);
        }
        if (type === 'task') {
          return cards.find((card) =>
            card.tasks.find((task) => task.id === id),
          );
        }
      }

    const dragStartHandler = async (event: DragStartEvent) => {
        const {active} = event;
        const {id} = active;

        if (id.toString().includes('card') && id) {
            
            const card = project.cards.find((card) => card.id === id);
            if (card) {
                setCurrentCard(card);
                setActiveId(id);
            }
        }

        if (id.toString().includes('task') && id) {
            const cardId = active.data?.current?.cardId;
            const card = project.cards.find((card) => card.id === cardId);
            const task = card?.tasks.find((task) => task.id === id);
            if (card && task) {
                setCurrentCard(card);
                setCurrentTask(task);
                setActiveId(id);
            }
        }
        
    
        
    }
    const dragMoveHandler = async (event: DragMoveEvent) => {
        const {active, over} = event;

        if (
            
            over && 
            active &&
            active.id !== over.id &&
            active.id.toString().includes('task') && 
            over?.id.toString().includes('task') 
        ) {
            const activeCard = findValueOfItems(active.id, 'task', project.cards);
            const overCard = findValueOfItems(over.id, 'task', project.cards);

            if (!overCard || !activeCard) return;

            const activeCardIndex = project.cards.findIndex(
                (card) => card.id === activeCard.id
            )
            const overCardIndex = project.cards.findIndex(
                (card) => card.id === overCard.id
            )

           
            const activeTaskIndex = activeCard.tasks.findIndex(
                (task) => task.id === active.id
            )
            const overTaskIndex = overCard.tasks.findIndex(
                (task) => task.id === over.id
            )

            console.log(activeCardIndex, overCardIndex)
            if (activeCardIndex === overCardIndex) {
                // let newCards = [...project.cards];
                let newCard = {...activeCard};



                newCard.tasks = arrayMove(
                        newCard.tasks,
                        activeTaskIndex,
                        overTaskIndex
                )

               
            } else {
                let newActiveCard = {...activeCard};
                let newOverCard = {...overCard};
                let newActiveTasks = [...activeCard.tasks];
                let newOverTasks = [...overCard.tasks];
                // let newCards = Array.from(project.cards)
                
                // newActiveCard.tasks = []

                const [removedItem] = newActiveTasks.splice(
                    activeTaskIndex,
                    1
                )

                newActiveCard.tasks = newActiveTasks
                
                newOverTasks.splice(
                    activeTaskIndex,
                    0,
                    removedItem
                )

                newOverCard.tasks = newOverTasks
                // dispatch(updateCards({
                //     projectId: project.id,
                //     newCards
                    
                // }))
                dispatch(updateCard({
                    projectId: project.id,
                    cardId: newActiveCard.id,
                    newCard: newActiveCard
                    
                }))

                dispatch(updateCard({
                    projectId: project.id,
                    cardId: newOverCard.id,
                    newCard: newOverCard
                    
                }))

                // newCard.tasks = arrayMove(
                //         newCard.tasks,
                //         activeTaskIndex,
                //         overTaskIndex
                // )
            

        }

            
            
            // console.log(activeContainer?.id, overContainer?.id)
        }
        if (
            over && 
            active &&
            active.id !== over.id &&
            active.id.toString().includes('task') && 
            over?.id.toString().includes('card') 
        ) {
            console.log(1)


            const activeCard = findValueOfItems(active.id, 'task', project.cards);
            const overCard = findValueOfItems(over.id, 'card', project.cards);

            if (!overCard || !activeCard) return;

            const activeCardIndex = project.cards.findIndex(
                (card) => card.id === activeCard.id
            )
            const overCardIndex = project.cards.findIndex(
                (card) => card.id === overCard.id
            )

            const activeTaskIndex = activeCard.tasks.findIndex(
                (task) => task.id === active.id
            )

            if (activeCardIndex !== overCardIndex) {
                let newActiveCard = {...activeCard};
                let newOverCard = {...overCard};
                let newActiveTasks = [...activeCard.tasks];
                let newOverTasks = [...overCard.tasks];

                const [removedItem] = newActiveTasks.splice(
                    activeTaskIndex,
                    1
                )

                newActiveCard.tasks = newActiveTasks
                
                newOverTasks.push(removedItem)

                newOverCard.tasks = newOverTasks
                // dispatch(updateCards({
                //     projectId: project.id,
                //     newCards
                    
                // }))
                dispatch(updateCard({
                    projectId: project.id,
                    cardId: newActiveCard.id,
                    newCard: newActiveCard
                    
                }))

                dispatch(updateCard({
                    projectId: project.id,
                    cardId: newOverCard.id,
                    newCard: newOverCard
                    
                }))
            }
        }
    }

    const dragEndHandler = async (event: DragEndEvent) => {
        
        const {active, over} = event;

        if (
            
            over && 
            active &&
            active.id !== over.id &&
            active.id.toString().includes('task') && 
            over?.id.toString().includes('task') 
        ) {
            const activeCard = findValueOfItems(active.id, 'task', project.cards);
            const overCard = findValueOfItems(over.id, 'task', project.cards);

            if (!overCard || !activeCard) return;

            const activeCardIndex = project.cards.findIndex(
                (card) => card.id === activeCard.id
            )
            const overCardIndex = project.cards.findIndex(
                (card) => card.id === overCard.id
            )

           
            const activeTaskIndex = activeCard.tasks.findIndex(
                (task) => task.id === active.id
            )
            const overTaskIndex = overCard.tasks.findIndex(
                (task) => task.id === over.id
            )

            console.log(activeCardIndex, overCardIndex)
            if (activeCardIndex === overCardIndex) {
                // let newCards = [...project.cards];
                let newCard = {...activeCard};



                newCard.tasks = arrayMove(
                        newCard.tasks,
                        activeTaskIndex,
                        overTaskIndex
                )

                dispatch(updateCard({
                    projectId: project.id,
                    cardId: newCard.id,
                    newCard
                }))
                // newCards[activeCardIndex].tasks = arrayMove(
                //     newCards[activeCardIndex].tasks,
                //     activeTaskIndex,
                //     overTaskIndex
                // )
            } else {
                let newActiveCard = {...activeCard};
                let newOverCard = {...overCard};
                let newActiveTasks = [...activeCard.tasks];
                let newOverTasks = [...overCard.tasks];
                // let newCards = Array.from(project.cards)
                
                // newActiveCard.tasks = []

                const [removedItem] = newActiveTasks.splice(
                    activeTaskIndex,
                    1
                )

                newActiveCard.tasks = newActiveTasks
                
                newOverTasks.splice(
                    activeTaskIndex,
                    0,
                    removedItem
                )

                newOverCard.tasks = newOverTasks
                // dispatch(updateCards({
                //     projectId: project.id,
                //     newCards
                    
                // }))
                dispatch(updateCard({
                    projectId: project.id,
                    cardId: newActiveCard.id,
                    newCard: newActiveCard
                    
                }))

                dispatch(updateCard({
                    projectId: project.id,
                    cardId: newOverCard.id,
                    newCard: newOverCard
                    
                }))

                // newCard.tasks = arrayMove(
                //         newCard.tasks,
                //         activeTaskIndex,
                //         overTaskIndex
                // )
            

        }

            
            
            // console.log(activeContainer?.id, overContainer?.id)
        }
        if (
            
            over && 
            active &&
            active.id !== over.id &&
            active.id.toString().includes('card') && 
            over?.id.toString().includes('card') 
        ) {
            
            const activeCard = findValueOfItems(active.id, 'card', project.cards);
            const overCard = findValueOfItems(over.id, 'card', project.cards);

            if (!overCard || !activeCard) return;
            const activeCardIndex = project.cards.findIndex(
                (card) => card.id === activeCard.id
                )
                const overCardIndex = project.cards.findIndex(
                    (card) => card.id === overCard.id
                    )
                    
                    console.log(activeCardIndex, overCardIndex)
            let newProject = {...project}
            
            newProject.cards = arrayMove(newProject.cards, activeCardIndex, overCardIndex)

            dispatch(updateCards({
                projectId: project.id,
                newCards: newProject.cards
            }))
            
            
            // console.log(activeContainer?.id, overContainer?.id)
        }

        
        
        
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        }),
      );

   
    return (
        <div className='todo-area'>
            <div className="big-wrapper todo-area__content">
                <DndContext 
                    sensors={sensors} 
                    autoScroll={false} 
                    collisionDetection={closestCorners} 
                    onDragStart={dragStartHandler}
                    onDragMove={dragMoveHandler}        
                    onDragEnd={dragEndHandler}         
                >                                           
                    <SortableContext items={project.cards}>
                        {project.cards.map((card) => 
                            // <SortableContext strategy={rectSortingStrategy} items={card.tasks.map((t) => t.id)}>
                                <TodoCard project={project} key={card.id} card={card}/>
                                       
                                
                            // {/* </SortableContext> */}
                        )}  
                
                
                    </SortableContext>
                    <DragOverlay>
                        {/* Drag Overlay For item Task */}
                        {activeId && currentCard && currentTask && activeId.toString().includes('task') && (
                            <TaskItem card={currentCard} project={project} task={currentTask}/>
                        )}
                        {/* Drag Overlay For item Card */}
                        {activeId && currentCard && activeId.toString().includes('card') && (
                            <TodoCard card={currentCard} project={project}/>
                        )}

                    </DragOverlay>
                </DndContext>
                
            </div>
        </div>
    )
}