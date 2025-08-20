'use client';

import { usePathname } from 'next/navigation';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { Link } from "@heroui/link";

export default function Nav() {
    const pathname = usePathname()
    console.log(pathname)

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">Theme Tracker</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link aria-current={pathname == "/" ? "page" : undefined} color={pathname != "/" ? "foreground" : undefined} href="/">
                        Home
                    </Link>
                </NavbarItem>
                
                <NavbarItem>
                    <Link aria-current={pathname == "/dashboard" ? "page" : undefined} color={pathname != "/dashboard" ? "foreground" : undefined} href="/dashboard" >
                        Dashboard
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link aria-current={pathname == "/manage-theme" ? "page" : undefined} color={pathname != "/manage-theme" ? "foreground" : undefined}  href="/manage-theme">
                        Manage Themes
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link aria-current={pathname == "/manage-habits" ? "page" : undefined} color={pathname != "/manage-habits" ? "foreground" : undefined}  href="/manage-habits">
                        Manage Habits
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link aria-current={pathname == "/history" ? "page" : undefined} color={pathname != "/history" ? "foreground" : undefined}  href="/history">
                        History
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="/api/auth/signin">Login/Signup</Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};