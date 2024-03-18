import { ReactElement } from 'react';
import styled from 'styled-components';

const BtnContainer = styled.button.attrs<BtnContainerProps>({
   type: 'button',
})`
   background: transparent;
   border: none;
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   width: ${(props) => (props.width ? props.width : '30px')};
   height: ${(props) => (props.height ? props.height : '30px')};
   opacity: 0.9;
   transition: all 0.2s;
   color: ${(props) => (props.color ? props.color : 'white')};

   &:hover {
      opacity: 1;
   }
`;
interface BtnContainerProps {
   width?: string;
   height?: string;
   color?: string;
}

interface Props {
   clickAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
   title: string;
   containerStyle?: BtnContainerProps;

   children: ReactElement;
}

export const BtnIcon: React.FC<Props> = ({
   clickAction,
   containerStyle,
   title,
   children,
}) => {
   return (
      <BtnContainer
         onClick={(e) => clickAction(e)}
         width={containerStyle?.width}
         height={containerStyle?.height}
         title={title}
         color={containerStyle?.color}
      >
         {children}
      </BtnContainer>
   );
};
