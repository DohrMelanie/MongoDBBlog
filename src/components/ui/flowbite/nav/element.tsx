export default function Element({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <li className={`flex items-center space-x-3 rtl:space-x-reverse ${className}`}>
            {children}
        </li>
    )
}