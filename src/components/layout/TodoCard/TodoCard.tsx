import './TodoCard.styles.scss';
import { useState } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { ITodoCard, IProject } from '@/models/Project.types';
import { TaskItem } from '../TaskItem/TaskItem';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateCards } from '@/store/actionCreators/Projects';
import { AddTaskModal } from '@/components/modals/AddTaskModal/AddTaskModal';
import { MoreBtn } from '@/components/UI/MoreBtn';
import { IAction } from '@/models/MoreList.types';
import { ChangeCardModal } from '@/components/modals/ChangeCardModal/ChangeCardModal';

interface Props {
   card: ITodoCard;
   project: IProject;
}

export const TodoCard: React.FC<Props> = ({ card, project }) => {
   const dispatch = useAppDispatch();
   const [isAddingTask, setIsAddingTask] = useState(false);
   const {
      setNodeRef,
      listeners,
      attributes,
      isDragging,
      transform,
      transition,
      setActivatorNodeRef,
   } = useSortable({
      id: card.id,
   });
   const [isChanging, setIsChanging] = useState(false);
   const [cardActions] = useState<IAction[]>([
      {
         title: 'Удалить',
         action: handleDelete,
      },
      {
         title: 'Изменить',
         action: handleChange,
      },
      {
         title: 'Добавить задачу',
         action: handleAddTask,
      },
   ]);

   function handleDelete() {
      const newCards = project.cards.filter((c) => c.id !== card.id);
      dispatch(
         updateCards({
            projectId: project.id,
            newCards,
         }),
      );
   }

   function handleChange() {
      setIsChanging(true);
      // console.log("Пост изменен")
   }

   function handleAddTask() {
      setIsAddingTask(true);
   }

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.7 : 1,
   };
   return (
      <section
         className="todo-card"
         style={style}
         ref={setNodeRef}
         {...attributes}
      >
         <div className="todo-card__header todo-card__header_queue">
            <div
               className="todo-card__handle"
               ref={setActivatorNodeRef}
               {...listeners}
            />
            <h3 className="todo-card__title">{card.title}</h3>
            <MoreBtn list={cardActions} color="white" />
         </div>

         <div className="todo-card__main">
            <SortableContext items={card.tasks}>
               {card.tasks?.map((task) => (
                  <TaskItem
                     card={card}
                     project={project}
                     key={task.id}
                     task={task}
                  />
               ))}
            </SortableContext>
         </div>

         <ChangeCardModal
            card={card}
            project={project}
            isShow={isChanging}
            setShow={setIsChanging}
         />
         <AddTaskModal
            card={card}
            project={project}
            isShow={isAddingTask}
            setShow={setIsAddingTask}
         />
      </section>
   );
};
