import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, UserCircle } from "lucide-react";
import StatusSelect from "./StatusSelect";

export default async function DriversPage() {
  const drivers = await prisma.driver.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Řidiči</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Seznam všech řidičů a zaměstnanců.</p>
        </div>
        <Link
          href="/drivers/new"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Přidat řidiče
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
            <thead className="bg-zinc-50 dark:bg-zinc-950">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Jméno</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Číslo řidičáku</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Kontakt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Stav</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Upravit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-950">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/50 rounded-full text-zinc-500 dark:text-zinc-400">
                        <UserCircle className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{driver.firstName} {driver.lastName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                    {driver.licenseNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-900 dark:text-zinc-100">{driver.email || "—"}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{driver.phone || "—"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusSelect driverId={driver.id} currentStatus={driver.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/drivers/${driver.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
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
