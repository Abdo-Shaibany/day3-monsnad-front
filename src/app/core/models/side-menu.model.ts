export interface MenuItem {
  title: string;
  link: string;
}

export interface MenuGroupItem {
  title: string;
  icon: string;
  link: string;
  subLink: string;
  subMenu: MenuItem[];
}
