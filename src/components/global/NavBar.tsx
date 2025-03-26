"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import Logo from "@/components/icons/Logo";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <Navbar>
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
        <NavbarItem>
          <Link color="foreground" href="#">
            Search
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}