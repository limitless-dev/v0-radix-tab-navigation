"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cn } from "@/lib/utils"

const TabNav = NavigationMenuPrimitive.Root

type TabNavListProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.List
>

const TabNavList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  TabNavListProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      // full-width horizontal strip
      "flex h-9 w-full items-center gap-1 overflow-x-auto rounded-lg bg-muted p-1 text-muted-foreground",
      // keep everything on one line, scroll instead of wrap
      "flex-nowrap",
      // optional: hide ugly scrollbar (works in WebKit)
      "[&::-webkit-scrollbar]:hidden",
      "[-ms-overflow-style:none] [scrollbar-width:none]",
      className
    )}
    {...props}
  />
))
TabNavList.displayName = NavigationMenuPrimitive.List.displayName

type TabNavLinkProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Link
> & {
  active?: boolean
}

const TabNavLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  TabNavLinkProps
>(({ className, active, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    // data-active drives your Tailwind data-[active]:... classes
    data-active={active ? "" : undefined}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium",
      "ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      // don't let tabs shrink smaller than their content
      "flex-shrink-0",
      // active state
      "data-[active]:bg-background data-[active]:text-foreground data-[active]:shadow",
      className
    )}
    {...props}
  />
))
TabNavLink.displayName = NavigationMenuPrimitive.Link.displayName

export { TabNav, TabNavList, TabNavLink }