import { useNavigate } from "react-router-dom"

import Nav from "../ui/nav/Nav.component";

import {Link} from 'react-router-dom';

import './viewresult.css'



const ViewResult = ({activatedBtn}) => {

    const navigate = useNavigate();

    return (

        <>

            <Nav/>
            <div class="view-result-container" data-testid = "img">
                <Link to="/admin/result/questionwise" className={`view-result-linker ${activatedBtn === "Q" ? "active" : null}`}  >Question</Link> <br></br>

                <Link to="/admin/result/factorwise" className={`view-result-linker ${activatedBtn === "F" ? "active" : null}`}>Factor</Link> <br></br>

                <Link to="/admin/result/competencywise" className={`view-result-linker ${activatedBtn === "C" ? "active" : null}`}>Competency</Link> <br></br>

            </div>

        </>

    )

}



export default ViewResult;