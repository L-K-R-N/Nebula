
import './ChangeTaskModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { INote, IProject, Inputs } from 'models/Project.types';
import { updateProject, updateTask } from 'store/actionCreators/Projects';
import Select from 'react-select/creatable';
import { useEffect } from 'react';
import { ITask } from 'models/TodoCard.types';
import { SelectStyles, StylizedMultiSelect } from 'components/UI/StylizedMultiSelect/StylizedMultiSelect';
interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    project: IProject;
    task: ITask;
}



export const ChangeTaskModal: React.FC<Props> = ({isShow, setShow, project, task}) => {
    const dispatch = useAppDispatch()
    // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

    const {
        control,
        reset,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<Inputs>()
    
    // const watchTitle = watch("title", project.title)
    useEffect(() => {
        setValue('desc', task.desc);
        setValue('title', task.title);
        setValue('notes', task.notes);
    }, [task])


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(updateTask({
            projectId: project.id,
            taskId: task.id,
            newTask: {
                id: task.id,
                isFixed: task.isFixed,
                date: {
                    creation: task.date.creation,
                    completion: task.date.completion,
                    change: task.date.completion,
                },
                desc: data.desc,
                title: data.title,
                notes: data.notes,
                status: task.status,
                comments: task.comments,
                subtasks: task.subtasks
            }
        }))
        console.log(1)
        setShow(false)
    }

    // useEffect(() => {
    //     const subscription = watch((value, { name, type }) =>
    //       console.log(value, name, type)
    //     )
    //     return () => subscription.unsubscribe()
    //   }, [watch])
 
    return (
        <Modal title='Изменение задачи' setShow={setShow} isShow={isShow}>
            <form className="change-project-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="change-task-form__elem">
                    <Controller
                        name="title"
                        control={control}
                        rules={{required: "Введите название"}}
                        defaultValue={task.title}
                        render={({field}) => (
                            <input 
                                className="change-task-form__input"
                                placeholder='Введите название'
                                title='Введите название'
                                value={field.value} 
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>
                



                <div className="change-task-form__elem">
                    <Controller
                        name="desc"
                        control={control}
                        rules={{required: "Введите описание"}}
                        defaultValue={task.desc}
                        render={({field}) => (
                            <input  
                                className="change-task-form__input"
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
                    
                    defaultValue={task.notes}
                    render={({field}) => (
                        <Select
                            {...field}
                            placeholder='Введите заметки'
                            options={task.notes}
                            isMulti
                            styles={SelectStyles}
                            onChange={(newValue) => {
                                field.onChange(newValue)
                            }}
                        />
                    )}
                />
                <button 
                    type='submit' 
                    title="Сохранить изменения"
                    className='change-task-form__button'
                >Сохранить изменения</button>
            </form>
        </Modal>
    )
}