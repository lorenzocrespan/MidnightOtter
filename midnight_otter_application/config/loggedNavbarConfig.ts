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
      title: "Upload page",
      href: "/uploadpage",
      disabled: false,
    },
    {
      title: "Search page",
      href: "/searchpage",
      disabled: false,
    },
    {
      title: "Sezione 4",
      href: "/uploadCasesPage",
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
