import { ChangeEvent } from 'react';
import './FilterForm.styles.scss';
import searchIco from 'assets/search.svg'
interface Props {
    change: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export const FilterForm: React.FC<Props> = ({change, value}) => {

    return (

        <form className="filter-form">
            <div className="filter-form__input-container">
                <input 
                    title="Поиск нужного проекта" 
                    type="text" 
                    className="filter-form__input search-input" 
                    placeholder='Название проекта'
                    value={value}
                    onChange={(e) => change(e)}
                />
                <img className="filter-form__input-ico" src={searchIco} alt="" />
            </div>
            <button title="Сортировка проектов" type="button" className="filter-form__button sort-button">Фильтры</button>
        </form>

        
    )
}