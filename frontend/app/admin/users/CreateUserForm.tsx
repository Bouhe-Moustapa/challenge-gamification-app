'use client'

import { useActionState } from "react"
import { createUser } from "@/app/lib/admin-actions"
import type { Team } from "@prisma/client"

const initialState = {
  message: '',
  errors: {} as Record<string, string[]>
}

export function CreateUserForm({ teams }: { teams: Team[] }) {
  const [state, formAction, isPending] = useActionState(createUser, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nom complet</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          required 
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
        />
        {state?.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          required 
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
        />
        {state?.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">Mot de passe</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          required 
          minLength={6}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
        />
        {state?.errors?.password && <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-slate-700">Rôle</label>
        <select 
          name="role" 
          id="role" 
          required
          defaultValue="USER"
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
        >
          <option value="USER">Utilisateur</option>
          <option value="ADMIN">Administrateur</option>
          <option value="JURY">Jury</option>
        </select>
        {state?.errors?.role && <p className="text-red-500 text-xs mt-1">{state.errors.role[0]}</p>}
      </div>

      <div>
        <label htmlFor="teamId" className="block text-sm font-medium text-slate-700">Équipe (optionnel)</label>
        <select 
          name="teamId" 
          id="teamId"
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
        >
          <option value="">Aucune équipe</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <input 
          type="checkbox" 
          name="isTeamCaptain" 
          id="isTeamCaptain"
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isTeamCaptain" className="ml-2 block text-sm text-slate-700">
          Capitaine d&apos;équipe
        </label>
      </div>
      
      {state?.message && (
        <div className={`p-2 text-sm rounded ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {state.message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isPending ? 'Création...' : "Créer l'utilisateur"}
      </button>
    </form>
  )
}
