
import { Spinner } from "@backyard/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css'

const Header = () => {
    const [showSpinner, setshowSpinner] = useState(false)
    const navigate = useNavigate();
    const toHome = async (e) => {
        setTimeout(() => {
            navigate("/");
            setshowSpinner(false);
        }, 300);
        setshowSpinner(true);
    }
        return(
            <nav className="header-design" data-testid ="header">
                    <img src="/leap-logo.png" alt="Leap Logo" width="180" height="80" data-testid = "a1" className="leap-logo"  onClick={toHome} />
                    <img src="/maple-leaf-logo.png" alt="Maple Logo" width="275" height="75" className="maple-logo"  />
                    {showSpinner ? <Spinner show /> : null}          
            </nav>
        )
    

}

export default Header