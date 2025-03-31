"use client";

import { useState } from "react";
import Button from "../ui/flowbite/form/button";
import Form from "../ui/flowbite/form/form";
import Input from "../ui/flowbite/form/input";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ username, password })
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem("username", username);
        router.push("/auth/verify");
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Input label="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input type="password" label="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">Login</Button>
    </Form>
  );
}