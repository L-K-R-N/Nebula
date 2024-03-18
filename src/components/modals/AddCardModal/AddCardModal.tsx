import './AddCardModal.styles.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { Modal } from '@/components/UI/Modal';
import { IProject } from '@/models/Project.types';
import { updateCards } from '@/store/actionCreators/Projects';
import { InputController } from '@/components/UI/InputController/InputController';
import { Button } from '@/components/UI/Button/Button';
import { Form } from '../Form/Form';
import { useEffect } from 'react';
import { z } from 'zod';

interface CardModalInputs {
   title: string;
}

interface IRules {
   required: boolean;
   minLength: number;
   maxLength: number;
}

const createRules = (rulesValues: IRules, inputName: string) => {
   const rules = {
      required: rulesValues.required
         ? `Введите ${inputName.toLowerCase()}`
         : false,
      minLength: {
         value: rulesValues.minLength,
         message: `${inputName} не может быть короче ${rulesValues.minLength} букв`,
      },
      maxLength: {
         value: rulesValues.maxLength,
         message: `${inputName} не может быть длиннее ${rulesValues.maxLength} букв`,
      },
   };

   return rules;
};

const titleRules = createRules(
   { required: true, minLength: 3, maxLength: 20 },
   'Название',
);

// const titleRules = {
//    required: 'Введите название',
//    minLength: {
//       value: 3,
//       message: 'Название не может быть короче 3 букв',
//    },
//    maxLength: {
//       value: 20,
//       message: 'Название не может быть длиннее 20 букв',
//    },
// };

const formSchema = z.object({
   title: z
      .string()
      .trim()
      .min(3, 'Название слишком короткое')
      .max(20, 'Название слишком длинное'),
   desc: z
      .string()
      .trim()
      .min(3, 'Описание слишком короткое')
      .max(40, 'Описание слишком длинное')
      .optional(),
   notes: z
      .object({
         value: z
            .string()
            .trim()
            .min(1, 'Заметка слишком короткая')
            .max(15, 'Заметка слишком длинная'),
      })
      .array()
      .optional(),
});

interface Props {
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   project: IProject;
}

export const AddCardModal: React.FC<Props> = ({ project, isShow, setShow }) => {
   const dispatch = useAppDispatch();

   const {
      handleSubmit,
      control,
      reset,
      setValue,
      setFocus,
      formState: { errors },
   } = useForm<CardModalInputs>();

   useEffect(() => {
      setFocus('title');
   }, [isShow]);

   const onSubmit: SubmitHandler<CardModalInputs> = (data) => {
      dispatch(
         updateCards({
            projectId: project.id,
            newCards: [
               ...project.cards,
               {
                  id: `card-${Date.now()}`,
                  title: data.title,
                  tasks: [],
               },
            ],
         }),
      );

      reset();
      setValue('title', '');
      setShow(false);
   };

   return (
      <Modal title="Создание карточки" setShow={setShow} isShow={isShow}>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <InputController
               control={control}
               errors={errors}
               name="title"
               rules={titleRules}
               label="title"
               title="Введите название"
            />

            <Button type="submit" title="Создать карточки">
               Создать
            </Button>
         </Form>
      </Modal>
   );
};
