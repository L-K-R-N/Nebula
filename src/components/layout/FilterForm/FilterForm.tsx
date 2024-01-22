import { useState } from 'react';
import './FilterForm.styles.scss';
import searchIco from './assets/search.svg'
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setSearch } from 'store/reducers/FilterSlice';
import { FilterModal } from 'components/modals/FilterModal/FilterModal';
interface Props {
    
}

export const FilterForm: React.FC<Props> = () => {
    const [showFilter, setShowFilter] = useState(false)
    const {search} = useAppSelector(state => state.FilterReducer)
    const dispatch = useAppDispatch();

    
    return (

        <div className="filter-form">
            <div className="filter-form__input-container">
                <input 
                    title="Поиск нужного проекта" 
                    type="text" 
                    className="filter-form__input search-input" 
                    placeholder='Название проекта'
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                />
                <img className="filter-form__input-ico" src={searchIco} alt="" />
            </div>
            <button 
                title="Сортировка проектов" 
                type="button" 
                className="filter-form__button sort-button"
                onClick={() => setShowFilter(true)}
                >Фильтры</button>
            <FilterModal isShow={showFilter} setShow={setShowFilter}/>
        </div>

        
    )
}