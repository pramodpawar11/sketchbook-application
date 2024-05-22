import Image from "next/image";
import { Inter } from "next/font/google";
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "@/components/Menu";
import ToolBox from "@/components/ToolBoox";
import Board from "@/components/Board";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Menu/>
      <ToolBox/>
      <Board/>
    </div>
  );
}
