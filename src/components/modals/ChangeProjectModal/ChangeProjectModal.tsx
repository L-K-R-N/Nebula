
import './ChangeProjectModal.styles.scss'

import { useAppDispatch } from 'hooks/useAppDispatch';

import { useAppSelector } from 'hooks/useAppSelector';
import { Modal } from 'components/UI/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setProjects } from 'store/reducers/ProjectsSlice';

interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

interface Inputs {
    title: string;
    desc: string;
}

export const ChangeProjectModal: React.FC<Props> = ({isShow, setShow}) => {
    const dispatch = useAppDispatch()
    const {projects} = useAppSelector(state => state.ProjectsReducer) 
    const currentDate = new Date();
    // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<Inputs>()
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(setProjects([...projects, {
            id: Date.now(),
            date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
            desc: data.desc,
            title: data.title,
            notes: [],
            isImportant: false,
        }]))

        setShow(false)
    }
 
    return (
        <Modal title='Создание проекта' setShow={setShow} isShow={isShow}>
            <form className="add-project-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("title", {required: true})}/>
                {errors.title && <span>Введите название</span>}
                <input type="text" {...register("desc", {required: true})}/>
                {errors.desc && <span>Введите описание</span>}

                <button type='submit' title='Создать пост'>Создать</button>
            </form>
        </Modal>
    )
}