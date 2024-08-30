import { Outlet } from "react-router-dom";
import NavbarOnline from "../NavbarOnline/NavbarOnline.jsx";
import FooterOnline from "../FooterOnline/FooterOnline.jsx";


export default function LayoutOnlineSystem(){

   return (
      <>
         <NavbarOnline/>
         <Outlet></Outlet>
         <FooterOnline/>
      </>
   )
}