"use client";

import react, { createContext, useState, useContext } from "react";
import themes from "./themes";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import React from "react";
import { useUser } from "@clerk/nextjs";
export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectetTheme] = useState(0);
  const theme = themes[selectedTheme];
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [module, setModule] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const user = useUser();
  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };
  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("task deleted");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  React.useState(() => {
    if (user) {
      allTasks();
    }
  }, [user]);

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  const importantTasks = tasks.filter((task) => task.isImportant === true);

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      toast.success("task updated");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const openModule = () => {
    setModule(true);
  };

  const closeModule = () => {
    setModule(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        module,
        openModule,
        closeModule,
        allTasks,
        collapsed,
        collapseMenu,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        <Toaster />
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
