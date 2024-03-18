import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { IProject } from '@/models/Project.types';
import cl from './ProjectCard.module.scss';
import { MoreBtn } from '@/components/UI/MoreBtn';
import { IAction } from '@/models/MoreList.types';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCurrentProject, setProjects } from '@/store/reducers/ProjectsSlice';
import { MarkBtn } from '@/components/UI/MarkBtn';
import { updateProjectImportant } from '@/store/actionCreators/Projects';
import { ChangeProjectModal } from '@/components/modals/ChangeProjectModal/ChangeProjectModal';
import { Notes } from '../Notes/Notes';

interface Props {
   project: IProject;
}

export const ProjectCard: React.FC<Props> = ({ project }) => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { projects } = useAppSelector((state) => state.ProjectsReducer);
   const [isImportant, setIsImportant] = useState(project.isImportant);
   const [isChanging, setIsChanging] = useState(false);
   const [projectActions, setProjectActions] = useState<IAction[]>([
      {
         title: 'Удалить',
         // eslint-disable-next-line @typescript-eslint/no-use-before-define
         action: handleDelete,
      },
      {
         title: 'Изменить',
         // eslint-disable-next-line @typescript-eslint/no-use-before-define
         action: handleChange,
      },
   ]);

   useEffect(() => {
      dispatch(
         updateProjectImportant({
            projectId: project.id,
            isImportant,
         }),
      );

      // console.log(project.isImportant)
   }, [isImportant]);

   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      dispatch(setCurrentProject(project));
      navigate(`/projects/${project.id}`);
   };

   function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
      e.stopPropagation();
      const newProjects = projects.filter((p) => p.id !== project.id);

      dispatch(setProjects([...newProjects]));
   }

   function handleChange(e: React.MouseEvent<HTMLDivElement>) {
      e.stopPropagation();
      setIsChanging(true);
   }

   function handleChangeImportant(
      e: React.MouseEvent<HTMLButtonElement>,
      isImportant: boolean, // eslint-disable-line
   ) {
      e.stopPropagation();
      setIsImportant(!isImportant);
   }

   return (
      <>
         <div
            className={cl.projectCard}
            onClick={(e) => handleClick(e)}
            role="presentation"
         >
            <div className={cl.projectCard__header}>
               <h4 className={cl.projectCard__info}>
                  <span className={cl.projectCard__title}>{project.title}</span>

                  <span className={cl.projectCard__date}>
                     {formatDistanceToNow(project.date, {
                        locale: ru,
                        addSuffix: true,
                     })}
                  </span>
               </h4>
               <div className={cl.projectCard__control}>
                  <MarkBtn
                     active={project.isImportant}
                     setActive={(e) => handleChangeImportant(e, isImportant)}
                  />
                  <MoreBtn
                     list={projectActions}
                     containerStyle={{
                        width: '34px',
                        height: '34px',
                     }}
                  />
               </div>
            </div>
            <div className={cl.projectCard__main}>
               <p className={cl.projectCard__desc}>
                  {project.desc || 'Описание не было введено'}
               </p>
               {/* <img className="project-card__desc-ico" src={infoIco} alt="" /> */}
               <Notes project={project} notes={project.notes} />
            </div>
         </div>
         <ChangeProjectModal
            isShow={isChanging}
            setShow={setIsChanging}
            project={project}
         />
      </>
   );
};
