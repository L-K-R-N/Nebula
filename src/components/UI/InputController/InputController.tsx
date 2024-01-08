import { Control, Controller, FieldError, FieldErrors, FieldValues, Path, UseControllerProps } from "react-hook-form"
import './InputController.styles.scss'
interface Props<
    TFieldValues extends FieldValues = FieldValues,
    TName extends Path<TFieldValues> = Path<TFieldValues>,
    
    > extends UseControllerProps<TFieldValues, TName> {
        disabled?: boolean;
        label: string;
        placeholder?: string;
        errors: FieldErrors<TFieldValues>,
        fieldErrorName: FieldError,
        control: Control<TFieldValues, any>
}

export const InputController: React.FC<Props> = ({control, rules, errors, name, fieldErrorName}) => {


    return (
        <div className='controller__elem'>
                {/* <Controller
                    
                    name={name}
                    control={control}
                    rules={rules}
                    render={({field}) => (
                        <input 
                            className="controller__input"
                            placeholder='Введите название'
                            title='Введите название'
                            value={field.value} 
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.title && <span>{errors.root?.message}</span>} */}
                </div>
    )
}