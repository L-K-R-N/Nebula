import styled from 'styled-components';
import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { IAction } from '@/models/MoreList.types';

const MoreIcon = styled(IoMdMore)<MoreIconProps>`
   width: 100%;
   height: 100%;
   opacity: 0.8;
   transition: all 0.2s;
   color: ${(props) => (props.color ? props.color : 'black')};

   &:hover {
      opacity: 1;
   }
`;

interface MoreIconProps {
   color?: string;
}

const MoreContainer = styled.div<MoreContainerProps>`
   width: ${(props) => (props.width ? props.width : '30px')};
   height: ${(props) => (props.height ? props.height : '30px')};
   position: relative;
   cursor: pointer;
`;

interface MoreContainerProps {
   width?: string;
   height?: string;
}

const ActionList = styled.div<ActionListProps>`
   position: absolute;
   right: 0;
   top: 100%;
   border-radius: 5px;
   background-color: #ebebeb;
   display: ${(props) => (props.visible ? 'flex' : 'none')};
   align-items: center;
   justify-content: start;
   flex-direction: column;
   z-index: 8000;
   box-shadow: 0px 0px 4px 0 #0000009a;
`;

interface ActionListProps {
   visible: boolean;
}

const ActionItem = styled.div`
   color: black;
   border-bottom: 1px solid #bdbdbd;
   padding: 10px 15px;
   width: 100%;
   transition: all 0.2s;

   &:hover {
      background: rgba(0, 0, 0, 0.118);
   }

   &:last-child {
      border-bottom: none;
   }
`;

interface Props {
   color?: string;
   list: IAction[];
   containerStyle?: MoreContainerProps;
}

export const MoreBtn: React.FC<Props> = ({ color, list, containerStyle }) => {
   const [visible, setVisible] = useState(false);

   return (
      <MoreContainer
         width={containerStyle?.width}
         height={containerStyle?.height}
         onPointerOver={() => setVisible(true)}
         onPointerLeave={() => setVisible(false)}
         onClick={(e) => e.stopPropagation()}
      >
         <MoreIcon color={color} />

         <ActionList visible={visible}>
            {list.map((item) => (
               <ActionItem onClick={(e) => item.action(e)} key={item.title}>
                  {item.title}
               </ActionItem>
            ))}
         </ActionList>
      </MoreContainer>
   );
};
