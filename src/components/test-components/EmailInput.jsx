import React from 'react';

const EmailInput = ({ register, name, required }) => {
    return (
        <div>
            <input
                {...register(name, { required })}
                placeholder="Email"
                type="email"
            />
        </div>
    );
};

export default EmailInput;
