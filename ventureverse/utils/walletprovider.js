import { BrowserProvider } from "ethers";

export const getProvider = () => {
  let provider;
  try {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      return (provider = new BrowserProvider(window.ethereum));
    }
  } catch (error) {
    console.log(error);
    console.log("no metamask");
  }
};
