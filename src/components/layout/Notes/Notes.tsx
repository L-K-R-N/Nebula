import './Notes.styles.scss';
import { FaMarker } from 'react-icons/fa';
import { Note } from '@/components/UI/Note';
import { INote, IProject } from '@/models/Project.types';

interface Props {
   notes: INote[];
   project: IProject;
}

export const Notes: React.FC<Props> = ({ notes, project }) => {
   return (
      <>
         <div className="notes">
            {notes?.map((note) => (
               <Note note={note} project={project} key={note.label} />
            ))}
         </div>
         <FaMarker className="notes-ico" />
      </>
   );
};
