import './TaskCommentsModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';
import { IoSend } from "react-icons/io5";
import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select/creatable';
import {INote, IProject} from 'models/Project.types';
import { format } from 'date-fns';
import { updateTaskComments, updateTasks } from 'store/actionCreators/Projects';
import { IDates, ITask, TTaskStatus } from 'models/TodoCard.types';
import { CommentItem } from 'components/layout/CommentItem/CommentItem';
// import CreatableSelect from 'react-select/Creatable';
interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    project: IProject;
    task: ITask;
}


interface ICommentInputs {
    text: string;

}



export const TaskCommentsModal: React.FC<Props> = ({isShow, setShow, project, task}) => {
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
    } = useForm<ICommentInputs>()
    
    const onSubmit: SubmitHandler<ICommentInputs> = (data) => {
        dispatch(updateTaskComments({
            projectId: project.id,
            taskId: task.id,
            comments: [...task.comments, {
                user: {
                    id: 1,
                    username: 'LKRN',
                    email: 'email'
                },
                comments: [],
                date: {
                    creation: format(currentDate, 'dd.MM.yyyy'),
                    completion: format(currentDate, 'dd.MM.yyyy'),
                    change: format(currentDate, 'dd.MM.yyyy'),
                },
                id: Date.now(),
                likes: 0,
                text: data.text

            }]
        }))
        
        console.log(task.comments)
        reset()
        setValue('text', '');
        
    }

    // const handleChangeNotes = (newValue: SingleValue<IOption<string>>) => {
    //     dispatch(setSorting(newValue?.value === 'desc' || 
    //                         newValue?.value === 'title' || 
    //                         newValue?.value === 'id' ? newValue?.value : sortingBy))
    //     // console.log(sortingBy)
    // }
 
    return (
        <Modal title='Комментарии' setShow={setShow} isShow={isShow}>
            <div className="comment-modal">
                <div className="comment-modal__content">
                    {task.comments.map((comment) => 
                        <CommentItem comment={comment}/>
                    )}
                </div>
                <form className="comment-modal__form" onSubmit={handleSubmit(onSubmit)}>
                

                <Controller
                    name="text"
                    control={control}
                    rules={{required: "Введите комментарий"}}
                    render={({field}) => (
                        <input  
                            className='comment-modal__form__input'
                            placeholder='Введите комментарий'
                            title='Введите комментарий'
                            value={field.value} 
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.text && <span>{errors.text.message}</span>}

                
                <button 
                    type='submit' 
                    title='Отправить комментарий'
                    className='comment-modal__form__button'
                ><IoSend/></button>
            </form>
            </div>
        </Modal>
    )
}