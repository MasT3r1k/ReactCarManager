"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import validator from "validator"

export async function createDriver(formData: FormData) {
  const firstName = (formData.get("firstName") as string).trim();
  const lastName = (formData.get("lastName") as string).trim();
  const licenseNo = (formData.get("licenseNo") as string).trim();
  const email = (formData.get("email") as string).trim();
  const phone = (formData.get("phone") as string).trim();
  const status = (formData.get("status") as string).trim();

  if (firstName == "") {
    return {
      error: "Chybí křestní jméno"
    }
  }

  if (lastName == "") {
    return {
      error: "Chybí přijmení"
    }
  }

  if (licenseNo == "") {
    return {
      error: "Chybí číslo řidicského průkazu"
    }
  }

  if (email && !validator.isEmail(email)) {
    return {
      error: "Neplatný e-mail"
    }
  }

  if (status == "") {
    return {
      error: "Chybí stav řidiče"
    }
  }

  if (!["ACTIVE", "INACTIVE"].includes(status)) {
    return {
      error: "Neplatný stav řidiče"
    }
  }

  await prisma.driver.create({
    data: {
      firstName,
      lastName,
      licenseNo,
      email,
      phone,
      status,
    },
  });

  revalidatePath("/drivers");
  redirect("/drivers");
}

export async function updateDriverStatus(driverId: string, status: string) {
  await prisma.driver.update({
    where: { id: driverId },
    data: { status },
  });
  revalidatePath("/drivers");
}

export async function updateDriver(formData: FormData) {
  const id = formData.get("id") as string;

  const firstName = (formData.get("firstName") as string).trim()
  const lastName = (formData.get("lastName") as string).trim()
  const licenseNo = (formData.get("licenseNo") as string).trim()
  const email = (formData.get("email") as string).trim()
  const phone = (formData.get("phone") as string).trim()
  const status = (formData.get("status") as string).trim()

  if (firstName == "") {
    return {
      error: "Chybí křestní jméno"
    }
  }

  if (lastName == "") {
    return {
      error: "Chybí přijmení"
    }
  }

  if (licenseNo == "") {
    return {
      error: "Chybí číslo řidicského průkazu"
    }
  }

  if (email && !validator.isEmail(email)) {
    return {
      error: "Neplatný e-mail"
    }
  }

  if (status == "") {
    return {
      error: "Chybí stav řidiče"
    }
  }

  if (!["ACTIVE", "INACTIVE"].includes(status)) {
    return {
      error: "Neplatný stav řidiče"
    }
  }

  await prisma.driver.update({
    where: { id },
    data: {
      firstName,
      lastName,
      licenseNo,
      email,
      phone,
      status,
    },
  });
  revalidatePath("/drivers");
  revalidatePath(`/drivers/${id}`);
  redirect(`/drivers`);
}