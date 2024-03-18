import {
   Control,
   Controller,
   FieldErrors,
   FieldValues,
   UseControllerProps,
} from 'react-hook-form';
import cl from './InputController.module.scss';
import { Input } from '../Input/Input';
import { ReactNode } from 'react';

interface Props<TFieldValues extends FieldValues>
   extends UseControllerProps<TFieldValues> {
   disabled?: boolean;
   label: string;
   placeholder?: string;
   errors: FieldErrors<TFieldValues>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   control: Control<TFieldValues, any, TFieldValues>;
   title: string;
}

export function InputController<TFieldValues extends FieldValues>({
   name,
   control,
   defaultValue,
   errors,
   rules,
   title,
}: Props<TFieldValues>) {
   return (
      <div className={cl.container}>
         <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => (
               <Input errors={errors} title={title} field={field} name={name} />
            )}
         />
         {errors && <span>{errors[name]?.message as ReactNode}</span>}
      </div>
   );
}
