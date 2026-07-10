"use client";

import { useState, useTransition } from "react";
import { createVehicle } from "@/app/api/vehicle";

export default function VehicleForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await createVehicle(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
            <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
                <label htmlFor="brand" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Značka</label>
                <input type="text" name="brand" id="brand" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Škoda" />
            </div>
            <div>
                <label htmlFor="model" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Model</label>
                <input type="text" name="model" id="model" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Octavia" />
            </div>
            <div>
                <label htmlFor="licensePlate" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">SPZ</label>
                <input type="text" name="licensePlate" id="licensePlate" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="1AB 2345" />
            </div>
            <div>
                <label htmlFor="year" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Rok výroby</label>
                <input type="number" name="year" id="year" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" min="1990" max="2099" defaultValue={new Date().getFullYear()} />
            </div>
            <div>
                <label htmlFor="vin" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">VIN (volitelné)</label>
                <input type="text" name="vin" id="vin" className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Stav</label>
                <select name="status" id="status" className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <option value="ACTIVE">Aktivní</option>
                <option value="MAINTENANCE">Údržba</option>
                <option value="INACTIVE">Neaktivní</option>
                </select>
            </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors cursor-pointer">
                {isPending ? "Ukládání.." : "Uložit vozidlo"}
            </button>
        </div>
    </form>
  );
}
