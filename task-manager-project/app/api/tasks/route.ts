import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/Connect";
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "unothurized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.log("error posting the task", error);
    return NextResponse.json({ error: "error creating task", status: 500 });
  }
}
export async function GET(res: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "unauthorized be", status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("error getting the tasks", error);
    return NextResponse.json({ error: "error getting task", status: 500 });
  }
}
export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { isCompleted, id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
