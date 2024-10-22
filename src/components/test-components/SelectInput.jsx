import React from 'react';

const SelectInput = ({ register, name }) => {
    return (
        <div>
            <select {...register(name)}>
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>
    );
};

export default SelectInput;
