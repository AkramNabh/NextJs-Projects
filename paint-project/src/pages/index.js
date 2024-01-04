import Image from "next/image";
import Menu from "@/components/menu";
import ToolBox from "@/components/toolBox";
import Board from "@/components/canvas";
export default function Home() {
  return (
    <>
      <Menu />
      <ToolBox />
      <Board />
    </>
  );
}
