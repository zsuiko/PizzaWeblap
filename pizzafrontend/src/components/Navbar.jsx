import { NavLink, Link } from "react-router-dom";
import original from "../assets/original.png";
import shopping_bag from "../assets/shopping-bag.png";
import user from "../assets/user.png";
//import { assets } from "../assets/assets";
// absolute -top-3 -right-2 bg-red-500 w-5 h-5 rounded-full flex justify-center items-center text-xs text-white hidden dropdown-menu group-hover:block
function Navbar() {
  return (
    <div className="flex items-center justify-between py-0.5 px-4 bg-gray-800 text-white">
      <img src={original} className="w-36" alt="" />

      <ul className="hidden sm:flex gap-4 text-sm text-white">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p> 
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>

        <NavLink to="/CartPage" className="flex flex-col items-center gap-1">
          <p>Kosár</p> 
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>


        <NavLink to="/About" className="flex flex-col items-center gap-1">
          <p>Rólunk</p> 
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>

        <NavLink to="/Connection" className="flex flex-col items-center gap-1">
          <p>Kapcsolat</p> 
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>

        <NavLink to="/Product" className="flex flex-col items-center gap-1">
          <p>Pizzáink</p> 
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>

        <NavLink to="/Login" className="flex flex-col items-center gap-1">
          <p>Fiók</p> 
          <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
        </NavLink>


      </ul>


      <div className="flex items-center gap-6">
        <img src={shopping_bag} className="w-5 cursor-pointer" alt="" />
        <div className="group relative">
          <img src={user} className="w-5 cursor-pointer" alt="" />
            <div className="group-hover:block absolute hidden dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-500 rounded"> 
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p className="cursor-pointer hover:text-black">Logout</p>

                </div>
              </div>
        </div>
        <Link to='/' className="relative">
          <img src={shopping_bag} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">10</p>
        </Link>



      </div>

    </div>
  );
}

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