// =========================================================
// File: src/components/ui/tab-nav.tsx
// File: src/components/entity/EntityTabs.tsx
// File: src/routes/entity.tsx
// (ALL IN ONE SNIPPET – SPLIT INTO FILES IN YOUR PROJECT)
// =========================================================

/* ============================================
 * src/components/ui/tab-nav.tsx
 * ========================================== */

"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cn } from "@/lib/utils"

export const TabNav = NavigationMenuPrimitive.Root

export const TabNavList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabNavList.displayName = NavigationMenuPrimitive.List.displayName

type TabNavLinkProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & {
    active?: boolean
  }

export const TabNavLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  TabNavLinkProps
>(({ className, active, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    data-active={active ? "" : undefined}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-background data-[active]:text-foreground data-[active]:shadow",
      className
    )}
    {...props}
  />
))
TabNavLink.displayName = NavigationMenuPrimitive.Link.displayName

/* ============================================
 * src/components/entity/EntityTabs.tsx
 * ========================================== */

"use client"

import * as React from "react"
import { useMatchRoute, useRouter } from "@tanstack/react-router"
import { TabNav, TabNavList, TabNavLink } from "@/components/ui/tab-nav"

type EntityTab = {
  label: string
  to: string       // where we navigate when clicking the tab
  matchTo?: string // what we use for matching (can be same as `to`)
}

/**
 * With file-based routing, routeIds are usually:
 * - "/entity"
 * - "/entity/users"
 * - "/entity/users/$userId"
 *
 * Using `fuzzy: true` on "/entity/users" will match "/entity/users/123", etc.
 */
const ENTITY_TABS: EntityTab[] = [
  {
    label: "Overview",
    to: "/entity",
    matchTo: "/entity",
  },
  {
    label: "Users",
    to: "/entity/users",
    matchTo: "/entity/users",
  },
  {
    label: "Settings",
    to: "/entity/settings",
    matchTo: "/entity/settings",
  },
]

export function EntityTabs() {
  const router = useRouter()
  const matchRoute = useMatchRoute()

  const isActive = (tab: EntityTab) => {
    const target = tab.matchTo ?? tab.to
    return !!matchRoute({
      to: target as any, // can be routeId or path; with file-based they’re usually the same
      fuzzy: true,       // <-- keeps tab active on nested routes like /entity/users/123
    })
  }

  const activeTab = ENTITY_TABS.find((t) => isActive(t)) ?? ENTITY_TABS[0]

  const handleSelectChange = (value: string) => {
    const tab = ENTITY_TABS.find((t) => t.to === value)
    if (tab) {
      router.navigate({ to: tab.to as any })
    }
  }

  return (
    <div className="w-full">
      {/* Desktop / tablet: Radix NavigationMenu as tab nav */}
      <div className="hidden md:block">
        <TabNav>
          <TabNavList className="grid w-full grid-cols-3">
            {ENTITY_TABS.map((tab) => (
              <TabNavLink
                key={tab.to}
                href={tab.to} // for cmd+click / open in new tab
                active={isActive(tab)}
                onClick={(e) => {
                  e.preventDefault()
                  router.navigate({ to: tab.to as any })
                }}
              >
                {tab.label}
              </TabNavLink>
            ))}
          </TabNavList>
        </TabNav>
      </div>

      {/* Mobile: select dropdown using same matching logic */}
      <div className="md:hidden">
        <label className="mb-1 block text-sm font-medium">
          Entity navigation
        </label>
        <select
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={activeTab?.to}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          {ENTITY_TABS.map((tab) => (
            <option key={tab.to} value={tab.to}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

/* ============================================
 * src/routes/entity.tsx  (layout route for /entity/*)
 * ========================================== */

import { createFileRoute, Outlet } from "@tanstack/react-router"
import { EntityTabs } from "@/components/entity/EntityTabs"

export const Route = createFileRoute("/entity")({
  component: EntityLayout,
})

function EntityLayout() {
  return (
    <div className="space-y-4">
      <EntityTabs />
      <Outlet />
    </div>
  )
}