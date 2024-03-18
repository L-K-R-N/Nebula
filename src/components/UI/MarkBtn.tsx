import styled from 'styled-components';
import { BsBookmarkDashFill } from 'react-icons/bs';
import React from 'react';
import { BtnIcon } from './BtnIcon';

const MarkIcon = styled(BsBookmarkDashFill)<MarkIconProps>`
   width: 100%;
   height: 100%;
   opacity: 1;
   transition: all 0.2s;
   color: ${(props) =>
      props.color && props.active
         ? props.activeColor
         : props.color && !props.active
           ? props.color
           : !props.color && props.active
             ? '#FFA654'
             : '#bdbdbd'};

   &:hover {
      opacity: 1;
   }
`;

interface MarkIconProps {
   color?: string;
   activeColor?: string;
   active: boolean;
}

interface Props {
   setActive: (e: React.MouseEvent<HTMLButtonElement>) => void;
   active: boolean;
   color?: string;
   activeColor?: string;
}

export const MarkBtn: React.FC<Props> = ({
   setActive,
   active,
   color,
   activeColor,
}) => {
   return (
      <BtnIcon clickAction={(e) => setActive(e)} title="Добавить в избранное">
         <MarkIcon color={color} activeColor={activeColor} active={active} />
      </BtnIcon>
   );
};
