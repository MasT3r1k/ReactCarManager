"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVehicle(formData: FormData) {
  const brand = (formData.get("brand") as string).trim()
  const model = (formData.get("model") as string).trim()
  const licensePlate = (formData.get("licensePlate") as string).trim()
  const year = parseInt(formData.get("year") as string, 10)
  const vin = (formData.get("vin") as string).trim()
  const status = (formData.get("status") as string).trim()

  if (brand == "") {
    return { error: "Chybí značka auta" }
  }

  if (model == "") {
    return { error: "Chybí model auta" }
  }

  if (licensePlate == "") {
    return { error: "Chybí registrační značka auta" }
  }

  if (year <= 1970 || year > new Date().getFullYear()) {
    return { error: "Neplatný rok výroby auta" }
  }

  if (status == "") {
    return { error: "Chybí stav auta" }
  }

  if (!["ACTIVE", "MAINTENANCE", "INACTIVE"].includes(status)) {
    return { error: "Neplatný stav auta" }
  }

  if (vin) {
    const anotherVehicleVIN = await prisma.vehicle.findFirst({
      where: {
        vin
      }
    })

    if (anotherVehicleVIN) {
      return { error: "Auto s tímto VIN už existuje" }
    }
  }

  await prisma.vehicle.create({
    data: {
      brand,
      model,
      licensePlate,
      year,
      vin,
      status,
    },
  });

  revalidatePath("/vehicles");
  redirect("/vehicles");
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
  const brand = (formData.get("brand") as string).trim()
  const model = (formData.get("model") as string).trim()
  const licensePlate = (formData.get("licensePlate") as string).trim()
  const year = parseInt(formData.get("year") as string, 10)
  const vin = (formData.get("vin") as string).trim()
  const status = (formData.get("status") as string).trim()

  if (brand == "") {
    return { error: "Chybí značka auta" }
  }

  if (model == "") {
    return { error: "Chybí model auta" }
  }

  if (licensePlate == "") {
    return { error: "Chybí registrační značka auta" }
  }

  if (year <= 1970 || year > new Date().getFullYear()) {
    return { error: "Neplatný rok výroby auta" }
  }

  if (status == "") {
    return { error: "Chybí stav auta" }
  }

  if (!["ACTIVE", "MAINTENANCE", "INACTIVE"].includes(status)) {
    return { error: "Neplatný stav auta" }
  }

  if (vin) {
    const anotherVehicleVIN = await prisma.vehicle.findFirst({
      where: {
        vin
      }
    })

    if (anotherVehicleVIN && anotherVehicleVIN.id !== id) {
      return { error: "Auto s tímto VIN už existuje" }
    }
  }

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
  redirect(`/vehicles`);
}