import React from "react";
import Navbar from "../sections/Navbar";
import SearchList from "../search/SearchList";
import { NavbarMobileMenu } from "../sections/NavbarMobileMenu";

function NavWrapper() {
  return (
    <Navbar
      searchSlot={<SearchList variant="icon" />}
      mobileMenuSlot={
        <NavbarMobileMenu searchSlot={<SearchList variant="icon" />} />
      }
    />
  );
}

export default NavWrapper;
