import './ChangeTaskModal.styles.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select/creatable';
import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Modal } from '@/components/UI/Modal';
import { INote, IProject, ITask, ITodoCard } from '@/models/Project.types';
import { updateTask } from '@/store/actionCreators/Projects';
import { SelectStyles } from '@/components/UI/StylizedMultiSelect/StylizedMultiSelect';
import {
   ITaskInputs,
   StyledCalendar,
   StyledClose,
} from '../AddTaskModal/AddTaskModal';
import { Form } from '../Form/Form';
import { Button } from '@/components/UI/Button/Button';
import { InputController } from '@/components/UI/InputController/InputController';
import { SelectController } from '@/components/UI/SelectController/SelectController';

interface Props {
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   project: IProject;
   task: ITask;
   card: ITodoCard;
}

export const ChangeTaskModal: React.FC<Props> = ({
   isShow,
   setShow,
   project,
   task,
   card,
}) => {
   const dispatch = useAppDispatch();
   // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)
   const [taskNotes, setTaskNotes] = useState<INote[]>([]);

   const {
      control,
      handleSubmit,
      setValue,
      setFocus,
      formState: { errors },
   } = useForm<ITaskInputs>();

   useEffect(() => {
      setFocus('title');
   }, []);
   // const watchTitle = watch("title", project.title)
   useEffect(() => {
      setValue('desc', task.desc);
      setValue('title', task.title);
      setValue('notes', task.notes);
      setValue('date', task.date.completion);
   }, [task]);

   const onSubmit: SubmitHandler<ITaskInputs> = (data) => {
      dispatch(
         updateTask({
            projectId: project.id,
            cardId: card.id,
            taskId: task.id,
            newTask: {
               id: task.id,
               isFixed: task.isFixed,
               date: {
                  creation: task.date.creation,
                  completion: task.date.completion,
                  change: task.date.completion,
               },
               desc: data.desc,
               title: data.title,
               notes: data.notes,
               comments: task.comments,
               subtasks: task.subtasks,
            },
         }),
      );
      setShow(false);
   };

   return (
      <Modal title="Изменение задачи" setShow={setShow} isShow={isShow}>
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
            <div>
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
            <SelectController
               errors={errors}
               control={control}
               name="notes"
               isMulti={true}
               options={project.notes}
               placeholder="Введите заметки"
               defaultValue={project.notes}
               rules={{ required: 'Это обязательное поле' }}
            />
            <Button type="submit" title="Сохранить изменения">
               Сохранить изменения
            </Button>
         </Form>
      </Modal>
   );
};
