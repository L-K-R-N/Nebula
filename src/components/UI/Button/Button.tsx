import { FC, ReactElement } from 'react';
import cl from './Button.module.scss';

interface Props {
   children: string | ReactElement;
   title: string;
   type: 'button' | 'submit' | 'reset' | undefined;
   onClick?: () => void;
   styles?: {};
}

export const Button: FC<Props> = ({
   children,
   title,
   type,
   styles,
   onClick,
}) => {
   return (
      <button
         type={type}
         title={title}
         className={cl.button}
         style={styles}
         onClick={onClick}
      >
         {children}
      </button>
   );
};
