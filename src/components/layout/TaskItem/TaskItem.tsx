
import { ITask } from 'models/TodoCard.types';
import './TaskItem.styles.scss';
import moreIco from './assets/more.svg'
import markIco from './assets/mark.svg'
import commentIco from './assets/comment.svg'
import watchIco from './assets/watch.svg'

interface Props {
    task: ITask;

}

export const TaskItem: React.FC<Props> = ({task}) => {

    return (
    <section className="task-item">
        <div className="task-item__header">
            <h5 className="task-item__title">{task.id}. {task.title}</h5>
            <img className="task-item__control" src={moreIco} alt="" />
        </div>
        <div className="task-item__main">
            <p className="task-item__desc">
                {task.desc}
            </p>
            <hr />
        </div>
        <div className="task-item__footer">
        
            <div className="task-item__date-container">
                <img className="task-item__date-img" src={watchIco} alt="" />
                {/* <span className="task-item__date">{task.date}</span> */}
            </div>
            <div className="task-item__info">
                <img className="task-item__notes" src={markIco} alt="" />
                <img className="task-item__comments" src={commentIco} alt="" />
               
            </div>
        </div>
    </section>
    
        
    )
}