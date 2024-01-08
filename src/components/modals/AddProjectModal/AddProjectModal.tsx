import './AddProjectModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';

import { useAppSelector } from 'hooks/useAppSelector';
import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { setProjects } from 'store/reducers/ProjectsSlice';
import Select from 'react-select/creatable';
import {Inputs } from 'models/Project.types';
import { format } from 'date-fns';
import { StylesConfig } from 'react-select';
import { InputController } from 'components/UI/InputController/InputController';
// import CreatableSelect from 'react-select/Creatable';
interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


const selectStyles: StylesConfig = {
    control: (styles, state) => ({
        ...styles,
        padding: '12px 30px 10px 30px',
        background: '#2F2F2F',
        borderRadius: '5px',
        outline: state.isFocused ? 'none' : 'none',
        border: 'none',
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.35)',
        textShadow: '0 0 12px rgba(0, 0, 0, 0.65)',
        borderBottom: '4px solid white',
        fontWeight: '400',
        transition: 'all 0.2s ease-out',
        cursor: 'text',
        ":hover": {
            ...styles[':hover'],
            borderBottomColor: '#FFA654',
            
            
        },
        borderBottomColor: state.isFocused ? '#90C795' : 'white',
        ":active": {
            ...styles[':active'],
            borderBottomColor: '#DA8181',
            
            
        },
        
        ":placeholder-shown": {
            ...styles[':placeholder-shown'],
            color: 'white',

        },
    }),
    valueContainer: (styles, state) => ({
        ...styles,
        padding: '0',
        fontSize: '20px',
        gap: '5px'
        
    }),
    placeholder: (styles, state) => ({
        ...styles,
        color: 'white',
        padding: 0,
        margin: 0       
    }),
    input: (styles, state) => ({
        ...styles,
        padding: 0,
        margin: 0,
        color: 'white'      
    }),
    menu: (styles, state) => ({
        ...styles,
        background: '#2F2F2F',
        borderRadius: '5px',
                         
    }),
    multiValue: (styles, state) => ({
        ...styles,
        background: '#90C795',
        borderRadius: '999px',
        color: 'white',
        
                           
    }),
    multiValueLabel: (styles, state) => ({
        ...styles,
        color: 'white',
        padding: '4px 16px',
        cursor: 'pointer'
            
    }),
    multiValueRemove: (styles, state) => ({
        ...styles,
        color: '#90C795',
        cursor: 'pointer',
        background: 'white',
        borderRadius: '999px',
        opacity: '0.8',
        
        ":hover": {
            ...styles[':hover'],
            opacity: 1,
            color: '#90C795',
        background: 'white',
            
        },
    }),
    clearIndicator: (styles, state) => ({
        ...styles,
        cursor: 'pointer',
        color: 'white',
        opacity: .7,

        ":hover": {
            ...styles[':hover'],
            opacity: 1,
            color: 'white'
            
        },
    }),
    dropdownIndicator: (styles, state) => ({
        ...styles,
        cursor: 'pointer',
        color: 'white',
        opacity: .7,
        

        ":hover": {
            ...styles[':hover'],
            opacity: 1,
            color: 'white'
            
        },
    }),
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
            date: format(currentDate, 'dd.MM.yyyy'),
            desc: data.desc,
            title: data.title,
            notes: data.notes,
            isImportant: false,
            tasks: []
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
                            styles={selectStyles}
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