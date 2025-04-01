"use client";

import Button from "@/components/ui/flowbite/form/button";
import Form from "@/components/ui/flowbite/form/form";
import Input from "@/components/ui/flowbite/form/input";
import Textarea from "@/components/ui/flowbite/form/text-area";
import Dropdown from "@/components/ui/flowbite/form/dropdown";
import Slider from "@/components/ui/flowbite/form/slider";
import { useState, useEffect } from "react";
import categoryManager from "@/utils/client/category-manager";
import blogManager from "@/utils/client/blog-manager";
import { useRouter } from "next/navigation";

export default function PostForm() {
    const [category, setCategory] = useState<string | null>(null);
    const [commentsAllowed, setCommentsAllowed] = useState<boolean>(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const router = useRouter();
    
    useEffect(() => {
        categoryManager.getCategories().then((categories) => {
            setCategories(categories);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        blogManager.createPost({
            title,
            description: content.substring(0, 255),
            category: category!,
            commentsAllowed,
            content
        }).then((post) => {
            router.push(`/posts/${post._id}`);
        });
    }

    return (
        <Form className="flex flex-col items-center justify-center gap-4 min-w-1/2" onSubmit={handleSubmit}>
            <Input label="Title" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="flex flex-row justify-evenly items-center gap-4 w-full max-sm:flex-col">
                <Dropdown label="Category" name="category" options={categories} onUpdate={setCategory} />
                <Slider label="Allow Comments" name="allowComments" min={0} max={1000} step={1} defaultValue={500} onChange={(val) => val > 500 ? setCommentsAllowed(true) : setCommentsAllowed(false)} truthColor={commentsAllowed} />
            </div>
            <Textarea name="content" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <Button type="submit">Create</Button>
        </Form>
    )
}