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
        setIsLoading(false);
      }
    };

    ping();
  }, []);

  const pathname = usePathname();
  
  return (
    <Nav>
      <LogoElement href="/" svg={<Logo width={50} height={50} className="rounded-sm" />} text="Rich Money Blogs" />
      <Section>
        <Element>
          <Link href="/">Feed</Link>
        </Element>
        <Element>
          <Link href="/trending">Trending</Link>
        </Element>
        <Element>
          <Link href="/about">About</Link>
        </Element>
      </Section>
      {isLoading ? (
        <Section>
          <Element>
            <Spinner />
          </Element>
        </Section>
      ) : isLoggedIn ? (
        <Section>
          <Profile />
        </Section>
      ) : (
        <Section>
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