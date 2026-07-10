"use client";

import { useTransition } from "react";
import { updateVehicleStatus } from "@/app/api/vehicle";

export default function StatusSelect({ vehicleId, currentStatus }: { vehicleId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateVehicleStatus(vehicleId, newStatus);
    });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border-0 focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
        currentStatus === "ACTIVE" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
        currentStatus === "MAINTENANCE" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      } ${isPending ? "opacity-50" : ""}`}
    >
      <option value="ACTIVE" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">Aktivní</option>
      <option value="MAINTENANCE" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">Údržba</option>
      <option value="INACTIVE" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">Neaktivní</option>
    </select>
  );
}
