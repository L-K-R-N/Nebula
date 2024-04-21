import cl from './Form.module.scss';
import { BaseSyntheticEvent, FC, ReactNode } from 'react';

interface Props {
   children: ReactNode[];
   onSubmit: (
      e?: BaseSyntheticEvent<object, any, any> | undefined,
   ) => Promise<void>;
}

export const Form: FC<Props> = ({ children, onSubmit }) => {
   return (
      <form className={cl.form} onSubmit={onSubmit}>
         {children}
      </form>
   );
};
