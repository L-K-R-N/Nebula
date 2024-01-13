
import './CommentItem.styles.scss';
import { IProject } from 'models/Project.types';
import { IComment, ITask } from 'models/TodoCard.types';
import { MoreBtn } from 'components/UI/MoreBtn';
import { IAction } from 'models/MoreList.types';
import { useEffect, useState } from 'react';
import { updateTaskCommentLikes, updateTaskComments } from 'store/actionCreators/Projects';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { BiSolidLike } from "react-icons/bi";
import styled from 'styled-components';
import { IUser } from 'models/User.types';
import { useAppSelector } from 'hooks/useAppSelector';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
interface Props {
    project: IProject;
    task: ITask;
    comment: IComment;
}

const LikeContainer = styled.span<LikeContainerProps>`
    display: flex;
    align-items: end;
    gap: 8px;
    cursor: pointer;
    opacity: ${(props) => props.isActive ? 0.9 : 0.7};
    transition: all 0.2s;
    font-size: 15px;
    color: ${(props) => props.isActive ? '#90C795' : 'white'};
    &:hover {
        opacity: 1;
    }
`

interface LikeContainerProps {
    isActive: boolean;
}

const LikeIco = styled(BiSolidLike)`
    width: 20px;
    height: 20px;
`


const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('скопировано')
        })
        .catch((error) => {
            console.log('ошибка при копировании', )
        })
}



export const CommentItem: React.FC<Props> = ({project, task, comment}) => {
    const dispatch = useAppDispatch();
    const {me} = useAppSelector(state => state.UserReducer)
    const [isLikeActive, setIsLikeActive] = useState(false);
    
    useEffect(() => {
        const isMeLiked = comment.likes.find((user) => user.id === me.id)
        setIsLikeActive(isMeLiked ? true : false)
    }, [comment.likes])

    const [myCommentActions, setMyCommentActions] = useState<IAction[]>([
        {
            title: "Удалить",
            action: handleDelete
        },
        {
            title: "Изменить",
            action: handleChange
        },
        {
            title: "Копировать",
            action: handleCopy
        },
    
    ])

    const [notMineCommentActions, setNotMineCommentActions] = useState<IAction[]>([
       
        {
            title: "Копировать",
            action: handleCopy
        },
        {
            title: "Cкрыть",
            action: handleCopy
        },

    
    ])
    function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        const newComments = task.comments.filter((c) => c.id !== comment.id);
        // task.comments.forEach((c) => {
        //     console.log(c.id !== comment.id)
        // })
        dispatch(updateTaskComments({
            projectId: project.id,
            taskId: task.id,
            comments: newComments
        }))
        
    }

    function handleChange(e: React.MouseEvent<HTMLDivElement>) {
        // setIsChanging(true)
        // console.log("Пост изменен")
    }

    function handleCopy(e: React.MouseEvent<HTMLDivElement>) {
        copyToClipboard(comment.text)
    }

    function handleLike(e: React.MouseEvent<HTMLSpanElement>) {
        const isMeLiked = comment.likes.find((user) => user.id === me.id)
        if (isMeLiked) {
            const newLikes = comment.likes.filter((user) => user.id !== me.id)
            setIsLikeActive(false);
            dispatch(updateTaskCommentLikes({
                projectId: project.id,
                taskId: task.id,
                commentId: comment.id,
                newCommentLikes: newLikes
            }))
        }
        else {
            setIsLikeActive(true);
            dispatch(updateTaskCommentLikes({
                projectId: project.id,
                taskId: task.id,
                commentId: comment.id,
                newCommentLikes: [...comment.likes, me]
            }))
        }
        console.log(comment.likes)
        // dispatch(updateTaskCommentLikes([...comment.]))
    }


    return (
        <div className="comment">
            <div className="comment-header">
                <div className="comment-header__content">
                    <h5 className="comment-header__title">
                        {comment.user.username}
                    </h5> 
                    <span className="comment-header__date">
                        {formatDistanceToNow(comment.date.creation, {
                            locale: ru,
                            addSuffix: true
                        })} 
                    </span>
                    <span className="comment-header__isChanging">
                    {comment.date.change !== comment.date.creation ? '(изменено)' : ''}
                    </span>
                </div> 
                <MoreBtn list={comment.user.id === me.id ? myCommentActions : notMineCommentActions} color='white'/>
            </div>
            <div className="comment-main">
                {comment.text}
            </div>
            <div className="comment-footer">
            <LikeContainer isActive={isLikeActive} onClick={(e) => handleLike(e)}>
                <LikeIco/>
                <span className="comment-footer__likes_number">{comment.likes.length}</span> 
            </LikeContainer>
            </div>
            
        </div>
        
    )
}