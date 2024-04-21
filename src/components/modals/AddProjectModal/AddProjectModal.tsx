import './AddProjectModal.styles.scss';

import { SubmitHandler, useForm } from 'react-hook-form';
import { INote } from '@/models/Project.types';
import { setProjects } from '@/store/reducers/ProjectsSlice';
import { Modal } from '@/components/UI/Modal';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useState } from 'react';
import { InputController } from '@/components/UI/InputController/InputController';
import { Button } from '@/components/UI/Button/Button';
import { Form } from '../Form/Form';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
interface Props {
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
   title: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()
      .min(3, 'Название слишком короткое')
      .max(20, 'Название слишком длинное'),
   desc: z
      .string({
         required_error: 'Это обязательное поле',
      })
      .trim()

      .min(3, 'Описание слишком короткое')
      .max(40, 'Описание слишком длинное'),

   // .optional(),
   notes: z
      .object({
         value: z
            .string({
               required_error: 'Это обязательное поле',
            })
            .trim()
            .min(2, 'Заметка слишком короткая')
            .max(15, 'Заметка слишком длинная'),
         label: z.string(),
         id: z.number().optional(),
      })
      .array(),
});

type FormSchema = z.infer<typeof formSchema>;

export const AddProjectModal: React.FC<Props> = ({ isShow, setShow }) => {
   const dispatch = useAppDispatch();
   const { projects } = useAppSelector((state) => state.ProjectsReducer);
   const currentDate = new Date();
   const [projectNotes, setProjectNotes] = useState<INote[]>([]);
   const {
      handleSubmit,
      control,
      reset,
      setValue,
      formState: { errors },
   } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

   // useEffect(() => {
   //    (ref.current as HTMLInputElement).focus();
   // }, []);

   const onSubmit: SubmitHandler<FormSchema> = (data) => {
      dispatch(
         setProjects([
            ...projects,
            {
               id: Date.now(),
               date: currentDate,
               desc: data.desc,
               title: data.title,
               notes: data.notes,
               isImportant: false,
               cards: [],
            },
         ]),
      );

      reset();
      setValue('title', '');
      setValue('desc', '');
      setProjectNotes([]);
      setShow(false);
   };

   // const handleChangeNotes = (newValue: SingleValue<IOption<string>>) => {
   //     dispatch(setSorting(newValue?.value === 'desc' ||
   //                         newValue?.value === 'title' ||
   //                         newValue?.value === 'id' ? newValue?.value : sortingBy))
   //     // console.log(sortingBy)
   // }

   return (
      <Modal title="Создание проекта" setShow={setShow} isShow={isShow}>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <InputController
               control={control}
               errors={errors}
               name="title"
               // rules={{
               //    required: 'Введите название',
               //    minLength: 3,
               //    maxLength: 20,
               // }}
               label="title"
               title="Введите название"
            />

            <InputController
               control={control}
               errors={errors}
               name="desc"
               // rules={{
               //    required: 'Введите описание',
               //    minLength: 3,
               //    maxLength: 20,
               // }}
               label="desc"
               title="Введите описание"
            />
            <SelectController
               errors={errors}
               control={control}
               name="notes"
               isMulti={true}
               options={projectNotes}
               placeholder="Введите заметки"
               defaultValue={projectNotes}
               // rules={{ required: 'Это обязательное поле' }}
            />

            <Button type="submit" title="Создать пост">
               Создать
            </Button>
         </Form>
      </Modal>
   );
};
