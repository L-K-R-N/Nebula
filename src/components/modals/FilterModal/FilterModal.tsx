import './FilterModal.styles.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from '@/components/UI/Modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSorting } from '@/store/reducers/FilterSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ISortingOption } from '@/models/Filter.types';
import { Form } from '../Form/Form';
import { Button } from '@/components/UI/Button/Button';
import { SelectController } from '@/components/UI/SelectController/SelectController';

interface Props {
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const options: ISortingOption[] = [
   {
      value: 'desc',
      label: 'По описанию',
   },
   {
      value: 'title',
      label: 'По названию',
   },
   {
      value: 'date',
      label: 'По дате создания',
   },
];

interface FilterInputs {
   sorting: ISortingOption;
}

export const FilterModal: React.FC<Props> = ({ isShow, setShow }) => {
   const dispatch = useAppDispatch();
   const { sortingBy } = useAppSelector((state) => state.FilterReducer);

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FilterInputs>();

   const onSubmit: SubmitHandler<FilterInputs> = (data) => {
      dispatch(setSorting(data.sorting));
      console.log(data);
      setShow(false);
   };

   return (
      <Modal title="Фильтры" setShow={setShow} isShow={isShow}>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <SelectController
               errors={errors}
               control={control}
               fieldErrorName={{ type: 'min' }}
               name="sorting"
               isMulti={false}
               options={options}
               placeholder="Сортировать по"
               defaultValue={sortingBy}
               rules={{ required: 'Это обязательное поле' }}
            />

            <Button title="Сохранить изменения" type="submit">
               Сохранить изменения
            </Button>
         </Form>
      </Modal>
   );
};
