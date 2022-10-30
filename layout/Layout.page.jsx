import { ThemeProvider } from "@backyard/react";
import Main from "../main/Main.page";
import Footer from "../ui/footer/Footer.component";
import Header from "../ui/header/Header.component";


const Layout = () => {
    return (
     <>           <Header/>
                <div className="body">
                    <Main/>
                </div>
                <Footer/>
  </>
                );
}

export default Layout;