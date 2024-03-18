import { Link } from 'react-router-dom';
import cl from './Header.module.scss';
import { FaUser } from 'react-icons/fa';
import { BsBookmarkDashFill } from 'react-icons/bs';
import { ILink } from '@/models/NavBar.types';
import { NavBar } from '../NavBar/NavBar';
import logo from './assets/logo.png';
import { Wrapper } from '../Wrapper/Wrapper';

interface Props {}

const navLinks: ILink[] = [
   {
      to: '/importants',
      children: <BsBookmarkDashFill />,
   },
   {
      to: '/profile',
      children: <FaUser />,
   },
];

export const Header: React.FC<Props> = () => {
   return (
      <header className={cl.header}>
         <Wrapper>
            <div className={cl.header__content}>
               <Link to="/nebula" className={cl.logoContainer}>
                  <img src={logo} alt="Nebula" className={cl.logoImg} />
                  <span className={cl.logoText}>Nebula</span>
               </Link>
               <NavBar links={navLinks} />
            </div>
         </Wrapper>
      </header>
   );
};
