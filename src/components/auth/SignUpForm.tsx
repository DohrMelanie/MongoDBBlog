"use client";

import { useRouter } from "next/navigation";
import Form from "../ui/flowbite/form/form";
import Input from "../ui/flowbite/form/input";
import Button from "../ui/flowbite/form/button";
import { useState } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "" || first_name === "" || last_name === "") {
      setError("Please fill in all fields");
      return;
    }
    setError("");

    const user = {
      username,
      email,
      name: {
        firstname: first_name,
        lastname: last_name
      },
      password
    }
    
    fetch("/api/auth", {
      method: "PUT",
      body: JSON.stringify(user)
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem("username", username);
        router.push("/auth/verify");
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit} error={error}>
      <Input label="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="First Name" name="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
      <Input label="Last Name" name="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
      <Input type="password" label="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">Sign Up</Button>
    </Form>
  );
}