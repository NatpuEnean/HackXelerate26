import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer id="contact" className="w-screen bg-[#c17817] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          &copy; 2026 HackXelerate. All rights reserved.
        </p>

     <div className="flex flex-col items-center gap-4 md:items-start">
  <h2 className="font-bold">Contact Us</h2>

  <div className="text-center space-y-3 md:text-left">
    <p>Rohivarshini S - 88705 85450</p>
    <p>SaifulHaq S - 80721 64214</p>
    <p>Balaji R S - 90801 51115</p>
  </div>
</div>

<div className="text-center md:text-right flex flex-col space-y-4 px-6 md:px-12">
  <a href="mailto:hackxelerate@gmail.com" className="font-bold break-words">
    hackxelerate@gmail.com
  </a>
  <a
    href="https://www.instagram.com/kprietonline?igsh=NTd3MnNsdW4wazR6"
    className="font-bold"
  >
    kprietonline
  </a>
  <a
    href="https://www.instagram.com/vyabhatech?igsh=OWw1ZGNlNGR5eW1t"
    className="font-bold"
  >
    vyabhatech
  </a>
</div>


      </div>
    </footer>
  );
};

export default Footer;
