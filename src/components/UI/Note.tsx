import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import React, { useState } from 'react';
import { INote, IProject } from '@/models/Project.types';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateProjectNotes } from '@/store/actionCreators/Projects';

const StyledNote = styled.div<MarkIconProps>`
   padding: 6px 24px;
   border-radius: 999px;
   background: #90c795;
   color: ${(props) => (props.color ? props.color : 'white')};
   transition: all 0.2s;
   position: relative;

   padding-left: ${(props) => (props.isActive ? '13px' : '24px')};
   padding-right: ${(props) => (props.isActive ? '35px' : '24px')};
   /* &:hover {
        background: #709c74;
    } */
`;

interface MarkIconProps {
   color?: string;
   isActive: boolean;
}

const NoteCloseBtn = styled.button<MarkIconProps>`
   width: 28px;
   height: 28px;
   padding: 2px;
   display: flex;
   align-items: center;
   justify-content: center;
   background: white;
   color: ${(props) => (props.color ? props.color : '#90C795')};
   opacity: ${(props) => (props.isActive ? 0.8 : 0)};
   transition: all 0.4s;
   border-radius: 999px;
   position: absolute;
   top: 0;
   right: 0;
   border: none;

   &:hover {
      opacity: 1;
   }
`;

const NoteIcon = styled(IoClose)`
   width: 100%;

   height: 100%;
`;

interface Props {
   // setActive: (e: React.MouseEvent<HTMLButtonElement>) => void;
   // active: boolean;
   project: IProject;
   color?: string;
   note: INote;
}

export const Note: React.FC<Props> = ({ color, note, project }) => {
   const [isActive, setIsActive] = useState(false);
   const dispatch = useAppDispatch();

   const handleNoteDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      dispatch(
         updateProjectNotes({
            projectId: project.id,
            notes: project.notes.filter((n) => n.label !== note.label),
         }),
      );
   };
   return (
      <StyledNote
         onPointerOver={() => setIsActive(true)}
         onPointerLeave={() => setIsActive(false)}
         color={color}
         isActive={isActive}
         onClick={(e) => e.stopPropagation()}
      >
         {note.value}
         <NoteCloseBtn
            onClick={(e) => handleNoteDelete(e)}
            isActive={isActive}
            title="Удалить заметку"
            disabled={!isActive}
         >
            <NoteIcon />
         </NoteCloseBtn>
      </StyledNote>
   );
};
