import './TaskCommentsModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';
import { IoSend } from "react-icons/io5";
import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select/creatable';
import {INote, IProject} from 'models/Project.types';
import { format, formatDistanceToNow } from 'date-fns';
import { updateTaskComments, updateTasks } from 'store/actionCreators/Projects';
import { IDates, ITask, TTaskStatus } from 'models/TodoCard.types';
import { CommentItem } from 'components/layout/CommentItem/CommentItem';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/useAppSelector';
import {ru} from 'date-fns/locale'

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
    const {me} = useAppSelector(state => state.UserReducer)
    // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

    const formattedDate = formatDistanceToNow(currentDate, {
        locale: ru,
        addSuffix: true,
    })

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
                user: me,
                comments: [],
                date: {
                    creation: currentDate,
                    completion: currentDate,
                    change: currentDate,
                },
                id: Date.now(),
                likes: [],
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
                        <CommentItem key={comment.id} project={project} task={task} comment={comment}/>
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