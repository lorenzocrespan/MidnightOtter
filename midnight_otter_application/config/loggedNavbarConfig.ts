// Import from types folder the BaseNavbarType type.
import { BaseNavbarType } from "@/types";

// Export a constant of type BaseNavbarType with the information about the navigation items.
export const loggedPageLeftConfig: BaseNavbarType = {
  mainNav: [
    {
      title: "Homepage",
      href: "/homepage",
      disabled: false,
    },
    {
      title: "Sezione 2",
      href: "/homepage/#Sezione2",
      disabled: false,
    },
    {
      title: "Sezione 3",
      href: "/homepage/#Sezione3",
      disabled: false,
    },
    {
      title: "Sezione 4",
      href: "/homepage/#Sezione4",
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
    }
  ],
};
