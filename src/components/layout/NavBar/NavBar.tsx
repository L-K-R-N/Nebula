import cl from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';
import { ILink } from '@/models/NavBar.types';

interface Props {
   links: ILink[];
}

export const NavBar: React.FC<Props> = ({ links }) => {
   return (
      <nav className={cl.nav}>
         <ul className={cl.list}>
            {links.map((link) => (
               <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                     isActive ? [cl.link, cl.active].join(' ') : cl.link
                  }
                  key={link.to}
               >
                  {link.children}
               </NavLink>
            ))}
         </ul>
      </nav>
   );
};
