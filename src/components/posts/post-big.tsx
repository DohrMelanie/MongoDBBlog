import { BlogPostDto } from "@/models/dtos";
import Markdown from "react-markdown";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
    inline?: boolean;
    node?: any;
}

export default function PostBig({ post }: { post: BlogPostDto }) {
    return (
        <div className="flex flex-col gap-4 text-secondary-700 w-1/2 h-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-center">{post.title}</h1>
                <p className="text-sm italic text-secondary-500 text-center">{post.description}</p>
            </div>
            <div className="flex flex-col gap-2 text-secondary-900">
                <div className="markdown-content h-full p-4">
                    <Markdown
                        components={{
                            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-2" {...props} />,
                            p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                            li: ({node, ...props}) => <li className="mb-2" {...props} />,
                            code: ({node, inline, ...props}: CodeProps) => 
                                inline ? 
                                    <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props} /> :
                                    <code className="block bg-gray-100 dark:bg-gray-800 rounded p-4 mb-4 overflow-x-auto" {...props} />,
                            pre: ({node, ...props}) => <pre className="mb-4" {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic mb-4" {...props} />,
                            a: ({node, ...props}) => <a className="text-blue-500 hover:underline" {...props} />,
                            img: ({node, ...props}) => <img className="max-w-full h-auto rounded-lg mb-4" {...props} />,
                            table: ({node, ...props}) => <table className="w-full border-collapse mb-4" {...props} />,
                            th: ({node, ...props}) => <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800" {...props} />,
                            td: ({node, ...props}) => <td className="border border-gray-300 dark:border-gray-600 p-2" {...props} />
                        }}
                    >
                        {post.content}
                    </Markdown>
                </div>
            </div>
        </div>
    )
}