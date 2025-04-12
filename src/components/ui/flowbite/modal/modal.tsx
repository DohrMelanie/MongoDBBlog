export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    return (
        <div id="authentication-modal" tabIndex={-1} aria-hidden={true} className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50" onClick={onClose} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 md:p-5">
                    {children}
                </div>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    &times;
                </button>
            </div>
        </div>
    )
}