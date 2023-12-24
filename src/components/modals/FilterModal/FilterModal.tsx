import { CloseBtn } from 'components/UI/CloseBtn';
import './FilterModal.styles.scss'
import { CustomSelect } from 'components/UI/CustomSelect';
import { useState } from 'react';
import { IOption } from 'models/Select.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setSorting } from 'store/reducers/FilterSlice';
import { SingleValue } from 'react-select';
import { useAppSelector } from 'hooks/useAppSelector';
import { Modal } from 'components/UI/Modal';

interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const options: IOption<string>[] = [
    {
        value: "desc",
        label: "По описанию"
    },
    {
        value: "title",
        label: "По названию"
    },
    { 
        value: "id",
        label: "По номеру"
    }
]

export const FilterModal: React.FC<Props> = ({isShow, setShow}) => {
    const dispatch = useAppDispatch()
    const {sortingBy} = useAppSelector(state => state.FilterReducer) 
    const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

    const handleChangeSorting = (newValue: SingleValue<IOption<string>>) => {
        dispatch(setSorting(newValue?.value === 'desc' || 
                            newValue?.value === 'title' || 
                            newValue?.value === 'id' ? newValue?.value : sortingBy))
        console.log(sortingBy)
    }
 
    return (
        <Modal title='Фильтры' setShow={setShow} isShow={isShow}>
            <CustomSelect options={sortingOptions} handleChange={handleChangeSorting}/>
        </Modal>
    )
}