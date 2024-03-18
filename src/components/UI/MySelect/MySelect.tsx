import Select from 'react-select/creatable';
import { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import {
   ControllerRenderProps,
   FieldErrors,
   FieldPath,
   FieldValues,
   Path,
} from 'react-hook-form';
interface Props<
   TFieldValues extends FieldValues,
   TName extends FieldPath<TFieldValues>,
> {
   placeholder: string;
   isMulti: boolean;
   options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
   field: ControllerRenderProps<TFieldValues, TName>;
   errors?: FieldErrors<TFieldValues>;
   name?: Path<TFieldValues>;
}

const SelectStyles: StylesConfig = {
   control: (styles) => ({
      ...styles,
      padding: '12px 30px 10px 30px',
      background: '#2F2F2F',
      borderRadius: '5px',
      // outline: state.isFocused ? 'none' : 'none',
      border: 'none',
      boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.35)',
      textShadow: '0 0 12px rgba(0, 0, 0, 0.65)',
      borderBottom: '4px solid white',
      fontWeight: '400',
      transition: 'all 0.2s ease-out',
      cursor: 'text',
      ':hover': {
         ...styles[':hover'],
         borderBottomColor: '#FFA654',
      },
      // borderBottomColor: state.isFocused ? '#90C795' : 'white',
      ':active': {
         ...styles[':active'],
         borderBottomColor: '#DA8181',
      },
   }),
   valueContainer: (styles) => ({
      ...styles,
      padding: '0',
      fontSize: '20px',
      gap: '5px',
   }),
   placeholder: (styles) => ({
      ...styles,
      color: 'white',
      opacity: 0.65,
      padding: 0,
      margin: 0,
   }),
   input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      color: 'white',
   }),
   menu: (styles) => ({
      ...styles,
      background: '#2F2F2F',
      borderRadius: '5px',
      color: 'white',
   }),
   option: (styles) => ({
      ...styles,
      background: '#2F2F2F',
      borderRadius: '5px',
      color: 'white',
      cursor: 'pointer',
      ':hover': {
         ...styles[':hover'],
         color: '#2F2F2F',
         background: 'white',
      },
   }),
   singleValue: (styles) => ({
      ...styles,

      color: 'white',
   }),

   multiValue: (styles) => ({
      ...styles,
      background: '#90C795',
      borderRadius: '999px',
      color: 'white',
   }),
   multiValueLabel: (styles) => ({
      ...styles,
      color: 'white',
      padding: 0,
      margin: '3px 12px',
      cursor: 'pointer',
   }),
   multiValueRemove: (styles) => ({
      ...styles,
      color: '#90C795',
      cursor: 'pointer',
      background: 'white',
      borderRadius: '999px',
      opacity: '0.8',

      ':hover': {
         ...styles[':hover'],
         opacity: 1,
         color: '#90C795',
         background: 'white',
      },
   }),
   clearIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer',
      color: 'white',
      opacity: 0.7,

      ':hover': {
         ...styles[':hover'],
         opacity: 1,
         color: 'white',
      },
   }),
   dropdownIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer',
      color: 'white',
      opacity: 0.7,

      ':hover': {
         ...styles[':hover'],
         opacity: 1,
         color: 'white',
      },
   }),
};

export function MySelect<
   TFieldValues extends FieldValues,
   TName extends FieldPath<TFieldValues>,
>({ placeholder, isMulti, field, options }: Props<TFieldValues, TName>) {
   return (
      <Select
         styles={SelectStyles}
         placeholder={placeholder}
         isMulti={isMulti}
         {...field}
         options={options}
         value={field.value}
         onChange={(newValue) => {
            field.onChange(newValue);
         }}
      />
   );
}
