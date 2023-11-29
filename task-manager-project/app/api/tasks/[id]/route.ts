import prisma from "@/app/utils/Connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;
    if (!userId) {
      return NextResponse.json({ error: "unothurized", status: 401 });
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    toast.error("error deleting task");
    console.log("error deleting task", error);
    return NextResponse.json({ error: "error deleting task", status: 500 });
  }
}
