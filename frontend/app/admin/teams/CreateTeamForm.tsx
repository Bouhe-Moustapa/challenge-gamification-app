'use client'

import { useActionState } from "react"
import { createTeam } from "@/app/lib/admin-actions"

const initialState = {
  message: '',
  errors: {} as Record<string, string[]>
}

export function CreateTeamForm() {
  const [state, formAction, isPending] = useActionState(createTeam, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nom de l&apos;équipe</label>
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
        <label htmlFor="slug" className="block text-sm font-medium text-slate-700">Identifiant (Slug)</label>
        <input 
          type="text" 
          name="slug" 
          id="slug" 
          required 
          placeholder="ex: team-rocket" 
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
        />
        <p className="mt-1 text-xs text-slate-500">Utilisé dans l&apos;URL (minuscules, tirets).</p>
        {state?.errors?.slug && <p className="text-red-500 text-xs mt-1">{state.errors.slug[0]}</p>}
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-slate-700">Ville</label>
        <input 
          type="text" 
          name="city" 
          id="city" 
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" 
        />
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
        {isPending ? 'Création...' : "Créer l'équipe"}
      </button>
    </form>
  )
}
