import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import navbarlogo from "../assets/navbarlogo.png";




function Navbar() {
  return (
    <div>
      <img src={navbarlogo} alt="" /> 

    </div>
  )

};


export default Navbar;











/*
export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Görgetési logika
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setScrolled(currentScrollPos > prevScrollPos && currentScrollPos > 100);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (location.hash === "#about") setScrolled(false);
  }, [location]);

  // Scroll az adott szekcióhoz
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav style={scrolled ? { ...styles.nav, top: "-60px" } : styles.nav}>
        <NavLink to="/" onClick={() => handleScrollToSection("home")} style={styles.link}>
          Home
        </NavLink>
        <span onClick={() => handleScrollToSection("about")} style={styles.link}>
          About
        </span>
        <NavLink to="/register" style={styles.link}>
          Register
        </NavLink>
        <NavLink to="/cart" style={styles.button}>🛒 Cart</NavLink>
        <button onClick={() => setShowLoginModal(true)} style={styles.button}>🔑 Login</button>
      </nav>

      {showLoginModal && (
        <div style={styles.modalOverlay} onClick={() => setShowLoginModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <input type="text" placeholder="Email" style={styles.input} />
            <input type="password" placeholder="Password" style={styles.input} />
            <button style={styles.button}>Login</button>
            <button onClick={() => setShowLoginModal(false)} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </>
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
    cursor: "pointer",
  },
  button: {
    background: "#555",
    color: "white",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  closeButton: {
    background: "#ff4d4d",
    color: "white",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
  }
};
*/