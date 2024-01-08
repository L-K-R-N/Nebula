import { useState } from 'react';
import { FilterForm } from '../FilterForm/FilterForm';
import './Control.styles.scss';
import { AddProjectModal } from 'components/modals/AddProjectModal/AddProjectModal';


interface Props {

}

export const Control: React.FC<Props> = () => {
    const [addModalShow, setModalShow] = useState(false)
    return (
        <div className="control">
            <div className="big-wrapper control__content">
                <FilterForm />
                <button 
                    title="Добавить проект" 
                    className="control__button create-button"
                    onClick={() => setModalShow(true)}
                >Добавить проект</button>
                <AddProjectModal isShow={addModalShow} setShow={setModalShow}/>
            </div>
        </div>
        
    )
}