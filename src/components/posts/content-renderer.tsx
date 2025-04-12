import { BlogPostDto } from "@/models/dtos";

interface ContentRendererProps {
    content: BlogPostDto['content'];
}

export default function ContentRenderer({ content }: ContentRendererProps) {
    return (
        <div className="space-y-4">
            <div className="whitespace-pre-wrap">{content.text}</div>
            {content.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.images.map((image, index) => (
                        <img 
                            key={index}
                            src={`data:image/jpeg;base64,${image}`} 
                            alt={`Blog image ${index + 1}`}
                            className="max-w-full h-auto rounded-lg"
                        />
                    ))}
                </div>
            )}
        </div>
    );
} 