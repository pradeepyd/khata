
import { Github, Twitter, Linkedin, Instagram, Heart } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/pradeepyd", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://x.com/pradeep100xdev", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/pradeep-yadav-7b205b280", label: "LinkedIn" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/im_pradeep_ydv", label: "Instagram" },
  ];

  return (
    <footer className="py-10 px-4 border-t border-white/10">
      <div className="container mx-auto text-center">
        <div
          className="mb-4"
        >
          <p className="text-white text-md font-medium flex items-center justify-center gap-1">
            Build with <Heart className="h-5 w-5 text-red-500 fill-current" /> by Pradeep
          </p>
        </div>
        
        <div
          className="flex items-center justify-center space-x-5"
        >
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              aria-label={link.label}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

