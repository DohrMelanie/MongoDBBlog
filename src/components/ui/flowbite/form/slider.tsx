"use client";

import { useState } from "react";

export default function Slider({ 
    label, 
    name, 
    min = 0, 
    max = 5, 
    step = 0.5,
    className,
    defaultValue,
    onChange,
    truthColor
}: { 
    label: string, 
    name: string, 
    min?: number, 
    max?: number, 
    step?: number,
    defaultValue?: number,
    onChange?: (value: number) => void,
    className?: string,
    truthColor?: boolean,
}) {
    const [value, setValue] = useState(defaultValue || (min + max) / 2);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type="range" 
                min={min} 
                max={max} 
                value={value} 
                step={step} 
                onChange={handleChange}
                style={{ background: (truthColor??false) ? "green" : "red" }}
                className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 ${className}`}
            />
        </div>
    );
}