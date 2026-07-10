import { createDriver } from "@/app/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewDriverPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/drivers" className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-950 transition-colors">
          <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Nový řidič</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Přidejte nového řidiče do evidence.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form action={createDriver} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Jméno</label>
              <input type="text" name="firstName" id="firstName" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Příjmení</label>
              <input type="text" name="lastName" id="lastName" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="licenseNo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Číslo řidičáku</label>
              <input type="text" name="licenseNo" id="licenseNo" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Stav</label>
              <select name="status" id="status" className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <option value="ACTIVE">Aktivní</option>
                <option value="INACTIVE">Neaktivní</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email (volitelné)</label>
              <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Telefon (volitelné)</label>
              <input type="text" name="phone" id="phone" className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors cursor-pointer">
              Uložit řidiče
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
