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
import { BlogPostDto } from "@/models/dtos";

export default function PostForm({ post }: { post: BlogPostDto }) {
    const [category, setCategory] = useState<string | null>(post.category);
    const [commentsAllowed, setCommentsAllowed] = useState<boolean>(post.commentsAllowed);
    const [categories, setCategories] = useState<string[]>([]);
    const [title, setTitle] = useState<string>(post.title);
    const [content, setContent] = useState<string>(post.content);
    const router = useRouter();

    console.log(post);
    
    useEffect(() => {
        categoryManager.getCategories().then((categories) => {
            setCategories(categories);
            setCategory(post.category);

            console.log(categories);
            console.log(post.category);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        blogManager.updatePost(post._id.toString(), title, content, category!, content.substring(0, 255), commentsAllowed).then((post) => {
            router.push(`/profile/posts`); 
        });
    }

    return (
        <Form className="flex flex-col items-center justify-center gap-4 min-w-1/2" onSubmit={handleSubmit}>
            <Input label="Title" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="flex flex-row justify-evenly items-center gap-4 w-full max-sm:flex-col">
                <Dropdown label="Category" name="category" options={categories} onUpdate={(value) => setCategory(value)} value={post.category} />
                <Slider label="Allow Comments" name="allowComments" min={0} max={1000} step={1} defaultValue={post.commentsAllowed ? 1000 : 1} onChange={(val) => setCommentsAllowed(val > 500)} truthColor={commentsAllowed} />
            </div>
            <Textarea name="content" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <Button type="submit">Update</Button>
        </Form>
    )
}