import { useRef, useState } from 'react';

interface PinCodeProps {
    length?: number;
    onChange?: (value: string) => void;
    onComplete: (value: string) => void;
}

export default function PinCode({ length = 6, onChange, onComplete }: PinCodeProps) {
    const [values, setValues] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        const completeValue = newValues.join('');
        onChange?.(completeValue);

        if (index === length - 1 && newValues[index] !== '') {
            onComplete(newValues.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        const digits = pasteData.replace(/\D/g, '').slice(0, length);
        
        const newValues = Array(length).fill('');
        digits.split('').forEach((digit, index) => {
            if (index < length) {
                newValues[index] = digit;
            }
        });
        
        setValues(newValues);
        onChange?.(newValues.join(''));
        
        const nextEmptyIndex = newValues.findIndex(v => !v);
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus();
        } else {
            inputRefs.current[length - 1]?.focus();
            onComplete(newValues.join(''));
        }
    };

    return (
        <div className="flex mb-2 justify-center items-center space-x-2 rtl:space-x-reverse">
            {Array(length).fill(null).map((_, index) => (
                <div key={index}>
                    <label htmlFor={`code-${index + 1}`} className="sr-only">
                        {`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} code`}
                    </label>
                    <input
                        ref={el => { inputRefs.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        id={`code-${index + 1}`}
                        value={values[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                    />
                </div>
            ))}
        </div>
    );
}