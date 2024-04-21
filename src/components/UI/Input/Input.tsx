import { ChangeEvent, useId, useRef } from 'react';
import cl from './Input.module.scss';
import {
   ControllerRenderProps,
   FieldErrors,
   FieldValues,
   Path,
} from 'react-hook-form';

interface Props<TFieldValues extends FieldValues> {
   title: string;

   field?: ControllerRenderProps<TFieldValues>;
   errors?: FieldErrors<TFieldValues>;
   name?: Path<TFieldValues>;
   value?: string;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input<TFieldValues extends FieldValues>({
   title,
   field,

   value,
   onChange,
}: Props<TFieldValues>) {
   const id = useId();

   const labelEl = useRef<HTMLLabelElement | null>(null);

   return (
      <div className={cl.container}>
         <label className={cl.label} htmlFor={id} ref={labelEl}>
            {title}
         </label>
         <input
            className={cl.input}
            id={id}
            onChange={field ? field.onChange : onChange}
            value={field ? field.value : value}
            type="text"
            title={title}
            placeholder={title}
            // aria-invalid={errors && name && errors[name] ? 'true' : 'false'}
         />
      </div>
   );
}
