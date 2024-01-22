
import './ChangeCardModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { INote, IProject,  TProjectInputs, TTodoCardInputs} from 'models/Project.types';
import { updateCard, updateProject, updateTask } from 'store/actionCreators/Projects';
import Select from 'react-select/creatable';
import { useEffect } from 'react';
import { ITask, ITodoCard } from 'models/Project.types';
import { SelectStyles, StylizedMultiSelect } from 'components/UI/StylizedMultiSelect/StylizedMultiSelect';
import DatePicker from 'react-date-picker';
import { ITaskInputs, StyledCalendar, StyledClose } from '../AddTaskModal/AddTaskModal';


interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    project: IProject;
    card: ITodoCard;
}



export const ChangeCardModal: React.FC<Props> = ({isShow, setShow, project, card}) => {
    const dispatch = useAppDispatch()
    // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

    const {
        control,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<TTodoCardInputs>()
    
    // const watchTitle = watch("title", project.title)
    useEffect(() => {
        setValue('title', card.title);
    }, [card])


    const onSubmit: SubmitHandler<TTodoCardInputs> = (data) => {
        dispatch(updateCard({
            projectId: project.id,
            cardId: card.id,
            newCard: {
                title: data.title,
                tasks: card.tasks,
                id: card.id
            }
        }))
        console.log(1)
        setShow(false)
    }

    
 
    return (
        <Modal title='Изменение задачи' setShow={setShow} isShow={isShow}>
            <form className="change-card-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="change-card-form__elem">
                    <Controller
                        name="title"
                        control={control}
                        rules={{required: "Введите название"}}
                        defaultValue={card.title}
                        render={({field}) => (
                            <input 
                                className="change-card-form__input"
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
                    type='submit' 
                    title="Сохранить изменения"
                    className='change-task-form__button'
                >Сохранить изменения</button>
            </form>
        </Modal>
    )
}