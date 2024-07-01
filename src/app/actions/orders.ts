"use server";



import db from "@/db/db";
import React from "react";

export const userOrderExists = async (email: string, productId: string) => {
  return (
    (await db.order.findFirst({
      where: { user: { email }, productId },
      select: { id: true },
    })) !== null
  );
};
