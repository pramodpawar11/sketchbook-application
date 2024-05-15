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
import Index from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Index/>
    </div>
  );
}
