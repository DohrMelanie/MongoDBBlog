export default function Form({ children }: { children: React.ReactNode }) {
    return (
        <form className="max-w-md mx-auto">
            {children}
        </form>
    )
}