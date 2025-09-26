"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Palette,
    Video,
    Calendar,
    Plane,
    Mountain
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Sidebar() {
    const pathname = usePathname()

    const routes = [
        {
            label: "Dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
            href: "/dashboard",
        },
        {
            label: "Brands",
            icon: <Palette className="h-5 w-5" />,
            href: "/dashboard/brands",
        },
        {
            label: "Videos",
            icon: <Video className="h-5 w-5" />,
            href: "/dashboard/videos",
        },
        {
            label: "Schedule",
            icon: <Calendar className="h-5 w-5" />,
            href: "/dashboard/schedule",
        },
    ]

    return (
        <div className="hidden border-r bg-background md:flex md:w-64 md:flex-col">
            <div className="flex flex-col space-y-4 py-4">
                <div className="px-4 py-2">
                    <div className="mt-3 flex items-center gap-3 px-2">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                <Plane className="h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Aerostatic Productions</p>
                            <p className="text-xs text-muted-foreground">Content Dashboard</p>
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    pathname === route.href
                                        ? "bg-accent text-accent-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                {route.icon}
                                {route.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}