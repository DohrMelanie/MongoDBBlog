"use client";

import Button from "@/components/ui/flowbite/form/button";
import Form from "@/components/ui/flowbite/form/form";
import Input from "@/components/ui/flowbite/form/input";
import Textarea from "@/components/ui/flowbite/form/text-area";
import Dropdown from "@/components/ui/flowbite/form/dropdown";
import Slider from "@/components/ui/flowbite/form/slider";
import { useState, useEffect, useRef } from "react";
import categoryManager from "@/utils/client/category-manager";
import blogManager from "@/utils/client/blog-manager";
import { useRouter } from "next/navigation";
import { fileToBase64 } from "@/utils/image-utils";

export default function PostForm() {
    const [category, setCategory] = useState<string | null>(null);
    const [commentsAllowed, setCommentsAllowed] = useState<boolean>(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<{ text: string, images: string[] }>({
        text: "",
        images: []
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    
    useEffect(() => {
        categoryManager.getCategories().then((categories) => {
            setCategories(categories);
        });
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        try {
            const base64Images = await Promise.all(
                Array.from(files).map(fileToBase64)
            );

            setContent(prev => ({
                ...prev,
                images: [...prev.images, ...base64Images]
            }));
        } catch (error) {
            console.error("Error converting images:", error);
        }
    };

    const removeImage = (index: number) => {
        setContent(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        blogManager.createPost({
            title,
            description: content.text.substring(0, 255),
            category: category!,
            commentsAllowed,
            content
        }).then((post) => {
            router.push(`/profile/posts`); 
        });
    }

    return (
        <Form className="flex flex-col items-center justify-center gap-4 min-w-1/2" onSubmit={handleSubmit}>
            <Input label="Title" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="flex flex-row justify-evenly items-center gap-4 w-full max-sm:flex-col">
                <Dropdown label="Category" name="category" options={categories} onUpdate={setCategory} value="" />
                <Slider label="Allow Comments" name="allowComments" min={0} max={1000} step={1} defaultValue={500} onChange={(val) => val > 500 ? setCommentsAllowed(true) : setCommentsAllowed(false)} truthColor={commentsAllowed} />
            </div>
            <Textarea name="content" placeholder="Content" value={content.text} onChange={(e) => setContent(prev => ({ ...prev, text: e.target.value }))} />
            
            <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary-50 file:text-primary-700
                        hover:file:bg-primary-100"
                />
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {content.images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={`data:image/jpeg;base64,${image}`}
                                alt={`Uploaded image ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Button type="submit">Create Post</Button>
        </Form>
    )
}