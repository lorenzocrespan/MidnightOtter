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
      title: "User manager",
      href: "/userManagerPage",
      disabled: false,
    },
    {
      title: "Manager case",
      href: "/managerCasePage",
      disabled: false,
    },
    {
      title: "Add new exihibit",
      // title: "Caricamento reperti",
      href: "/addExihibitPage",
      disabled: false,
    },
    {
      title: "List exihibit",
      // title: "Lista reperti",
      href: "/exihibitPage",
      disabled: false,
    },
    {
      title: "Send exihibit",
      // title: "Lista reperti",
      href: "/exihibitPage",
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
