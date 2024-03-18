import './TaskCommentsModal.styles.scss';
import { IoSend } from 'react-icons/io5';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from '@/components/UI/Modal';
import { updateTaskComments } from '@/store/actionCreators/Projects';
import { CommentItem } from '@/components/layout/CommentItem/CommentItem';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IProject, ITask, ITodoCard } from '@/models/Project.types';

// import CreatableSelect from 'react-select/Creatable';
interface Props {
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   project: IProject;
   task: ITask;
   card: ITodoCard;
}

interface ICommentInputs {
   text: string;
}

export const TaskCommentsModal: React.FC<Props> = ({
   isShow,
   setShow,
   project,
   task,
   card,
}) => {
   const dispatch = useAppDispatch();
   const currentDate = new Date();
   const { me } = useAppSelector((state) => state.UserReducer);
   // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

   const { handleSubmit, control, reset, setValue } = useForm<ICommentInputs>();

   const onSubmit: SubmitHandler<ICommentInputs> = (data) => {
      dispatch(
         updateTaskComments({
            projectId: project.id,
            taskId: task.id,
            cardId: card.id,
            newComments: [
               ...task.comments,
               {
                  user: me,
                  comments: [],
                  date: {
                     creation: currentDate,
                     completion: currentDate,
                     change: currentDate,
                  },
                  id: Date.now(),
                  likes: [],
                  text: data.text,
               },
            ],
         }),
      );

      reset();
      setValue('text', '');
   };

   // const handleChangeNotes = (newValue: SingleValue<IOption<string>>) => {
   //     dispatch(setSorting(newValue?.value === 'desc' ||
   //                         newValue?.value === 'title' ||
   //                         newValue?.value === 'id' ? newValue?.value : sortingBy))
   //     // console.log(sortingBy)
   // }

   return (
      <Modal title="Комментарии" setShow={setShow} isShow={isShow}>
         <div className="comment-modal">
            <div className="comment-modal__content">
               {task.comments.map((comment) => (
                  <CommentItem
                     card={card}
                     key={comment.id}
                     project={project}
                     task={task}
                     comment={comment}
                  />
               ))}
            </div>
            <form
               className="comment-modal__form"
               onSubmit={handleSubmit(onSubmit)}
            >
               <Controller
                  name="text"
                  control={control}
                  rules={{ required: 'Введите комментарий' }}
                  render={({ field }) => (
                     <label htmlFor="comment">
                        Введите комментарий
                        <input
                           className="comment-modal__form__input"
                           placeholder="Введите комментарий"
                           title="Введите комментарий"
                           value={field.value}
                           id="comment"
                           onChange={field.onChange}
                        />
                     </label>
                  )}
               />

               {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
               <button
                  type="submit"
                  title="Отправить комментарий"
                  className="comment-modal__form__button"
                  id="submit-comment"
               >
                  <IoSend />
               </button>
            </form>
         </div>
      </Modal>
   );
};
