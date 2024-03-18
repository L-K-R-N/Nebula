import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Modal } from '@/components/UI/Modal';
import { IProject, TTodoCardInputs, ITodoCard } from '@/models/Project.types';
import { updateCard } from '@/store/actionCreators/Projects';
import { InputController } from '@/components/UI/InputController/InputController';
import { Form } from '../Form/Form';
import { Button } from '@/components/UI/Button/Button';

interface Props {
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   project: IProject;
   card: ITodoCard;
}

export const ChangeCardModal: React.FC<Props> = ({
   isShow,
   setShow,
   project,
   card,
}) => {
   const dispatch = useAppDispatch();

   const {
      control,
      setValue,
      formState: { errors },
      handleSubmit,
   } = useForm<TTodoCardInputs>();

   useEffect(() => {
      setValue('title', card.title);
   }, [card]);

   const onSubmit: SubmitHandler<TTodoCardInputs> = (data) => {
      dispatch(
         updateCard({
            projectId: project.id,
            cardId: card.id,
            newCard: {
               title: data.title,
               tasks: card.tasks,
               id: card.id,
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
               fieldErrorName={{ type: 'min' }}
               title="Введите название"
            />

            <Button type="submit" title="Сохранить изменения">
               Сохранить изменения
            </Button>
         </Form>
      </Modal>
   );
};
