'use client';

import Spinner from "@/components/ui/flowbite/spinner";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      const ping = async () => {
          const res = await fetch("/api/auth/verify");
          if (res.ok) {
              setIsLoggedIn(true);
          }
          setIsLoading(false);
      }
      ping();
  }, []);

  if (isLoading) {
      return <Spinner />;
  }
  if (isLoggedIn) {
    redirect('/feed');
  } else {
    return <div className="flex flex-row gap-2 justify-center items-center mb-8">
      In order to view your feed, you need to be logged in.
      <Link href="/auth" className="text-blue-500">Login</Link>
  </div>;
  }
}