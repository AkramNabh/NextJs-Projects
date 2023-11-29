"use client";

import React from "react";
import Tasks from "../tasks/Tasks";
import { useGlobalState } from "../context/GlobalProvider";

type Props = {};

const page = (props: Props) => {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
};

export default page;
