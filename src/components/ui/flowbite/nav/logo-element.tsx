import { JSX } from "react";

export default function LogoElement({ href, svg, text, className }: { href: string, svg: JSX.Element, text: string, className?: string }) {
    return (
        <a href={href} className={`flex items-center space-x-3 rtl:space-x-reverse ${className}`}>
            {svg}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{text}</span>
        </a>
    )
}