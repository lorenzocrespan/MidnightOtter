// Import from types folder the BaseNavbarType type.
import { BaseNavbarType } from "@/types";

// Export a constant of type BaseNavbarType with the information about the navigation items.
export const introductionPageLeftConfig: BaseNavbarType = {
  mainNav: [
    {
      title: "Sezione 1",
      href: "/#Sezione1",
      disabled: false,
    },
    {
      title: "Sezione 2",
      href: "/#Sezione2",
      disabled: false,
    },
    {
      title: "Sezione 3",
      href: "/#Sezione3",
      disabled: false,
    },
    {
      title: "Sezione 4",
      href: "/#Sezione4",
      disabled: false,
    },
  ],
};

export const introductionPageRightConfig: BaseNavbarType = {
  mainNav: [
    {
      title: "Registrati",
      href: "/signup",
      disabled: false,
    },
    {
      title: "Accedi",
      href: "/signin",
      disabled: false,
    },
  ],
};