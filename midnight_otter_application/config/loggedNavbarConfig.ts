// Import from types folder the BaseNavbarType type.
import { BaseNavbarType } from "@/types";

// Export a constant of type BaseNavbarType with the information about the navigation items.
export const loggedPageLeftConfig: BaseNavbarType = {
  mainNav: [
    {
      title: "Homepage",
      href: "/userMainPage",
      disabled: false,
    },
    {
      title: "Upload cases exhibit",
      // title: "Caricamento reperti",
      href: "/uploadCasesPage",
      disabled: false,
    },
    {
      title: "List exhibit",
      // title: "Lista reperti",
      href: "/exihibitPage",
      disabled: false,
    },
    {
      title: "Upload page",
      href: "/uploadpage",
      disabled: false,
    },
    {
      title: "Search page",
      href: "/searchpage",
      disabled: false,
    },
  ],
};

export const loggedPageRightConfig: BaseNavbarType = {
  mainNav: [
    {
      title: "Logout",
      href: "/",
      disabled: false,
    },
  ],
};
