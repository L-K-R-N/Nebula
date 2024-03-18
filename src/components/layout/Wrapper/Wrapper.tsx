import { ReactNode } from 'react';
import cl from './Wrapper.module.scss';

interface Props {
   children: ReactNode;
}

export const Wrapper: React.FC<Props> = ({ children }) => {
   return <div className={cl.wrapper}>{children}</div>;
};
