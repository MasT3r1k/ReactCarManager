import prisma from "@/lib/prisma";
import { updateVehicle } from "@/app/actions";
import Link from "next/link";
import { ArrowLeft, Car, Map } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    notFound();
  }

  const rides = await prisma.ride.findMany({
    where: { vehicleId: id },
    orderBy: { date: "desc" },
    include: { driver: true },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/vehicles" className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-950 transition-colors">
          <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Detail vozidla</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{vehicle.brand} {vehicle.model} ({vehicle.licensePlate})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Informace o vozidle</h2>
          </div>
          <form action={updateVehicle} className="p-6 space-y-4">
            <input type="hidden" name="id" value={vehicle.id} />
            
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Značka</label>
              <input type="text" name="brand" id="brand" required defaultValue={vehicle.brand} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>
            
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Model</label>
              <input type="text" name="model" id="model" required defaultValue={vehicle.model} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="licensePlate" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Registrační značka (SPZ)</label>
              <input type="text" name="licensePlate" id="licensePlate" required defaultValue={vehicle.licensePlate} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Rok výroby</label>
                <input type="number" name="year" id="year" required defaultValue={vehicle.year} min="1900" max={new Date().getFullYear()} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Stav</label>
                <select name="status" id="status" defaultValue={vehicle.status} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <option value="ACTIVE">Aktivní</option>
                  <option value="MAINTENANCE">Údržba</option>
                  <option value="INACTIVE">Neaktivní</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="vin" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">VIN kód</label>
              <input type="text" name="vin" id="vin" defaultValue={vehicle.vin || ""} className="mt-1 block w-full rounded-md border dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                Uložit změny
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Přehled jízd ({rides.length})</h2>
          </div>
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 max-h-[600px] overflow-y-auto">
            {rides.length === 0 ? (
              <li className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400">
                Toto vozidlo zatím nemá žádné záznamy o jízdách.
              </li>
            ) : (
              rides.map((ride) => (
                <li key={ride.id} className="px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-950">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Map className="h-8 w-8 text-zinc-400 mr-4" />
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {ride.purpose}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Řidič: {ride.driver.firstName} {ride.driver.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{ride.distance} km</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                        {new Date(ride.date).toLocaleDateString("cs-CZ")}
                      </p>
                      <Link href={`/rides/${ride.id}`} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                        Upravit jízdu
                      </Link>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
