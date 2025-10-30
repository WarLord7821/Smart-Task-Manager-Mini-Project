import React from 'react';
import { IDateInput } from './IDateProps';
import { COMMON_TEXT } from 'src/helper/constants';
import "./DateInput.css"

const DateInput: React.FC<IDateInput> = React.memo(({ onDateChange, selected }) => {
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = event.target.value;
        onDateChange(dateValue)
    };

    return (
        <div className="inputContainer">
            <label className="labelStyle" htmlFor="dateInput">{COMMON_TEXT.INPUT_DATE_LABEL}</label>
            <input
                type="date"
                id="dateInput"
                value={selected}
                onChange={handleDateChange}
                className='input'
                min={`${JSON.stringify(new Date()).slice(1, 11)}`}
            />
        </div>
    );
});

export default DateInput;
