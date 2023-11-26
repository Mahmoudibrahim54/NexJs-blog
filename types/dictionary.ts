export interface DictionarySchema {
  config: Config;
  header: Header;
  mainPage: MainPage;
  navigation: Navigation;
  buttons: Buttons;
  ctaCard: CtaCard;
  footer: Footer;
}
export interface Config {
  siteName: string;
}
export interface Buttons {
  readMore: string;
}

export interface CtaCard {
  title: string;
  description: string;
  button: string;
  placeholder: string;
  subscriberTagTextOne: string;
  subscriberTagTextTwo: string;
  image: string;
}

export interface Footer {
  titleOne: string;
  titleTwo: string;
  description: string;
  socialMedia: string;
  rightsText: string;
  creatorText: string;
  country: string;
  location: string;
}

export interface Header {
  textOne: string;
  textTow: string;
  changeLangButton: string;
}

export interface MainPage {
  mainPage: string;
  sideNav: string;
}

export interface Navigation {
  [x: string]: Links;

  links: Links;
}

export interface Links {
  [x: string]: string;
  mainMenu: string;
  subMenu: string;
  articles: string;
  videos: string;
  records: string;
  books: string;
  about: string;
  featured: string;
}
