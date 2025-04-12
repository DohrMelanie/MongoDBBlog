interface ChatBubbleProps {
    avatarSrc?: string;
    avatarAlt?: string;
    username: string;
    timestamp: string;
    message: string;
    status?: string;
    maxWidth?: string;
    deleteAllowed?: boolean;
    editAllowed?: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
}

export default function ChatBubble({
    avatarSrc = "https://picsum.photos/200",
    avatarAlt = "User avatar",
    username,
    timestamp,
    message,
    maxWidth = "320px",
    deleteAllowed = false,
    editAllowed = false,
    onDelete,
    onEdit
}: ChatBubbleProps) {
    return (
        <div className="flex items-start gap-2.5">
            <img className="w-8 h-8 rounded-full" src={avatarSrc} alt={avatarAlt} />
            <div className={`flex flex-col w-full max-w-[${maxWidth}] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700`}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{username}</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{timestamp}</span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
                {deleteAllowed && <button className="text-sm hover:text-red-500 font-normal text-gray-500 dark:text-gray-400" onClick={onEdit}>Edit</button>}
                {deleteAllowed && <button className="text-sm hover:text-red-500 font-normal text-gray-500 dark:text-gray-400" onClick={onDelete}>Delete</button>}
            </div>
        </div>
    )
}