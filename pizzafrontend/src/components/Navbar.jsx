import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation(); 
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);


  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;


    if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
      setScrolled(true); 
    } else {
      setScrolled(false);  
    }


    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);


  useEffect(() => {

    if (location.hash === "#about") {
      setScrolled(false);
    }
  }, [location]);


  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); 
    }
  };

  return (
    <nav style={scrolled ? { ...styles.nav, top: "-60px" } : styles.nav}>
      <NavLink to="/" onClick={() => handleScrollToSection('home')} style={styles.link}>Home</NavLink>
      <a href="#about" onClick={() => handleScrollToSection('about')} style={styles.link}>About</a>
      <NavLink to="/register" style={styles.link}>Register</NavLink>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "10px",
    background: "#333",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: "top 0.3s", 
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  }
};

















/*
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <h1>Slice & Spice</h1>
            {user ? (
                <div>
                    <p>Felhasználó: {user.userName}</p>
                    <p>Email: {user.email}</p>
                    <p>Cím: {user.address}</p>
                    <p>Város: {user.city}</p>
                    <button onClick={logout}>Kijelentkezés</button>
                </div>
            ) : (
                <p>Nem vagy bejelentkezve.</p>
            )}
        </nav>
    );
}

export default Navbar;
*/