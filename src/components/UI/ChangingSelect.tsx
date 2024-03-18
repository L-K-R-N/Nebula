import React from 'react';
import { MultiValue } from 'react-select';
import { IOption } from '@/models/Select.types';

interface Props {
   defaultOptions: IOption[];
   handleChange: (newValue: MultiValue<IOption>) => void;
}

export const ChangingSelect: React.FC<Props> = () => {
   return <div />;
};
