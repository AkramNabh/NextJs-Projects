"use client";

import React, { useEffect, useState } from "react";
import GlobalStylesProvider from "./GlobalStylesProvider";
import { GlobalProvider } from "../context/GlobalProvider";

type Props = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const [isReady, setisReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setisReady(true);
    }, 1000);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return <GlobalProvider>{children}</GlobalProvider>;
};

export default ContextProvider;
