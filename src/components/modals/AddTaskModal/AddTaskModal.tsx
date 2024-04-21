import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './AddTaskModal.styles.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-date-picker';
import { FaCalendar } from 'react-icons/fa';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { INote, IProject, ITodoCard } from '@/models/Project.types';
import { updateTasks } from '@/store/actionCreators/Projects';
import { Modal } from '@/components/UI/Modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Form } from '../Form/Form';
import { Button } from '@/components/UI/Button/Button';
import { InputController } from '@/components/UI/InputController/InputController';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useState } from 'react';

interface Props {
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   project: IProject;
   card: ITodoCard;
}

export interface ITaskInputs {
   date: Date;
   title: string;
   desc: string;
   notes: INote[];
}

export const StyledCalendar = styled(FaCalendar)`
   color: white;
   opacity: 0.7;
   height: 100%;

   &:hover {
      opacity: 1;
   }
`;
export const StyledClose = styled(GrClose)`
   color: white;
   opacity: 0.7;
   width: 100%;
   height: 100%;
   &:hover {
      opacity: 1;
   }
`;

export const AddTaskModal: React.FC<Props> = ({
   isShow,
   setShow,
   project,
   card,
}) => {
   const dispatch = useAppDispatch();
   const currentDate = new Date();

   const [taskNotes] = useState<INote[]>([]);
   const {
      handleSubmit,
      control,
      reset,
      setValue,
      formState: { errors },
   } = useForm<ITaskInputs>();

   const onSubmit: SubmitHandler<ITaskInputs> = (data) => {
      dispatch(
         updateTasks({
            projectId: project.id,
            cardId: card.id,
            newTasks: [
               ...card.tasks,
               {
                  title: data.title,
                  desc: data.desc,
                  notes: data.notes,
                  date: {
                     creation: currentDate,
                     completion: data.date,
                     change: currentDate,
                  },
                  id: `task-${Date.now()}`,
                  isFixed: false,
                  comments: [],
                  subtasks: [],
               },
            ],
         }),
      );

      reset();
      setValue('title', '');
      setValue('desc', '');
      setValue('notes', []);
      setValue('date', new Date());
      setShow(false);
   };

   return (
      <Modal title="Создание задачи" setShow={setShow} isShow={isShow}>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <InputController
               control={control}
               errors={errors}
               name="title"
               rules={{ required: 'Введите название' }}
               label="title"
               title="Введите название"
            />

            <InputController
               control={control}
               errors={errors}
               name="desc"
               rules={{ required: 'Введите описание' }}
               label="desc"
               title="Введите описание"
            />

            <div className="add-task-form__elem">
               <Controller
                  name="date"
                  control={control}
                  rules={{ required: 'Введите дату окончания' }}
                  render={({ field }) => (
                     <DatePicker
                        className="add-task-form__input"
                        calendarClassName="add-task-form__calendar"
                        calendarIcon={<StyledCalendar />}
                        clearIcon={<StyledClose />}
                        value={field.value}
                        onChange={field.onChange}
                        minDate={new Date()}
                     />
                  )}
               />
               {errors.date && <span>{errors.date.message}</span>}
            </div>

            {/* <DatePicker id='add-task-form__input'/> */}

            <SelectController
               errors={errors}
               control={control}
               name="notes"
               isMulti={true}
               options={taskNotes}
               placeholder="Введите заметки"
               defaultValue={taskNotes}
               // rules={{ required: 'Это обязательное поле' }}
            />
            <Button type="submit" title="Создать задачу">
               Создать
            </Button>
         </Form>
      </Modal>
   );
};
