import { useState } from "react";

export default function FormModal({children, title, svg, className}: {children: React.ReactNode, title: string, svg: React.ReactNode, className?: string}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button onClick={toggleModal} className={`block p-2 text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-fit aspect-square text-right dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${className}`} type="button">
                {svg}
            </button>

            {isOpen && (
                <div id="authentication-modal" tabIndex={-1} aria-hidden={!isOpen} className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50" onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 md:p-5">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            {children}
                        </div>
                        <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}