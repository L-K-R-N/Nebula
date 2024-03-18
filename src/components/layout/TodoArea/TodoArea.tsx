import { useState } from 'react';
import './TodoArea.styles.scss';
import {
   DndContext,
   DragEndEvent,
   DragMoveEvent,
   DragOverlay,
   DragStartEvent,
   KeyboardSensor,
   PointerSensor,
   UniqueIdentifier,
   closestCorners,
   useSensor,
   useSensors,
} from '@dnd-kit/core';
import {
   SortableContext,
   arrayMove,
   sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateCard, updateCards } from '@/store/actionCreators/Projects';
import { TaskItem } from '../TaskItem/TaskItem';
import { ITask, ITodoCard, IProject } from '@/models/Project.types';
import { TodoCard } from '../TodoCard/TodoCard';

interface Props {
   project: IProject;
}

type TDndItems = 'card' | 'task';

export const TodoArea: React.FC<Props> = ({ project }) => {
   const dispatch = useAppDispatch();
   const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
   const [currentCard, setCurrentCard] = useState<ITodoCard | null>(null);
   const [currentTask, setCurrentTask] = useState<ITask | null>(null);

   function findValueOfItems(
      id: UniqueIdentifier | undefined,
      type: TDndItems,
      cards: ITodoCard[],
   ) {
      if (type === 'card') {
         return cards.find((task) => task.id === id);
      }
      if (type === 'task') {
         return cards.find((card) => card.tasks.find((task) => task.id === id));
      }

      return false;
   }

   const dragStartHandler = async (event: DragStartEvent) => {
      const { active } = event;
      const { id } = active;

      if (id.toString().includes('card') && id) {
         const card = project.cards.find((c) => c.id === id);
         if (card) {
            setCurrentCard(card);
            setActiveId(id);
         }
      }

      if (id.toString().includes('task') && id) {
         const cardId = active.data?.current?.cardId;
         const card = project.cards.find((c) => c.id === cardId);
         const task = card?.tasks.find((t) => t.id === id);
         if (card && task) {
            setCurrentCard(card);
            setCurrentTask(task);
            setActiveId(id);
         }
      }
   };
   const dragMoveHandler = async (event: DragMoveEvent) => {
      const { active, over } = event;

      if (over && active && active.id !== over.id) {
         if (
            active.id.toString().includes('task') &&
            over?.id.toString().includes('task')
         ) {
            const activeCard = findValueOfItems(
               active.id,
               'task',
               project.cards,
            );
            const overCard = findValueOfItems(over.id, 'task', project.cards);

            if (!overCard || !activeCard) return;

            const activeCardIndex = project.cards.findIndex(
               (card) => card.id === activeCard.id,
            );
            const overCardIndex = project.cards.findIndex(
               (card) => card.id === overCard.id,
            );

            const activeTaskIndex = activeCard.tasks.findIndex(
               (task) => task.id === active.id,
            );
            const overTaskIndex = overCard.tasks.findIndex(
               (task) => task.id === over.id,
            );

            if (activeCardIndex === overCardIndex) {
               // let newCards = [...project.cards];
               const newCard = { ...activeCard };

               newCard.tasks = arrayMove(
                  newCard.tasks,
                  activeTaskIndex,
                  overTaskIndex,
               );
            } else {
               const newActiveCard = { ...activeCard };
               const newOverCard = { ...overCard };
               const newActiveTasks = [...activeCard.tasks];
               const newOverTasks = [...overCard.tasks];
               // let newCards = Array.from(project.cards)

               // newActiveCard.tasks = []

               const [removedItem] = newActiveTasks.splice(activeTaskIndex, 1);

               newActiveCard.tasks = newActiveTasks;

               newOverTasks.splice(activeTaskIndex, 0, removedItem);

               newOverCard.tasks = newOverTasks;
               // dispatch(updateCards({
               //     projectId: project.id,
               //     newCards

               // }))
               dispatch(
                  updateCard({
                     projectId: project.id,
                     cardId: newActiveCard.id,
                     newCard: newActiveCard,
                  }),
               );

               dispatch(
                  updateCard({
                     projectId: project.id,
                     cardId: newOverCard.id,
                     newCard: newOverCard,
                  }),
               );

               // newCard.tasks = arrayMove(
               //         newCard.tasks,
               //         activeTaskIndex,
               //         overTaskIndex
               // )
            }

            // console.log(activeContainer?.id, overContainer?.id)
         }
         if (
            active.id.toString().includes('task') &&
            over?.id.toString().includes('card')
         ) {
            const activeCard = findValueOfItems(
               active.id,
               'task',
               project.cards,
            );
            const overCard = findValueOfItems(over.id, 'card', project.cards);

            if (!overCard || !activeCard) return;

            const activeCardIndex = project.cards.findIndex(
               (card) => card.id === activeCard.id,
            );
            const overCardIndex = project.cards.findIndex(
               (card) => card.id === overCard.id,
            );

            const activeTaskIndex = activeCard.tasks.findIndex(
               (task) => task.id === active.id,
            );

            if (activeCardIndex !== overCardIndex) {
               const newActiveCard = { ...activeCard };
               const newOverCard = { ...overCard };
               const newActiveTasks = [...activeCard.tasks];
               const newOverTasks = [...overCard.tasks];

               const [removedItem] = newActiveTasks.splice(activeTaskIndex, 1);

               newActiveCard.tasks = newActiveTasks;

               newOverTasks.push(removedItem);

               newOverCard.tasks = newOverTasks;
               // dispatch(updateCards({
               //     projectId: project.id,
               //     newCards

               // }))
               dispatch(
                  updateCard({
                     projectId: project.id,
                     cardId: newActiveCard.id,
                     newCard: newActiveCard,
                  }),
               );

               dispatch(
                  updateCard({
                     projectId: project.id,
                     cardId: newOverCard.id,
                     newCard: newOverCard,
                  }),
               );
            }
         }
      }
   };

   const dragEndHandler = async (event: DragEndEvent) => {
      const { active, over } = event;

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
            (card) => card.id === activeCard.id,
         );
         const overCardIndex = project.cards.findIndex(
            (card) => card.id === overCard.id,
         );

         const activeTaskIndex = activeCard.tasks.findIndex(
            (task) => task.id === active.id,
         );
         const overTaskIndex = overCard.tasks.findIndex(
            (task) => task.id === over.id,
         );

         if (activeCardIndex === overCardIndex) {
            // let newCards = [...project.cards];
            const newCard = { ...activeCard };

            newCard.tasks = arrayMove(
               newCard.tasks,
               activeTaskIndex,
               overTaskIndex,
            );

            dispatch(
               updateCard({
                  projectId: project.id,
                  cardId: newCard.id,
                  newCard,
               }),
            );
            // newCards[activeCardIndex].tasks = arrayMove(
            //     newCards[activeCardIndex].tasks,
            //     activeTaskIndex,
            //     overTaskIndex
            // )
         } else {
            const newActiveCard = { ...activeCard };
            const newOverCard = { ...overCard };
            const newActiveTasks = [...activeCard.tasks];
            const newOverTasks = [...overCard.tasks];
            // let newCards = Array.from(project.cards)

            // newActiveCard.tasks = []

            const [removedItem] = newActiveTasks.splice(activeTaskIndex, 1);

            newActiveCard.tasks = newActiveTasks;

            newOverTasks.splice(activeTaskIndex, 0, removedItem);

            newOverCard.tasks = newOverTasks;
            // dispatch(updateCards({
            //     projectId: project.id,
            //     newCards

            // }))
            dispatch(
               updateCard({
                  projectId: project.id,
                  cardId: newActiveCard.id,
                  newCard: newActiveCard,
               }),
            );

            dispatch(
               updateCard({
                  projectId: project.id,
                  cardId: newOverCard.id,
                  newCard: newOverCard,
               }),
            );

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
            (card) => card.id === activeCard.id,
         );
         const overCardIndex = project.cards.findIndex(
            (card) => card.id === overCard.id,
         );

         const newProject = { ...project };

         newProject.cards = arrayMove(
            newProject.cards,
            activeCardIndex,
            overCardIndex,
         );

         dispatch(
            updateCards({
               projectId: project.id,
               newCards: newProject.cards,
            }),
         );

         // console.log(activeContainer?.id, overContainer?.id)
      }
   };

   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      }),
   );

   return (
      <div className="todo-area">
         <div className=" todo-area__content">
            <DndContext
               sensors={sensors}
               autoScroll={false}
               collisionDetection={closestCorners}
               onDragStart={dragStartHandler}
               onDragMove={dragMoveHandler}
               onDragEnd={dragEndHandler}
            >
               <SortableContext items={project.cards}>
                  {project.cards.map(
                     (card) => (
                        <TodoCard project={project} key={card.id} card={card} />
                     ),

                     // {/* </SortableContext> */}
                  )}
               </SortableContext>
               <DragOverlay>
                  {/* Drag Overlay For item Task */}
                  {activeId &&
                     currentCard &&
                     currentTask &&
                     activeId.toString().includes('task') && (
                        <TaskItem
                           card={currentCard}
                           project={project}
                           task={currentTask}
                        />
                     )}
                  {/* Drag Overlay For item Card */}
                  {activeId &&
                     currentCard &&
                     activeId.toString().includes('card') && (
                        <TodoCard card={currentCard} project={project} />
                     )}
               </DragOverlay>
            </DndContext>
         </div>
      </div>
   );
};
