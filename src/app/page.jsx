import Image from "next/image";
import {hotels} from '../lib/homePageData'
import { MapFilterItems } from "@/components/MapFilterItems";

export default function Home() {
  console.log(hotels)
  return (
   <div>
    <MapFilterItems/>
   </div>
  );
}
