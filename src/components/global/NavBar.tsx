"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import Logo from "@/components/icons/Logo";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <Navbar className="bg-background-100 p-2">
      <NavbarBrand className="flex gap-2 cursor-pointer">
        <Logo width={50} height={50}/>
        <p className="font-bold text-inherit">Rich Money Blogs</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link color="foreground" href="/">
            Feed
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/trending/profiles"}>
          <Link color="foreground" href="/trending/profiles">
            Trending Profiles
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/search"}>
          <Link color="foreground" href="/search">
            Search
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}