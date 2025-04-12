"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"
import Nav from "../ui/flowbite/nav/nav";
import Section from "../ui/flowbite/nav/section";
import Element from "../ui/flowbite/nav/element";
import LogoElement from "../ui/flowbite/nav/logo-element";
import Logo from "../icons/Logo";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "../ui/flowbite/spinner";
import Profile from "../ui/flowbite/nav/profile";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ping = async () => {
      const res = await fetch("/api/auth/verify");
      if (res.ok) {
        setIsLoggedIn(true);
      }

      setIsLoading(false);
    };

    ping();
  }, []);

  const pathname = usePathname();
  
  return (
    <Nav className="justify-between fixed top-0 left-0 right-0 z-50 h-20" childrenClassName="w-full">
      <LogoElement className="flex-1" href="/" svg={<Logo width={50} height={50} className="rounded-sm" />} text="Rich Money Blogs" />
      <Section className="justify-center flex-1">
        <Element>
          <Link href="/">Feed</Link>
        </Element>
        <Element>
          <Link href="/profiles">Profiles</Link>
        </Element>
        <Element>
          <Link href="/search">Search</Link>
        </Element>
      </Section>
      {isLoading ? (
        <Section className="justify-end flex-1">
          <Element>
            <Spinner />
          </Element>
        </Section>
      ) : isLoggedIn ? (
        <Section className="justify-end flex-1">
          <Profile />
        </Section>
      ) : (
        <Section className="justify-end flex-1">
          <Element>
            <Link href="/signup">Sign Up</Link>
          </Element>
          <Element>
            <Link href="/auth">Login</Link>
          </Element>
        </Section>
      )}
    </Nav>
  );
}