import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Map } from "lucide-react";
import { format } from "date-fns";

export default async function RidesPage() {
  const rides = await prisma.ride.findMany({
    orderBy: { date: "desc" },
    include: {
      vehicle: true,
      driver: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Jízdy</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Kniha jízd a evidence cest.</p>
        </div>
        <Link
          href="/rides/new"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Nová jízda
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
            <thead className="bg-zinc-50 dark:bg-zinc-950">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Datum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Řidič & Vozidlo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Účel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Vzdálenost</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Upravit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
              {rides.map((ride) => (
                <tr key={ride.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-950">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                    {format(new Date(ride.date), 'dd. MM. yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {ride.driver.firstName} {ride.driver.lastName}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {ride.vehicle.brand} {ride.vehicle.model} ({ride.vehicle.licensePlate})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                    {ride.purpose}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100 font-medium">
                    {ride.distance} km
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-1">
                      {ride.startKm} - {ride.endKm}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/rides/${ride.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                      Upravit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
