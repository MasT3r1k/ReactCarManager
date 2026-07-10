"use client";

import { useState, useTransition } from "react";
import { updateDriver } from "@/app/api/driver";
import { Driver } from "@/lib/generated/prisma/client";

export default function DriverForm({ driver }: { driver: Driver }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateDriver(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
        <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
        </div>
        )}

        <input type="hidden" name="id" value={driver.id} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Křestní jméno</label>
            <input type="text" name="firstName" id="firstName" required defaultValue={driver.firstName} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
        </div>
        
        <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Příjmení</label>
            <input type="text" name="lastName" id="lastName" required defaultValue={driver.lastName} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
        </div>

        <div className="sm:col-span-2">
            <label htmlFor="licenseNo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Číslo řidičského průkazu</label>
            <input type="text" name="licenseNo" id="licenseNo" required defaultValue={driver.licenseNo} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">E-mail (volitelné)</label>
            <input type="email" name="email" id="email" defaultValue={driver.email || ""} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
        </div>

        <div>
            <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Telefon (volitelné)</label>
            <input type="tel" name="phone" id="phone" defaultValue={driver.phone || ""} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
        </div>

        <div className="sm:col-span-2">
            <label htmlFor="status" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Stav</label>
            <select name="status" id="status" defaultValue={driver.status} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
            <option value="ACTIVE">Aktivní</option>
            <option value="INACTIVE">Neaktivní</option>
            </select>
        </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
            {isPending ? "Ukládání..." : "Uložit změny"}
        </button>
        </div>
    </form>
    </>
  );
}
