import prisma from "@/lib/prisma";
import { Car, Users, Map, Activity } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [totalVehicles, totalDrivers, totalRides] = await Promise.all([
    prisma.vehicle.count(),
    prisma.driver.count(),
    prisma.ride.count(),
  ]);

  const recentRides = await prisma.ride.findMany({
    take: 5,
    orderBy: { date: "desc" },
    include: { vehicle: true, driver: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Dashboard</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Přehled stavu vozového parku a jízd.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Vozidla" value={totalVehicles} icon={Car} color="bg-blue-500" href="/vehicles" />
        <StatCard title="Řidiči" value={totalDrivers} icon={Users} color="bg-green-500" href="/drivers" />
        <StatCard title="Jízdy" value={totalRides} icon={Map} color="bg-purple-500" href="/rides" />
        <StatCard title="Aktivita" value="Přehled" icon={Activity} color="bg-orange-500" />
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Nejnovější jízdy</h3>
        </div>
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {recentRides.length === 0 ? (
            <li className="px-6 py-4 text-zinc-500 dark:text-zinc-400">Zatím žádné jízdy</li>
          ) : (
            recentRides.map((ride) => (
              <li key={ride.id} className="px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Map className="h-8 w-8 text-zinc-400 mr-4" />
                    <div>
                      <p className="text-sm font-medium text-indigo-600">
                        {ride.driver.firstName} {ride.driver.lastName}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {ride.vehicle.brand} {ride.vehicle.model} ({ride.vehicle.licensePlate})
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{ride.distance} km</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(ride.date).toLocaleDateString("cs-CZ")}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, href }: any) {
  const content = (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-zinc-900 px-4 py-5 shadow-sm border border-zinc-200 dark:border-zinc-800 sm:p-6 transition-all hover:shadow-md">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md p-3 ${color} text-white`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dt className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</dt>
          <dd className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</dd>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }
  return content;
}
