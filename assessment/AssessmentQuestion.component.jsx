import { Block, ChevronLeft, ChevronRight, Edit } from "@backyard/icons";
import { Button } from "@backyard/react";
import TextInput from "@backyard/react/TextInput";
import { useEffect, useState } from "react";

const AssessmentQuestion = ({question, currQuestion, totalLength, nextQuestion, prevQuestion, finishAssessment}) => {
    const [show, setShow] = useState(false);
    const [first, setfirst] = useState(question);
    const [respSelected, setrespSelected] = useState("");
    const [notes, setnotes] = useState("");
    const [btnSelected, setBtnSelected]=useState(false);
    const btnSelectedStyle = () =>{
        setBtnSelected(true);
    }
    // const [responseObj, setresponseObj] = useState({
    //     questionId: "",
    //     responseSelected: "",
    //     notes: "",
    //     dateTime: "",
    //     "associate": {
    //         "id": "",
    //         "product": "",
    //         "team": "",
    //         "manager": "",
    //         "portfolio": ""
    //     }
    // })
    const addNotes = () => {
        setShow(prev => !prev);
    }
    const cancelNotes = () => {
        setShow(false);
        setnotes("");
    }
    useEffect(() => {
        if(JSON.parse(sessionStorage.getItem("arrayOfResponses"))){
            console.log(JSON.parse(sessionStorage.getItem("arrayOfResponses")));
            if(JSON.parse(sessionStorage.getItem("arrayOfResponses"))[0]?.responseSelected)
                setrespSelected(JSON.parse(sessionStorage.getItem("arrayOfResponses"))[0]?.responseSelected)
        }
        console.log("Assessment Quesiton rendering once only");
    }, []);
    const movingFromCurrQuestion = (e, sym) => {
        let index = 0;
        if(sym === "+")
            index = 1;
        else
            index = -1;
        let arrayOfResponses = JSON.parse(sessionStorage.getItem("arrayOfResponses"));
        const responseObj = {
            assessmentKey: sessionStorage.getItem("sha"),
            questionId: question.q_id,
            responseSelected: respSelected,
            notes,
            dateTime: new Date()
        }
        arrayOfResponses[currQuestion] = responseObj;
        setrespSelected("");
        sessionStorage.setItem("arrayOfResponses", JSON.stringify(arrayOfResponses));
        if(arrayOfResponses[currQuestion + index]?.responseSelected && arrayOfResponses[currQuestion + index].responseSelected !== ""){
            setrespSelected(arrayOfResponses[currQuestion + index].responseSelected);
        }
        console.log(JSON.parse(sessionStorage.getItem("arrayOfResponses")));
        if(sym === '+')
            nextQuestion(currQuestion);
        if(sym === "-")
            prevQuestion(currQuestion);
    }
    return (
        <>  
            <h2>{question?.questionText}</h2>
            <div className="options">
                {question?.answer?.map((option, key) => {
                    return (
                         <button key={key} className={`options-button ${respSelected - 1 === key ? "active-option" : null}`} onClick={e => {setrespSelected(key+1) }} >{option?.answerText || option?.answer_text}</button>         
                    ); 
                })}
            </div>
            <div className="collapsible">
                <Button size="small" iconBefore={<Edit />} onClick={addNotes} >Add Notes</Button> 
                
                {show ? <>
                    <p>*You can select the option which has the highest alignment to your team. Please add your additional notes here,if any.</p>
               <TextInput name="notes" value={notes} onChange={e => setnotes(e.target.value)} />
                <Button size="small" iconBefore={<Block />} onClick={cancelNotes}>Cancel</Button> 
               </> : null}
            </div>
            <div className="hover-hide">
                <p>
                    You can enter details if none of the above options align with your team
                </p>
                 <input class="text-box" type="text" id="textInput" />
                 <input type="button" name="answer" value="Submit Notes" className="add-notes-button"/>
            </div>
            <div className="button-container">
            
            {currQuestion == (totalLength-1) ? (
                <Button size="large" color="green" onClick={() => {
                      const responseObj = {
                        assessmentKey: sessionStorage.getItem("sha"),
                        questionId: question.q_id,
                        responseSelected: respSelected,
                        notes,
                        dateTime: new Date()
        }
                    finishAssessment(responseObj, currQuestion);}} className="submit-button" disabled={respSelected === "" ? true : false}
                    >
                Submit
                </Button>
            ):(     
                <Button
                    iconAfter={<ChevronRight />}
                    size="large"
                    onClick={e => {movingFromCurrQuestion(e, "+")} }
                    disabled={respSelected === "" ? true : false}
                    className="next-button"
                >
                    Next
                </Button>                                                     
            )}
            {currQuestion == (0) ? (
                <div/>
            ):(     
                <Button
                    iconBefore={<ChevronLeft />}
                    size="large"
                    onClick={e => {movingFromCurrQuestion(e, "-")} }
                    disabled={respSelected === "" ? true : false}
                    className="prev-button"
                >
                     Previous
                </Button>                                                       
            )}    

            </div>
        </>
    )
}

export default AssessmentQuestion;