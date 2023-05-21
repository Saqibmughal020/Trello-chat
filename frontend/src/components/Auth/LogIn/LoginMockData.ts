import facebookIcons from "../../../assets/icons/facebook.svg";
import linkedInIcons from "../../../assets/icons/linkedIn.svg";
import InstagramIcons from "../../../assets/icons/instagram.svg";
type SOCAILiCONS = {
  id: number;
  name: string;
  img: string;
  url: string;
};
export const SocialIconsData: SOCAILiCONS[] = [
  { id: 1, name: "FaceBook", img: facebookIcons, url: "#" },
  { id: 2, name: "LinkedIn", img: linkedInIcons, url: "#" },
  { id: 3, name: "Instagram", img: InstagramIcons, url: "#" },
];
