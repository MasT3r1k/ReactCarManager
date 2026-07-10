"use client";

import { useState, useTransition } from "react";
import { createRide } from "@/app/actions";
import type { Vehicle, Driver } from "@/lib/generated/prisma/client";

export default function RideForm({ vehicles, drivers }: { vehicles: Vehicle[], drivers: Driver[] }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await createRide(null, formData);
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
        <div className="sm:col-span-2">
          <label htmlFor="purpose" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Účel cesty</label>
          <input type="text" name="purpose" id="purpose" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Služební cesta Praha" />
        </div>
        
        <div>
          <label htmlFor="driverId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Řidič</label>
          <select name="driverId" id="driverId" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
            <option value="">Vyberte řidiče</option>
            {drivers.map(driver => (
              <option key={driver.id} value={driver.id}>
                {driver.firstName} {driver.lastName} ({driver.licenseNo})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vehicleId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Vozidlo</label>
          <select name="vehicleId" id="vehicleId" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
            <option value="">Vyberte vozidlo</option>
            {vehicles.map(vehicle => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.brand} {vehicle.model} ({vehicle.licensePlate})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Datum</label>
          <input type="date" name="date" id="date" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" defaultValue={new Date().toISOString().split('T')[0]} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startKm" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Počáteční stav (km)</label>
            <input type="number" name="startKm" id="startKm" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" min="0" />
          </div>
          <div>
            <label htmlFor="endKm" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Konečný stav (km)</label>
            <input type="number" name="endKm" id="endKm" required className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" min="0" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Poznámka (volitelné)</label>
          <textarea name="notes" id="notes" rows={3} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <button type="submit" disabled={isPending} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 cursor-pointer">
          {isPending ? "Ukládání..." : "Zapsat jízdu"}
        </button>
      </div>
    </form>
  );
}
