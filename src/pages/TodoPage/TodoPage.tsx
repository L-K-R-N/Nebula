import './TodoPage.styles.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddCardModal } from '@/components/modals/AddCardModal/AddCardModal';
import { useAppSelector } from '@/hooks/useAppSelector';
import { TodoArea } from '@/components/layout/TodoArea/TodoArea';

interface Props {}

export const TodoPage: React.FC<Props> = () => {
   const { projects } = useAppSelector((state) => state.ProjectsReducer);
   const { id } = useParams();
   const project = projects.find((p) => p.id === Number(id));
   const [isShowCardModal, setIsShowCardModal] = useState(false);
   // const [project, setProject] = useState<IProject>()

   return (
      <div className="todo-page">
         <div className="container">
            <section className="todo-page-control">
               <div className="big-wrapper todo-page-control__content">
                  {/* <FilterForm/> */}
                  {/* <h3 className="todo-page-control__title">
                    {project?.title}
                </h3> */}
                  <button
                     type="button"
                     className="todo-page-control__button"
                     onClick={() => setIsShowCardModal(true)}
                  >
                     Создать карточку
                  </button>
               </div>
            </section>

            {project && <TodoArea project={project} />}
            {project && (
               <AddCardModal
                  project={project}
                  isShow={isShowCardModal}
                  setShow={setIsShowCardModal}
               />
            )}
         </div>
      </div>
   );
};

export default TodoPage;
