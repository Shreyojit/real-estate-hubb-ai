import React from 'react';

const TextInput = ({ register, name, placeholder, required }) => {
    return (
        <div>
            <input
                {...register(name, { required })}
                placeholder={placeholder}
                type="text"
            />
        </div>
    );
};

export default TextInput;
