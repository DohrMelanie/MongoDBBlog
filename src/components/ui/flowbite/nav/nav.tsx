export default function Nav({ children }: { children: React.ReactNode }) {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {children}
            </div>
        </nav>
    )
}