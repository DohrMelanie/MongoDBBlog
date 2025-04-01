import Markdown from "react-markdown";

export default function Card({ title, description, image }: { title: string, description: string, image: string }) {
    return (
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <Markdown>{description}</Markdown>
        </a>
    )
}