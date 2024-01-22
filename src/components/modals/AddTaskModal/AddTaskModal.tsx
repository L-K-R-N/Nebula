import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './AddTaskModal.styles.scss'
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Modal } from 'components/UI/Modal';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select/creatable';
import {INote, IProject } from 'models/Project.types';
import { updateTasks } from 'store/actionCreators/Projects';
import { IDates, ITodoCard } from 'models/Project.types';
import { SelectStyles } from 'components/UI/StylizedMultiSelect/StylizedMultiSelect';
import DatePicker from 'react-date-picker';
import { FaCalendar } from "react-icons/fa";
import styled from 'styled-components';
import { GrClose } from "react-icons/gr";
import { useState } from 'react';

// import CreatableSelect from 'react-select/Creatable';
interface Props {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    project: IProject;
    card: ITodoCard;
}


export interface ITaskInputs {
    date: Date;
    title: string;
    desc: string;
    notes: INote[];
   
}

export const StyledCalendar = styled(FaCalendar)`
    color: white;
    opacity: 0.7;
    height: 100%;

    &:hover {
        opacity: 1;
    }
`
export const StyledClose = styled(GrClose)`
    color: white;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    &:hover {
        opacity: 1;
    }
`



export const AddTaskModal: React.FC<Props> = ({isShow, setShow, project, card}) => {
    const dispatch = useAppDispatch()
    const currentDate = new Date();
    // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

    // const onChangeDate = (date: ) => {
    //     const dateValue = date.toDate()
    // }

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: {
            errors
        }
    } = useForm<ITaskInputs>()
    
    const onSubmit: SubmitHandler<ITaskInputs> = (data) => {
        dispatch(updateTasks({
            projectId: project.id,
            cardId: card.id,
            newTasks: [...card.tasks, {
                title: data.title,
                desc: data.desc,
                notes: data.notes,
                date: {
                    creation: currentDate,
                    completion: data.date,
                    change: currentDate,
                },
                id: `task-${Date.now()}`,
                isFixed: false,
                comments: [],
                subtasks: []
                
            }]
        }))
        
        // console.log(project.tasks)
        reset()
        setValue('title', '');
        setValue('desc', '');
        setValue('notes', []);
        setValue('date', new Date());
        setShow(false)
        
    }

    // const handleChangeNotes = (newValue: SingleValue<IOption<string>>) => {
    //     dispatch(setSorting(newValue?.value === 'desc' || 
    //                         newValue?.value === 'title' || 
    //                         newValue?.value === 'id' ? newValue?.value : sortingBy))
    //     // console.log(sortingBy)
    // }
 
    return (
        <Modal title='Создание задачи' setShow={setShow} isShow={isShow}>
            <form className="add-task-form" onSubmit={handleSubmit(onSubmit)}>
                

                
                <div className='add-task-form__elem'>
                <Controller
                    name="title"
                    control={control}
                    rules={{required: "Введите название"}}
                    render={({field}) => (
                        <input 
                            className="add-project-form__input"
                            placeholder='Введите название'
                            title='Введите название'
                            value={field.value} 
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.title && <span>{errors.title.message}</span>}
                </div>
                
                <div className='add-task-form__elem'>
                <Controller
                    name="desc"
                    control={control}
                    rules={{required: "Введите описание"}}
                    render={({field}) => (
                        <input  
                            className="add-task-form__input"
                            placeholder='Введите описание'
                            title='Введите описание'
                            value={field.value} 
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.desc && <span>{errors.desc.message}</span>}
                </div>
                <div className='add-task-form__elem'>
                <Controller
                    name="date"
                    control={control}
                    rules={{required: "Введите дату окончания"}}
                    render={({field}) => (
                        <DatePicker 
                            className="add-task-form__input" 
                            calendarClassName="add-task-form__calendar"
                            calendarIcon={<StyledCalendar/>}
                            clearIcon={<StyledClose/>}

                            value={field.value}
                            onChange={field.onChange}
                            minDate={new Date()}
                />
                    )}
                />
                {errors.date && <span>{errors.date.message}</span>}
                </div>
                
                {/* <DatePicker id='add-task-form__input'/> */}
                <Controller 
                    
                    name="notes"
                    control={control}
                    render={({field}) => (
                        <Select
                            
                            placeholder="Введите заметки"
                            styles={SelectStyles}
                            className="add-project-form__select"
                            {...field}

                            
                            isMulti
                            options={[]}
                            onChange={(newValue) => {
                                field.onChange(newValue)
                            }}
                        />
                    )}
                />
                <button 
                    type='submit' 
                    title='Создать задачу'
                    className='add-task-form__button'
                >
                    Создать
                </button>
            </form>
        </Modal>
    )
}