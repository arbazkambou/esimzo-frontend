import React from "react";
import Navbar from "../sections/Navbar";
import { SearchTrigger } from "../search/SearchTrigger";
import { NavbarMobileMenu } from "../sections/NavbarMobileMenu";
import AnnouncementBar from "../common/AnnouncementBar";

function NavWrapper() {
  return (
    <>
      <AnnouncementBar />
      <Navbar
        searchSlot={<SearchTrigger variant="icon" />}
        mobileMenuSlot={
          <NavbarMobileMenu searchSlot={<SearchTrigger variant="icon" />} />
        }
      />
    </>
  );
}

export default NavWrapper;
