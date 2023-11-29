"use client";
import React from "react";
import { useGlobalState } from "../context/GlobalProvider";
import Tasks from "../tasks/Tasks";

type Props = {};

const page = (props: Props) => {
  const { completedTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
};

export default page;
