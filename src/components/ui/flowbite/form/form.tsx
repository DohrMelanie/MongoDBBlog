export default function Form({ children, onSubmit, error, className }: { children: React.ReactNode, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, error?: string, className?: string }) {
    return (
        <form onSubmit={onSubmit} className={`max-w-md mx-auto ${className}`}>
            {children}
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}