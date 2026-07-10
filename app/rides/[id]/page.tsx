import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import EditRideForm from "./EditRideForm";

export default async function EditRidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ride = await prisma.ride.findUnique({
    where: { id },
  });

  if (!ride) {
    notFound();
  }

  const [vehicles, drivers] = await Promise.all([
    prisma.vehicle.findMany({ where: { status: "ACTIVE" } }),
    prisma.driver.findMany({ where: { status: "ACTIVE" } }),
  ]);

  // If the currently assigned vehicle/driver is not active, we still need them in the list to not break the select
  const vehicleExists = vehicles.some(v => v.id === ride.vehicleId);
  const driverExists = drivers.some(d => d.id === ride.driverId);

  if (!vehicleExists) {
    const v = await prisma.vehicle.findUnique({ where: { id: ride.vehicleId } });
    if (v) vehicles.push(v);
  }

  if (!driverExists) {
    const d = await prisma.driver.findUnique({ where: { id: ride.driverId } });
    if (d) drivers.push(d);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/rides" className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:bg-zinc-950 transition-colors">
          <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Úprava jízdy</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Oprava chybného záznamu jízdy.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <EditRideForm ride={ride} vehicles={vehicles} drivers={drivers} />
      </div>
    </div>
  );
}
