import styled from 'styled-components';
import './NavBar.styles.scss';
import { ILink } from 'models/NavBar.types';

import { Link } from 'react-router-dom';

const List = styled.ul`
    
`

const StyledLink = styled(Link)


interface Props {
    links: ILink[];
}

export const NavBar: React.FC<Props> = ({links}) => {

    return (
        <nav className="menu">
            <ul className="menu__list">
                {links.map((link) => 
                    <Link to={link.to} className="menu__list-item" key={link.to}>{link.children}</Link>
                )}
            </ul>
        </nav>

    )
}