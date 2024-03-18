import './Message.styles.scss';
import { ReactNode } from 'react';

interface Props {
   children: string | ReactNode;
}

export const Message: React.FC<Props> = ({ children }) => {
   return (
      <div className="message">
         <h4 className="message__title">{children}</h4>
      </div>
   );
};
