import './AddTaskModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';

import { useAppSelector } from 'hooks/useAppSelector';
import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { setProjects } from 'store/reducers/ProjectsSlice';
import Select from 'react-select/creatable';
import {INote, IProject, Inputs } from 'models/Project.types';
import { format } from 'date-fns';
import { updateTasks } from 'store/actionCreators/Projects';
import { IDates, ITodoCard, TTaskStatus } from 'models/TodoCard.types';
import { SelectStyles } from 'components/UI/StylizedMultiSelect/StylizedMultiSelect';
// import CreatableSelect from 'react-select/Creatable';
interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    project: IProject;
    card: ITodoCard;
}


interface ITaskInputs {
    status: TTaskStatus;
    date: IDates;
    title: string;
    desc: string;
    notes: INote[];
   
}



export const AddTaskModal: React.FC<Props> = ({isShow, setShow, project, card}) => {
    const dispatch = useAppDispatch()
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
    } = useForm<ITaskInputs>()
    
    const onSubmit: SubmitHandler<ITaskInputs> = (data) => {
        dispatch(updateTasks({
            projectId: project.id,
            tasks: [...project.tasks, {
                title: data.title,
                desc: data.desc,
                notes: data.notes,
                date: {
                    creation: format(currentDate, 'dd.MM.yyyy'),
                    completion: format(currentDate, 'dd.MM.yyyy'),
                    change: format(currentDate, 'dd.MM.yyyy'),
                },
                id: Date.now(),
                isFixed: false,
                status: card.title,
                comments: [],
                subtasks: []
                
            }]
        }))
        
        // console.log(project.tasks)
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
        <Modal title='Создание задачи' setShow={setShow} isShow={isShow}>
            <form className="add-task-form" onSubmit={handleSubmit(onSubmit)}>
                

                
                <div className='add-task-form__elem'>
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
                
                <div className='add-task-form__elem'>
                <Controller
                    name="desc"
                    control={control}
                    rules={{required: "Введите описание"}}
                    render={({field}) => (
                        <input  
                            className="add-task-form__input"
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
                    type='submit' 
                    title='Создать задачу'
                    className='add-task-form__button'
                >
                    Создать
                </button>
            </form>
        </Modal>
    )
}