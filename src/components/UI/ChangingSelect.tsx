import { IOption } from 'models/Select.types';
import React, { CSSProperties, useState } from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
interface Props {
    defaultOptions: IOption[];
    // value: IOption;
    handleChange: (newValue: MultiValue<IOption>) => void;
}

export const ChangingSelect: React.FC<Props> = ({defaultOptions, handleChange}) => { 
    const [options, setOptions] = useState(defaultOptions);
 
    // const handleChange = (newValue: SingleValue<IOption>) => {
    // //   setSelectedOption(selectedOption);
    //   console.log(`Option selected:`, newValue);
    // };
   
    return (
        <div>
            
        </div>
        // <CreatableSelect isMulti options={options} onChange={handleChange}/>
    )
}