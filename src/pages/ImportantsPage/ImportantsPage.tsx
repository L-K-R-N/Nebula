import './ImportantsPage.styles.scss';
import { ProjectsControl } from '@/components/layout/Control/ProjectsControl';
import { Projects } from '@/components/layout/Projects/Projects';
import { useAppSelector } from '@/hooks/useAppSelector';

interface Props {}

const ImportantsPage: React.FC<Props> = () => {
   const { projects } = useAppSelector((state) => state.ProjectsReducer);
   const importantProjects = projects.filter((project) => project.isImportant);
   return (
      <div className="importants-page">
         <main className="main">
            <ProjectsControl />
            <Projects projects={importantProjects} />
         </main>
      </div>
   );
};

export default ImportantsPage;
