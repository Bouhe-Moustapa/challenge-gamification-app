import { Settings as SettingsIcon, Database, Shield, Bell } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Paramètres</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Base de données</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Configuration de la connexion à la base de données PostgreSQL (Neon).
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Provider:</span>
              <span className="font-mono text-slate-700">PostgreSQL</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Status:</span>
              <span className="text-green-600 font-semibold">✓ Connecté</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-slate-900">Sécurité</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Paramètres d&apos;authentification et de sécurité.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Auth Provider:</span>
              <span className="font-mono text-slate-700">NextAuth.js</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Session Strategy:</span>
              <span className="font-mono text-slate-700">JWT</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Configuration des notifications et alertes système.
          </p>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm text-slate-700">Notifications par email</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm text-slate-700">Alertes de soumission</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-700">Rapports hebdomadaires</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="w-6 h-6 text-slate-600" />
            <h2 className="text-xl font-bold text-slate-900">Général</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Paramètres généraux de l&apos;application.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nom de l&apos;événement
              </label>
              <input 
                type="text" 
                defaultValue="Nuit Arena 2024"
                className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fuseau horaire
              </label>
              <select className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2">
                <option>Europe/Paris</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
