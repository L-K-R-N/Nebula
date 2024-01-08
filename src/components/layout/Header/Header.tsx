import { Link, Outlet } from 'react-router-dom';
import './Header.styles.scss';
import { NavBar } from '../NavBar/NavBar';
import { ILink } from 'models/NavBar.types';
import { FaUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa";

import { BsBookmarkDashFill } from "react-icons/bs";
interface Props {

}



const navLinks: ILink[] = [
    
    // {
    //     to: "friends",
    //     children: <FaUserPlus/>
    // },
    {
        to: "/importants",
        children: <BsBookmarkDashFill/>
    },
    {
        to: "/profile",
        children: <FaUser/>
    },
]

export const Header: React.FC<Props> = () => {

    return (
        <>
        <header className='header'>

            <div className="big-wrapper">
            <div className="header__content">
                
                    <Link to={'/Project-Hub'} className="header__logo logo">
                        TODO LIST
                    </Link>
                    <NavBar links={navLinks}/>
                
            </div>
            </div>
        </header>
        <Outlet />
    </>
    )
}

