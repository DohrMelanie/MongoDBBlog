export default function Nav({ children, className, childrenClassName }: { children: React.ReactNode, className?: string, childrenClassName?: string }) {
    return (
        <nav className={`bg-white border-gray-200 dark:bg-gray-900 ${className}`}>
            <div className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ${childrenClassName}`}>
                {children}
            </div>
        </nav>
    )
}