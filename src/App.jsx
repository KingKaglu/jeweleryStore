import JewelryShop from "./Components/jewstore.jsx"
import Header from "./Components/header.jsx"
import About from './Components/About.jsx';
import Contact from "./Components/Contact.jsx";
import Footer from "./Components/Footer.jsx";
import SearchableProductList from "./Components/SearchableProductList.jsx";
function App() {

  return (
    <>
    <Header></Header>
    <SearchableProductList/>
  <JewelryShop></JewelryShop>
  <About></About>
  <Contact/>
  <Footer/>
    </>
  )
}

export default App
