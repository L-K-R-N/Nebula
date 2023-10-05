import { Link } from 'react-router-dom';
import './Header.styles.scss';
import userIco from 'assets/user.svg';
import bookmarkIco from 'assets/bookmark.svg';
import settingsIco from 'assets/settings.svg';

interface Props {

}

export const Header: React.FC<Props> = () => {

    return (
        <header className='header'>

            <div className="wrapper">
               <div className="header__content">
                
                    <Link to={'/'} className="header__logo logo">
                        TODO LIST
                    </Link>
                    <nav className="menu header__menu">
                        <ul className="header__list list">
                            <li className="header__list-item list-item">
                                <a href="" className="header__list-link list-link">
                                    <img className="header__list-img" src={settingsIco} alt="" />
                                </a>
                            </li>
                            <li className="header__list-item list-item">
                                <a href="" className="header__list-link list-link">
                                <img className="header__list-img" src={userIco} alt="" />
                                </a>
                            </li>
                        
                            <li className="header__list-item list-item">
                                <a href="" className="header__list-link list-link">
                                    <img className="header__list-img" src={bookmarkIco} alt="" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                
               </div>
            </div>
        </header>
    )
}

