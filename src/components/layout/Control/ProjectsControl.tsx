import { useState } from 'react';
import { FilterForm } from '../FilterForm/FilterForm';
import cl from './ProjectsControl.module.scss';
import { AddProjectModal } from '@/components/modals/AddProjectModal/AddProjectModal';
import { Wrapper } from '../Wrapper/Wrapper';
import { Button } from '@/components/UI/Button/Button';

interface Props {}

export const ProjectsControl: React.FC<Props> = () => {
   const [addModalShow, setModalShow] = useState(false);

   const handleSetModalShow = () => {
      setModalShow(true);
   };
   return (
      <div className={cl.control}>
         <Wrapper>
            <div className={cl.content}>
               <FilterForm />
               <Button
                  type="button"
                  title="Добавить проект"
                  onClick={handleSetModalShow}
               >
                  Добавить проект
               </Button>
            </div>
         </Wrapper>
         <AddProjectModal isShow={addModalShow} setShow={setModalShow} />
      </div>
   );
};
