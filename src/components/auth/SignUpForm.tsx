"use client";

import { useRouter } from "next/navigation";
import Form from "../ui/flowbite/form";
import Input from "../ui/flowbite/input";
import Button from "../ui/flowbite/button";

export default function SignUpForm() {
    const router = useRouter();

    return (
        <Form>
            <Input label="Username" name="username" />
            <Input label="Email" name="email" />
            <Input label="Password" name="password" />
            <Button type="submit">Sign Up</Button>
        </Form>
    );
}