"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVehicle(formData: FormData) {
  await prisma.vehicle.create({
    data: {
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      licensePlate: formData.get("licensePlate") as string,
      year: parseInt(formData.get("year") as string, 10),
      vin: formData.get("vin") as string,
      status: formData.get("status") as string,
    },
  });

  revalidatePath("/vehicles");
  redirect("/vehicles");
}

export async function createDriver(formData: FormData) {
  await prisma.driver.create({
    data: {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      licenseNo: formData.get("licenseNo") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      status: formData.get("status") as string,
    },
  });

  revalidatePath("/drivers");
  redirect("/drivers");
}

export async function createRide(prevState: any, formData: FormData) {
  const start_km = parseInt(formData.get("startKm") as string, 10)
  const end_km = parseInt(formData.get("endKm") as string, 10)
  if (start_km > end_km) {
    return { 
      error: "Počáteční stav tachometru nemůže být větší než konečný.",
      payload: {
        purpose: formData.get("purpose") as string,
        driverId: formData.get("driverId") as string,
        vehicleId: formData.get("vehicleId") as string,
        date: formData.get("date") as string,
        startKm: formData.get("startKm") as string,
        endKm: formData.get("endKm") as string,
        notes: formData.get("notes") as string,
      }
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

export async function updateDriverStatus(driverId: string, status: string) {
  await prisma.driver.update({
    where: { id: driverId },
    data: { status },
  });
  revalidatePath("/drivers");
}

export async function updateVehicleStatus(vehicleId: string, status: string) {
  await prisma.vehicle.update({
    where: { id: vehicleId },
    data: { status },
  });
  revalidatePath("/vehicles");
}

export async function updateVehicle(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.vehicle.update({
    where: { id },
    data: {
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      licensePlate: formData.get("licensePlate") as string,
      year: parseInt(formData.get("year") as string, 10),
      vin: formData.get("vin") as string,
      status: formData.get("status") as string,
    },
  });
  revalidatePath("/vehicles");
  revalidatePath(`/vehicles/${id}`);
  redirect(`/vehicles/${id}`);
}

export async function updateDriver(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.driver.update({
    where: { id },
    data: {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      licenseNo: formData.get("licenseNo") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      status: formData.get("status") as string,
    },
  });
  revalidatePath("/drivers");
  revalidatePath(`/drivers/${id}`);
  redirect(`/drivers/${id}`);
}

export async function updateRide(prevState: any, formData: FormData) {
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
