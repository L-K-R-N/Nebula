import './ChangeProjectModal.styles.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select/creatable';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Modal } from '@/components/UI/Modal';
import { IProject, TProjectInputs } from '@/models/Project.types';
import { updateProject } from '@/store/actionCreators/Projects';
import { SelectStyles } from '@/components/UI/StylizedMultiSelect/StylizedMultiSelect';
import { InputController } from '@/components/UI/InputController/InputController';
import { Form } from '../Form/Form';
import { Button } from '@/components/UI/Button/Button';
import { SelectController } from '@/components/UI/SelectController/SelectController';

interface Props {
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   project: IProject;
}

export const ChangeProjectModal: React.FC<Props> = ({
   isShow,
   setShow,
   project,
}) => {
   const dispatch = useAppDispatch();
   // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

   const {
      control,
      reset,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<TProjectInputs>();

   // const watchTitle = watch("title", project.title)
   useEffect(() => {
      setValue('desc', project.desc);
      setValue('title', project.title);
      setValue('notes', project.notes);
   }, [project]);

   const onSubmit: SubmitHandler<TProjectInputs> = (data) => {
      dispatch(
         updateProject({
            id: project.id,
            date: project.date,
            isImportant: project.isImportant,
            desc: data.desc,
            title: data.title,
            notes: data.notes,
            cards: project.cards,
         }),
      );
      reset();
      setShow(false);
   };

   return (
      <Modal title="Изменение проекта" setShow={setShow} isShow={isShow}>
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

            <InputController
               control={control}
               errors={errors}
               name="desc"
               rules={{ required: 'Введите описание' }}
               label="desc"
               fieldErrorName={{ type: 'min' }}
               title="Введите описание"
            />

            <SelectController
               errors={errors}
               control={control}
               fieldErrorName={{ type: 'min' }}
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
