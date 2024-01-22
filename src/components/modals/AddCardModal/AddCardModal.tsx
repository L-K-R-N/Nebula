import './AddCardModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';

import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {IProject} from 'models/Project.types';
import {  updateCards } from 'store/actionCreators/Projects';



interface CardModalInputs {
    title: string;
}


interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    project: IProject;
    
}

export const AddCardModal: React.FC<Props> = ({project, isShow, setShow}) => {
    const dispatch = useAppDispatch()
    
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: {
            errors
        }
    } = useForm<CardModalInputs>()
    
    const onSubmit: SubmitHandler<CardModalInputs> = (data) => {
        dispatch(updateCards({
            projectId: project.id,
            newCards: [...project.cards, {
                id: `card-${Date.now()}`,
                title: data.title,
                tasks: []
            }]
        }))
        
        reset()
        setValue('title', '');
        setShow(false)
        
    }

    // const handleChangeNotes = (newValue: SingleValue<IOption<string>>) => {
    //     dispatch(setSorting(newValue?.value === 'desc' || 
    //                         newValue?.value === 'title' || 
    //                         newValue?.value === 'id' ? newValue?.value : sortingBy))
    //     // console.log(sortingBy)
    // }
 
    return (
        <Modal title='Создание карточки' setShow={setShow} isShow={isShow}>
            <form className="add-card-form" onSubmit={handleSubmit(onSubmit)}>
                

                
                <div className='add-card-form__elem'>
                <Controller
                    
                    name="title"
                    control={control}
                    rules={{required: "Введите название"}}
                    render={({field}) => (
                        <input 
                            className="add-card-form__input"
                            placeholder='Введите название'
                            title='Введите название'
                            value={field.value} 
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.title && <span>{errors.title.message}</span>}
                </div>

                
                <button 
                    className='add-card-form__button'
                    type='submit' 
                    title='Создать карточки'
                >Создать</button>
            </form>
        </Modal>
    )
}