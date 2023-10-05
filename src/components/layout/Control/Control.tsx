import { useTypesSelector } from 'hooks/useTypesSelector';
import { FilterForm } from '../FilterForm/FilterForm';
import './Control.styles.scss';
import { useActions } from 'hooks/useAction';
import { useEffect } from 'react';

interface Props {

}

export const Control: React.FC<Props> = () => {
    const {projectRequest} = useTypesSelector(state => state.filter);
    const {filterActionCreator} = useActions()

    useEffect(() => {
        console.log(projectRequest)
    }, [projectRequest])
    return (
        <div className="control">
            <div className="wrapper control__content">
                <FilterForm 
                    change={(e) => filterActionCreator(e.target.value)}
                    value={projectRequest}
                />
                <button title="Добавить проект" className="control__button create-button">Добавить проект</button>
            </div>
        </div>
        
    )
}