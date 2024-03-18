import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { BtnIcon } from './BtnIcon';

const CloseIcon = styled(IoClose)<CloseIconProps>`
   width: 100%;
   height: 100%;
   color: black;
   opacity: 0.7;
   transition: all 0.2s;
   color: ${(props) => props.color};

   &:hover {
      opacity: 1;
   }
`;

interface CloseIconProps {
   color: string;
}

interface Props {
   setState: React.Dispatch<React.SetStateAction<boolean>>;
   color: string;
}

export const CloseBtn: React.FC<Props> = ({ setState, color }) => {
   return (
      <BtnIcon clickAction={() => setState(false)} title="Закрыть">
         <CloseIcon color={color} />
      </BtnIcon>
   );
};
