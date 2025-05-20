import searchComponent from "./components/searchComponent.js";

declare global {
  interface Window {
    searchComponent: () => any;
  }
}

window.searchComponent = searchComponent;
