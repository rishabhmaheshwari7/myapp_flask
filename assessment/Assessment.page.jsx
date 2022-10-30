import React, {useEffect, useState} from "react";
import './Assessment.styles.css';
import {Questions} from "./QuestionBank";
import {ChevronLeft, ChevronRight, Edit, Block} from '@backyard/icons'
import {Button, Spinner, TextField} from '@backyard/react'
import TextInput from "@backyard/react/TextInput";
import axios from "axios";
import AssessmentQuestion from "./AssessmentQuestion.component";
import { useNavigate } from "react-router-dom";


 function Assessment(){
    const[currQuestion, setCurrQuestion]=useState(0);
    const[optionChosen,setOptionChosen]=useState("");
    const [arrayOfQue, setarrayOfQue] = useState([]);
    const nextQuestion = (currQuestion) => {
        setCurrQuestion(currQuestion+1);
    };
    const prevQuestion = (currQuestion) => {
        setCurrQuestion(currQuestion-1);
    };
    const navigate = useNavigate();
    const [show, setshow] = useState(false);
    const finishAssessment = async(lastQuestionObj, currQuestion) => {
       //Goes to the Thank You Component
       const arrayOfResponses = JSON.parse(sessionStorage.getItem("arrayOfResponses"))
       arrayOfResponses[currQuestion] = lastQuestionObj;
       console.log(arrayOfResponses);
       const res = await axios.post("http://localhost:8080/api/test/saveresponse", arrayOfResponses);
       sessionStorage.setItem("arrayOfResponses", JSON.stringify([]));
       console.log(res.data);
       setTimeout(() => {
            navigate("/assoc/assessment/thankyou");
       }, 800);
       setshow(true);
    };
    //This function is for drop down text box
    useEffect(() => {
        if(!sessionStorage.getItem("arrayOfResponses")){
            sessionStorage.setItem("arrayOfResponses", JSON.stringify([]));
        }
    }, []);
    useEffect(() => {
        async function confirmSha(){
            try {
                const res = await axios.get(`http://localhost:8080/api/test/checkisvalidkey/${sessionStorage.getItem("sha")}`)
                console.log(res.data);
            } catch (error) {
                console.log(error);
                navigate("/error/invalid/assessment/user");       
            }
        }
        confirmSha();
    }, [])
    useEffect(() => {
      async function fetchQuestions(){
        try {
             const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` }
            };
            const res = await axios.get("http://localhost:8080/api/test/questions", config);
            console.log(res.data);
            setarrayOfQue(res.data);
        } catch (error) {
            console.log(error);   
        }
      }
      fetchQuestions();
    }, [])
    
    return(

      <div className="container">
             <AssessmentQuestion question={arrayOfQue[currQuestion]} currQuestion={currQuestion} totalLength={arrayOfQue.length} nextQuestion={nextQuestion} prevQuestion={prevQuestion} finishAssessment={finishAssessment} />
            {show ? <Spinner show /> : null}
      </div>                
  
    );
}
export default Assessment
