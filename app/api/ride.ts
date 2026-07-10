"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRide(formData: FormData) {
  const start_km = parseInt(formData.get("startKm") as string, 10)
  const end_km = parseInt(formData.get("endKm") as string, 10)
  if (start_km > end_km) {
    return {
      error: "Počáteční stav tachometru nemůže být větší než konečný."
    }
  }

  await prisma.ride.create({
    data: {
      date: new Date(formData.get("date") as string),
      purpose: formData.get("purpose") as string,
      startKm: start_km,
      endKm: end_km,
      distance: end_km - start_km,
      vehicleId: formData.get("vehicleId") as string,
      driverId: formData.get("driverId") as string,
      notes: formData.get("notes") as string,
    },
  });

  revalidatePath("/rides");
  redirect("/rides");
}

export async function updateRide(formData: FormData) {
  const id = formData.get("id") as string;
  const start_km = parseInt(formData.get("startKm") as string, 10);
  const end_km = parseInt(formData.get("endKm") as string, 10);
  
  if (start_km > end_km) {
    return { error: "Počáteční stav tachometru nemůže být větší než konečný." };
  }

  await prisma.ride.update({
    where: { id },
    data: {
      date: new Date(formData.get("date") as string),
      purpose: formData.get("purpose") as string,
      startKm: start_km,
      endKm: end_km,
      distance: end_km - start_km,
      vehicleId: formData.get("vehicleId") as string,
      driverId: formData.get("driverId") as string,
      notes: formData.get("notes") as string,
    },
  });

  revalidatePath("/rides");
  revalidatePath(`/rides/${id}`);
  redirect(`/rides`);
}
