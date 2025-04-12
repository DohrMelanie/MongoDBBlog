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
import { BlogPostDto } from "@/models/dtos";
import { BlogEntryCreationData } from "@/models/blog";
import { fileToBase64 } from "@/utils/image-utils";

interface PostFormProps {
    initialData?: BlogPostDto;
    postId?: string;
    categories: string[];
}

export default function PostForm({ initialData, postId, categories }: PostFormProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BlogPostDto>(initialData || {} as BlogPostDto);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await blogManager.updatePost(postId!, formData);
            
            router.push("/feed");
        } catch (error) {
            console.error("Error saving post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        try {
            const base64Images = await Promise.all(
                Array.from(files).map(fileToBase64)
            );

            setFormData(prev => ({
                ...prev,
                content: {
                    ...prev.content,
                    images: [...prev.content.images, ...base64Images]
                }
            }));
        } catch (error) {
            console.error("Error converting images:", error);
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                images: prev.content.images.filter((_, i) => i !== index)
            }
        }));
    };

    return (
        <Form className="flex flex-col items-center justify-center gap-4 min-w-1/2" onSubmit={handleSubmit}>
            <Input 
                label="Title" 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} 
            />

            <Textarea 
                name="content" 
                placeholder="Content" 
                value={formData.content.text} 
                onChange={(e) => setFormData(prev => ({
                    ...prev,
                    content: { ...prev.content, text: e.target.value }
                }))} 
            />

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
                    {formData.content.images.map((image, index) => (
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

            <div className="flex flex-row justify-evenly items-center gap-4 w-full max-sm:flex-col">
                <Dropdown 
                    label="Category" 
                    name="category" 
                    options={categories} 
                    value={formData.category} 
                    onUpdate={(value) => setFormData(prev => ({ ...prev, category: value }))} 
                />
                <Slider 
                    label="Allow Comments" 
                    name="allowComments" 
                    min={0} 
                    max={1000} 
                    step={1} 
                    defaultValue={formData.commentsAllowed ? 1000 : 0} 
                    onChange={(val) => setFormData(prev => ({ ...prev, commentsAllowed: val > 500 }))} 
                    truthColor={formData.commentsAllowed} 
                />
            </div>

            <Button type="submit">
                {isSubmitting ? "Saving..." : (postId ? "Update Post" : "Create Post")}
            </Button>
        </Form>
    );
}