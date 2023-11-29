"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "../context/GlobalProvider";
import CreateContent from "../components/Modules/CreateContent";
import TaskItem from "../components/taskitem/TaskItem";
import { plus } from "../utils/Icons";
import Module from "@/app/components/Modules/Module";
type Props = {
  title: string;
  tasks: any[];
};

const Tasks = ({ title, tasks }: Props) => {
  const { theme, isLoading, openModule, module } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
      <h1>{title}</h1>
      {module && <Module content={<CreateContent />} />}
      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            isImportant={task.important}
          />
        ))}

        <button className="create-task" onClick={openModule}>
          {plus}
          Add new Task
        </button>
      </div>
    </TaskStyled>
  );
};

const TaskStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;
    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey1};
    }
  }
  .tasks {
    margin: 2rem 0;
  }
`;

export default Tasks;
