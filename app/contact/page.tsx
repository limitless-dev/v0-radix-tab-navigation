import { TabNav } from "@/components/tab-nav"

const navItems = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Tab Navigation Demo</h1>
          <TabNav items={navItems} />
        </div>

        <main className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            Get in touch with us. The tab navigation dynamically tracks your current location across all pages.
          </p>
        </main>
      </div>
    </div>
  )
}
