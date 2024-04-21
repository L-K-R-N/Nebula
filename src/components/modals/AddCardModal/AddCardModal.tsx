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
