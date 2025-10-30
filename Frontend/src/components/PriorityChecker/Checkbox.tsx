import React, { ChangeEvent } from 'react';
import { CHECKBOX_OPTIONS, COMMON_TEXT } from 'src/helper/constants';
import { ICheckbox } from './ICheckbox';
import "./Checkbox.css"

const Checkbox: React.FC<ICheckbox> = ({ onChange, selected }) => {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            onChange(value);
        } else {
            onChange('');
        }
    };

    return (
        <div className='mainContainerCheckbox'>
            <label className="labelStyle">{COMMON_TEXT.INPUT_CHECKBOX_LABEL}</label>
            <div className='checkboxContainer'>
                {CHECKBOX_OPTIONS?.map((option) => (
                    <label key={option} className='label'>
                        <input
                            type="checkbox"
                            value={option}
                            checked={selected === option}
                            onChange={handleCheckboxChange}
                        />
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Checkbox;
