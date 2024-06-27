import { atom } from "recoil";
export const themeState = atom({
  key: 'themeState', // Unique ID (with respect to other atoms/selectors)
  default: 'light', // Initial value (can also be 'dark')
});
