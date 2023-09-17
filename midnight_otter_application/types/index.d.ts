/*
 *  NOTE:
 *    The following file defines the types for the application.
 *    This file is used by the Typescript compiler to check the
 *    types of the application.
 */

export type SiteConfig = {
  name: string;
  description: string;
  links: {
    twitter: string;
    github: string;
  };
};

// Define the type for the BaseNavbarType (default navbar, used in all pages before the signin).
export type BaseNavbarType = {
  mainNav: MainNavItem[];
};

export type MainNavItem = NavItem;

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};
