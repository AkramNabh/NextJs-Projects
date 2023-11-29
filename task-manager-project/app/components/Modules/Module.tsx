"use client";
import { useGlobalState } from "@/app/context/GlobalProvider";
import React from "react";
import styled from "styled-components";

type Props = {
  content: React.ReactNode;
};

const Module = (props: Props) => {
  const { closeModule, theme } = useGlobalState();
  return (
    <ModuleStyle theme={theme}>
      <div className="module-overlay" onClick={closeModule}></div>
      <div className="module-content">{props.content}</div>
    </ModuleStyle>
  );
};

const ModuleStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .module-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

  .module-content {
    padding: 2rem;
    position: relative;
    max-width: 630px;
    z-index: 100;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadiusMd2};
  }
`;
export default Module;
