interface ChatBubbleProps {
    avatarSrc?: string;
    avatarAlt?: string;
    username: string;
    timestamp: string;
    message: string;
    status?: string;
    maxWidth?: string;
}

export default function ChatBubble({
    avatarSrc = "/docs/images/people/profile-picture-3.jpg",
    avatarAlt = "User avatar",
    username,
    timestamp,
    message,
    status,
    maxWidth = "320px"
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
                {status && <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{status}</span>}
            </div>
        </div>
    )
}