import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2pYyh14T2X7cbai3mF7e17uLP3B"];

export const isAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
