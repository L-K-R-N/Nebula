import { useAppSelector } from '@/hooks/useAppSelector';
import './ProjectsPage.styles.scss';
import { useSearchProject, useSortProjects } from '@/hooks/useFilter';
import { ProjectsControl } from '@/components/layout/Control/ProjectsControl';
import { Projects } from '@/components/layout/Projects/Projects';

interface Props {}

const ProjectsPage: React.FC<Props> = () => {
   const { projects } = useAppSelector((state) => state.ProjectsReducer);
   const { search, sortingBy } = useAppSelector((state) => state.FilterReducer);
   const sortedProjects = useSortProjects(projects, sortingBy?.value);
   const searchedProjects = useSearchProject(sortedProjects, search);

   return (
      <div className="project-page">
         <ProjectsControl />
         <Projects projects={searchedProjects} />
      </div>
   );
};

export default ProjectsPage;
