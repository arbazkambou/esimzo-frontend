import React from "react";
import Navbar from "../sections/Navbar";
import { SearchTrigger } from "../search/SearchTrigger";
import { NavbarMobileMenu } from "../sections/NavbarMobileMenu";
import AnnouncementBar from "../common/AnnouncementBar";

function NavWrapper() {
  return (
    <div className="sticky top-0 z-50 w-full">
      <AnnouncementBar />
      <Navbar
        searchSlot={<SearchTrigger variant="icon" />}
        mobileMenuSlot={
          <NavbarMobileMenu searchSlot={<SearchTrigger variant="icon" />} />
        }
      />
    </div>
  );
}

export default NavWrapper;
