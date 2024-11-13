import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

type MenuIconProps = {
  toggleMenu: () => void;
  isOpen: boolean;
};

type MenuVariants = {
  hidden: {
    opacity: number;
    scale: number;
    y: number;
  };
  visible: (i: number) => {
    opacity: number;
    scale: number[];
    y: number;
    transition: {
      duration: number;
      delay: number;
      type: "spring";
      stiffness: number;
    };
  };
};

const MenuIcon = ({ toggleMenu, isOpen }: MenuIconProps) => (
  <motion.svg
    className="menu-icon"
    onClick={toggleMenu}
    width="52"
    height="46"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.8 }}
    viewBox="0 0 52 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="52" height="46" rx="4" fill="#EC315A" fillOpacity="0.12" />
    <rect x="12" y="12" width="28" height="2" rx="1" fill="#EC315A" />
    <rect x="12" y="22" width="22" height="2" rx="1" fill="#EC315A" />
    <rect x="12" y="32" width="15" height="2" rx="1" fill="#EC315A" />
    <motion.g
      initial={false}
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={{ duration: 0.3 }}
    />
  </motion.svg>
);

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const variants: Variants & MenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: -20,
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: [1.2, 0.9, 1],
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
      },
    }),
  };

  const handleNavigation = (item: string) => {
    toggleMenu();
    if (item === "Booking") {
      navigate("/booking");
    } else if (item === "Confirmation") {
      navigate("/confirmation");
    }
  };

  return (
    <nav className="navbar">
      <MenuIcon toggleMenu={toggleMenu} isOpen={isOpen} />

      <motion.div
        className="menu"
        initial={{ width: "-100%", height: "0%" }}
        animate={{ width: isOpen ? "100%" : 0, height: isOpen ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.ul className="menu-list">
          {["Booking", "Confirmation"].map((item, index) => (
            <motion.li
              key={item}
              onClick={() => handleNavigation(item)}
              variants={variants}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              custom={index}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </nav>
  );
};

export default Menu;
