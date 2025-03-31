"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"
import Nav from "../ui/flowbite/nav/nav";
import Section from "../ui/flowbite/nav/section";
import Element from "../ui/flowbite/nav/element";
import LogoElement from "../ui/flowbite/nav/logo-element";
import Logo from "../icons/Logo";

export default function NavBar() {
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
      <Section>
        <Element>
          <Link href="/auth">Login</Link>
        </Element>
        <Element className="text-primary-500">
          <Link href="/signup">Sign Up</Link>
        </Element>
      </Section>
    </Nav>
  );
}