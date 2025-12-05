import { auth } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, Users, Trophy, Flag, Settings } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session?.user?.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white fixed h-full overflow-y-auto z-10">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-yellow-500">Nuit Arena Admin</h2>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink href="/admin" icon={<LayoutDashboard className="w-5 h-5" />}>
            Dashboard
          </NavLink>
          <NavLink href="/admin/users" icon={<Users className="w-5 h-5" />}>
            Utilisateurs
          </NavLink>
          <NavLink href="/admin/teams" icon={<Users className="w-5 h-5" />}>
            Équipes
          </NavLink>
          <NavLink href="/admin/challenges" icon={<Flag className="w-5 h-5" />}>
            Défis
          </NavLink>
          <NavLink href="/admin/badges" icon={<Trophy className="w-5 h-5" />}>
            Badges
          </NavLink>
          <NavLink href="/admin/settings" icon={<Settings className="w-5 h-5" />}>
            Paramètres
          </NavLink>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 text-slate-400">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
              <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}
