import React from 'react';

const Checkbox = ({ register, name, label }) => {
    return (
        <div>
            <label>
                <input type="checkbox" {...register(name)} />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
