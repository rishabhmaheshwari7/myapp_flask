import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Thankyou from "../thankyou/Thankyou.component";
import Nav from "../ui/nav/Nav.component";
import Unauth from "../unauthorised/Unauth.component"
import AdminWelcome from "../welcome/AdminWelcome.component"

const AdminDash = () => {
    const {token} = useSelector(state => state);
    const [error, seterror] = useState(null);
    const dispatch = useDispatch();
    const [data, setdata] = useState("");
    useEffect(() => {
       if(token === ""){
                dispatch({type: "tokenised", value: sessionStorage.getItem("accessToken")});
                console.log(token);
            }
        }, []);
    useEffect(() => {
        async function checkForValidity(){
                    try {
            const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` }
            };
            const result = await axios.get("http://localhost:8080/api/test/user", config);
            console.log(result.data);
            setdata(result.data);
        } catch (error) {
            seterror(error);
            
        }
        }
        checkForValidity();
    }, []);
    return <>{error ?  <Unauth obj={{code: "401", message: "Oops! Unauthorised Access", details: "You are not authorised to access this page"}} /> : 
    <>
        <Nav/>
        <AdminWelcome/>
    </>
    }</>;
}


export default AdminDash;