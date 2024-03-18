import {
   Control,
   Controller,
   FieldErrors,
   FieldValues,
   UseControllerProps,
} from 'react-hook-form';
import cl from './SelectController.module.scss';
import { ReactNode } from 'react';
import { MySelect } from '../MySelect/MySelect';
import { GroupBase, OptionsOrGroups } from 'react-select';

interface Props<TFieldValues extends FieldValues, TOptions>
   extends UseControllerProps<TFieldValues> {
   disabled?: boolean;
   placeholder: string;
   errors: FieldErrors<TFieldValues>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   control: Control<TFieldValues, any, TFieldValues>;
   options: OptionsOrGroups<TOptions, GroupBase<TOptions>> | undefined;
   isMulti: boolean;
}

export function SelectController<TFieldValues extends FieldValues, TOptions>({
   name,
   control,
   defaultValue,
   errors,
   rules,
   options,
   placeholder,
   isMulti,
}: Props<TFieldValues, TOptions>) {
   return (
      <div className={cl.container}>
         <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => (
               <MySelect
                  isMulti={isMulti}
                  placeholder={placeholder}
                  field={field}
                  options={options}
                  errors={errors}
                  name={name}
               />
            )}
         />
         {errors && name && <span>{errors[name]?.message as ReactNode}</span>}
      </div>
   );
}
