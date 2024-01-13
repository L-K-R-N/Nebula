import './AddProjectModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';

import { useAppSelector } from 'hooks/useAppSelector';
import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { setProjects } from 'store/reducers/ProjectsSlice';
import Select from 'react-select/creatable';
import {Inputs } from 'models/Project.types';
import { format, formatDistanceToNow } from 'date-fns';
import { StylesConfig } from 'react-select';
import { SelectStyles } from 'components/UI/StylizedMultiSelect/StylizedMultiSelect';
import {ru} from 'date-fns/locale'
// import CreatableSelect from 'react-select/Creatable';
interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}




export const AddProjectModal: React.FC<Props> = ({isShow, setShow}) => {
    const dispatch = useAppDispatch()
    const {projects} = useAppSelector(state => state.ProjectsReducer) 
    const currentDate = new Date();
    // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)
    
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: {
            errors
        }
    } = useForm<Inputs>()
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(setProjects([...projects, {
            id: Date.now(),
            date: currentDate,
            desc: data.desc,
            title: data.title,
            notes: data.notes,
            isImportant: false,
            tasks: {
                queue: [],
                development: [],
                done: [],
            }
        }]))
        
        console.log(data.notes)
        reset()
        setValue('title', '');
        setValue('desc', '');
        setValue('notes', []);
        setShow(false)
        
    }

    // const handleChangeNotes = (newValue: SingleValue<IOption<string>>) => {
    //     dispatch(setSorting(newValue?.value === 'desc' || 
    //                         newValue?.value === 'title' || 
    //                         newValue?.value === 'id' ? newValue?.value : sortingBy))
    //     // console.log(sortingBy)
    // }
 
    return (
        <Modal title='Создание проекта' setShow={setShow} isShow={isShow}>
            <form className="add-project-form" onSubmit={handleSubmit(onSubmit)}>
                

                
                <div className='add-project-form__elem'>
                <Controller
                    
                    name="title"
                    control={control}
                    rules={{required: "Введите название"}}
                    render={({field}) => (
                        <input 
                            className="add-project-form__input"
                            placeholder='Введите название'
                            title='Введите название'
                            value={field.value} 
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.title && <span>{errors.title.message}</span>}
                </div>

                <div className='add-project-form__elem'>
                <Controller
                    
                    name="desc"
                    control={control}
                    rules={{required: "Введите описание"}}
                    render={({field}) => (
                        <input  
                            className="add-project-form__input"
                            placeholder='Введите описание'
                            title='Введите описание'
                            value={field.value} 
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.desc && <span>{errors.desc.message}</span>}
                </div>

                <Controller 
                    
                    name="notes"
                    control={control}
                    render={({field}) => (
                        <Select
                            
                            placeholder="Введите заметки"
                            styles={SelectStyles}
                            className="add-project-form__select"
                            {...field}

                            
                            isMulti
                            options={[]}
                            onChange={(newValue) => {
                                field.onChange(newValue)
                            }}
                        />
                    )}
                />
                <button 
                    className='add-project-form__button'
                    type='submit' 
                    title='Создать пост'
                >Создать</button>
            </form>
        </Modal>
    )
}