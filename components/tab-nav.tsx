"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"

export interface TabNavItem {
  title: string
  href: string
  disabled?: boolean
}

interface TabNavProps {
  items: TabNavItem[]
  className?: string
}

export function TabNav({ items, className }: TabNavProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = React.useState(false)

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  if (isMobile) {
    return (
      <div className={cn("relative", className)}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50">
            <nav className="flex flex-col p-2 gap-1">
              {items.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      active && "bg-secondary text-secondary-foreground",
                      item.disabled && "pointer-events-none opacity-50",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    )
  }

  return (
    <NavigationMenu.Root className={cn("relative", className)}>
      <NavigationMenu.List className="flex items-center gap-1 p-1 bg-muted rounded-lg">
        {items.map((item) => {
          const active = isActive(item.href)
          return (
            <NavigationMenu.Item key={item.href}>
              <NavigationMenu.Link asChild active={active}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active && "bg-background text-foreground shadow-sm",
                    item.disabled && "pointer-events-none opacity-50",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.title}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          )
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
