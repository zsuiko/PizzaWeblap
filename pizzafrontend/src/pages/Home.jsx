import HotDeal from "../components/HotDeal"
import Latest from "../components/latest"
//import About from "../pages/About"
import PizzaAd from "./PizzaAd"
import ColaAd from "./ColaAd"
import Contact from "../pages/Connection"


function Home() {
    return (
      <div>
          <HotDeal/>
          <Latest/>
          <ColaAd/>
          <PizzaAd/>
          <Contact/>

      </div>
    )
  }
  
  
  
  





  export default Home