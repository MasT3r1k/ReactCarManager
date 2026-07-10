import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Map } from "lucide-react";
import { notFound } from "next/navigation";
import VehicleForm from "./EditVehicle";

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
          <VehicleForm vehicle={vehicle} />
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
