import React from 'react';

const PasswordInput = ({ register, name, required }) => {
    return (
        <div>
            <input
                {...register(name, { required })}
                placeholder="Password"
                type="password"
            />
        </div>
    );
};

export default PasswordInput;
