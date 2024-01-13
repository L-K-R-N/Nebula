import { CloseBtn } from 'components/UI/CloseBtn';
import './FilterModal.styles.scss'
import { CustomSelect } from 'components/UI/CustomSelect';
import { useState } from 'react';
import { IOption } from 'models/Select.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setSorting } from 'store/reducers/FilterSlice';
import { useAppSelector } from 'hooks/useAppSelector';
import { Modal } from 'components/UI/Modal';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { SelectStyles } from 'components/UI/StylizedMultiSelect/StylizedMultiSelect';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ISortingOption, TSorting } from 'models/Filter.types';


interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const options: ISortingOption[] = [
    {
        value: "desc",
        label: "По описанию"
    },
    {
        value: "title",
        label: "По названию"
    },
    { 
        value: "date",
        label: "По дате создания"
    }
]

interface FilterInputs {
    sorting: ISortingOption
}

export const FilterModal: React.FC<Props> = ({isShow, setShow}) => {
    const dispatch = useAppDispatch()
    const {sortingBy} = useAppSelector(state => state.FilterReducer) 
    // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

    const {
        control,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FilterInputs>()
    
    // const watchTitle = watch("title", project.title)
    
    

    const onSubmit: SubmitHandler<FilterInputs> = (data) => {
        dispatch(setSorting(data.sorting))
        console.log()
        setShow(false)
    }

 
    return (
        <Modal title='Фильтры' setShow={setShow} isShow={isShow}>
              <form className="filter-modal" onSubmit={handleSubmit(onSubmit)}>


                <Controller
                        
                        name="sorting"
                        control={control}
                        defaultValue={sortingBy}
                        render={({field}) => (
                            <Select
                                
                                placeholder="Сортировать по"
                                styles={SelectStyles}
                                {...field}
                                value={field.value}
                                
                                options={options}
                                onChange={(newValue) => {
                                    field.onChange(newValue)
                                }}
                            />
                        )}
                    />
                    <button 
                        type='submit' 
                        title="Сохранить изменения"
                        className='filter-modal__button'
                    >Сохранить изменения</button>
                </form>
            
        </Modal>
    )
}