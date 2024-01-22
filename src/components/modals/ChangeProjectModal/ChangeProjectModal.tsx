
import './ChangeProjectModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IProject, TProjectInputs} from 'models/Project.types';
import { updateProject } from 'store/actionCreators/Projects';
import Select from 'react-select/creatable';
import { useEffect } from 'react';
import { SelectStyles } from 'components/UI/StylizedMultiSelect/StylizedMultiSelect';
interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    project: IProject;
}



export const ChangeProjectModal: React.FC<Props> = ({isShow, setShow, project}) => {
    const dispatch = useAppDispatch()
    // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

    const {
        register,
        // watch,
        control,
        reset,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<TProjectInputs>()
    
    // const watchTitle = watch("title", project.title)
    useEffect(() => {
        setValue('desc', project.desc);
        setValue('title', project.title);
        setValue('notes', project.notes);
    }, [project])


    const onSubmit: SubmitHandler<TProjectInputs> = (data) => {
        dispatch(updateProject({
            id: project.id,
            date: project.date,
            isImportant: project.isImportant,
            desc: data.desc,
            title: data.title,
            notes: data.notes,
            cards: project.cards
        }))
        reset()
        setShow(false)
    }

    
 
    return (
        <Modal title='Изменение проекта' setShow={setShow} isShow={isShow}>
            <form className="change-project-form" onSubmit={handleSubmit(onSubmit)}>


                <div className="change-project-form__elem">
                    <Controller
                        name="title"
                        control={control}
                        rules={{required: "Введите название"}}
                        defaultValue={project.title}
                        render={({field}) => (
                            <input 
                                className="change-project-form__input"
                                placeholder='Введите название'
                                title='Введите название'
                                value={field.value} 
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>

                <div className="change-project-form__elem">
                    <Controller
                        name="desc"
                        control={control}
                        rules={{required: "Введите описание"}}
                        defaultValue={project.desc}
                        render={({field}) => (
                            <input  
                                className="change-project-form__input"
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
                    title="Сохранить изменения"
                    className='change-project-form__button'
                >Сохранить изменения</button>
            </form>
        </Modal>
    )
}