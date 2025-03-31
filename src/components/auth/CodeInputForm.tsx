"use client";

import Button from "../ui/flowbite/form/button";
import Form from "../ui/flowbite/form/form";
import PinCode from "../ui/flowbite/form/pin-code";
import { useRouter } from "next/navigation";

export default function CodeInputForm() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handleCodeSubmit = (code: string) => {
        const username = localStorage.getItem("username");

        fetch("/api/auth/verify", {
            method: "POST",
            body: JSON.stringify({ code, username })
        }).then((res) => {
            if (res.ok) {
                router.push("/");
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <PinCode onComplete={handleCodeSubmit} />
            <Button type="submit">Verify</Button>
        </Form>
    );
}