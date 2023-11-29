import { useGlobalState } from "@/app/context/GlobalProvider";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

type Props = {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  selector?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  border?: string;
};

const Button = (props: Props) => {
  const { theme } = useGlobalState();

  return (
    <ButtonStyle
      style={{
        background: props.background,
        padding: props.padding || "0.5rem 1rem",
        borderRadius: props.borderRad || "0.5rem",
        fontWeight: props.fw || "500",
        fontSize: props.fs,
        border: props.border || "none",
      }}
      theme={theme}
      onClick={props.click}
      type={props.type}
    >
      {props.icon && props.icon} {props.name}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorGrey2};
  z-index: 5;
  cursor: pointer;

  transition: all 0.55s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colorGrey0};
    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }

  i {
    margin-right: 1rem;
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.5rem;
    transition: all 0.55s ease-in-out;
  }
`;

export default Button;
