
import './CommentItem.styles.scss';
import { ProjectList } from '../ProjectList/ProjectList';
import { useSearchProject, useSortProjects } from 'hooks/useFilter';
import { useAppSelector } from 'hooks/useAppSelector';
import { IProject } from 'models/Project.types';
import { IComment } from 'models/TodoCard.types';
import { MoreBtn } from 'components/UI/MoreBtn';

interface Props {
    comment: IComment;
}

export const CommentItem: React.FC<Props> = ({comment}) => {
    
    return (
        <div className="comment">
            <div className="comment-header">
                <div className="comment-header__content">
                    <h5 className="comment-header__title">
                        {comment.user.username}
                    </h5> 
                    <span className="comment-header__date">
                        {comment.date.creation}
                    </span>
                </div> 
                <MoreBtn list={[]} color='white'/>
            </div>
            <div className="comment-main">
                {comment.text}
            </div>
            <div className="comment-footer">
            {comment.likes} {}
            </div>
            
        </div>
        
    )
}