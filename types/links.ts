export interface LinkType {
  id: number;
  link: string;
  title: string;
  icon?: JSX.Element;
  mobileOnly?: boolean;
}

export interface NavLinks {
  [x: string]: LinkType;
}
