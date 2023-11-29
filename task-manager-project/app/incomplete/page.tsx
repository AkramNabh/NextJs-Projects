"use client";
import React from "react";
import Tasks from "../tasks/Tasks";
import { useGlobalState } from "../context/GlobalProvider";

type Props = {};

const page = (props: Props) => {
  const { incompleteTasks } = useGlobalState();

  return <Tasks title="In-Complete Tasks" tasks={incompleteTasks} />;
};

export default page;
