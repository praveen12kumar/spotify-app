import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

const Input = React.forwardRef(
    ({ type, placeholder, onChange, value, className, name, checkOnBlur }, ref) => {
        const localRef = useRef(null);

        const [isValid, setIsValid] = useState(true);
        const [text, setText] = useState("");

        useImperativeHandle(ref, () => ({
            ...localRef.current, // Spread all native properties of the input
            focus: () => localRef.current?.focus(),
            setInValid: () => setIsValid(false), // Add custom focus method
        }));

        useEffect(() => {
            setIsValid(true);
        }, [text]);

        // Wrapper function for handling `onChange`
        const handleChange = (e) => {
            setText(e.target.value); // Update internal state
            onChange(e); // Call the `onChange` function passed via props
        };

        return (
            <>
                <input
                    type={type}
                    placeholder={placeholder}
                    onChange={handleChange} // Use the wrapper function
                    value={value}
                    name={name}
                    className={`${className}`}
                    ref={localRef}
                    onBlur={checkOnBlur}
                />
                
                <p className=" text-red-600 text-xs">
                    {!isValid ? `${name} is invalid` : ""}
                </p>
            </>
        );
    }
);

Input.displayName = "Input";

export default Input;
