import { Route, Routes } from "react-router-dom";
import About from "../about/About.page";
import AddQuestion from "../add_question/AddQuestion.page";
import AdminDash from "../admin_dashboard/AdminDash";
import AdminLogin from "../admin_login/AdminLogin.page";
import Assessment from "../assessment/Assessment.page";
import AssessmentDetail from "../assess_detail/AssessmentDetail.page";
import AssocDetail from "../assess_detail/AssessmentDetail.page";
import DeleteQues from "../delete_ques/DeletePage";
import Home from "../home/Home.page";
import HorizontalChart from "../horizontal_chart/HorizontalChart.page";
import RadarChart from "../radar_chart/RadarChart.page";
import Responses from "../responses/Responses.page";
import ViewResultForm from "../result/ViewResultForm.page";
import Selectteams from "../select_teams/SelectTeams.component";
import SelectTeams from "../select_teams/SelectTeams.page";
import Thankyou from "../thankyou/Thankyou.component";
import Unauth from "../unauthorised/Unauth.component";
import ViewResult from "../view_result/ViewResult";


const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route path="/assessment/key" element={<AssessmentDetail />}/>
            <Route path="/about/leap" element={<About/>}/>
            <Route path="/admin/dash" element={<AdminDash/>}/>
            <Route path="/error" element={<Unauth obj={{code: "401", message: "Oops! Unauthorised Access", details: "You are not authorised to access this page"}} />}/>
            <Route path="/error/invalid/assessment" element={<Unauth obj={{code: "404", message: "Oops! Page appears broken", details: "The page you are looking for doesn't exist"}} />}/>
            <Route path="/error/invalid/assessment/user" element={<Unauth obj={{code: "404", message: "Oops! Assessment seems invalid.", details: "The Assessment is either invalid or isn't accepting new responses"}} />}/>
            <Route path="/admin/add/questions" element={<AddQuestion/>}/>  
            <Route path="/admin/delete/questions" element={<DeleteQues />}/>  
            <Route path="/admin/view/results" element={<ViewResultForm />}/>
            <Route path="/admin/view/results/reports" element={<ViewResult />}/>
            <Route path="/admin/result/questionwise" element={<Responses />}/>  
            <Route path="/admin/result/factorwise" element={<HorizontalChart />}/>  
            <Route path="/admin/result/competencywise" element={<RadarChart />}/> 
            <Route path="/assoc/assessment/questions" element={<Assessment />}/>  
            <Route path="/assoc/assessment/thankyou" element={<Thankyou />}/>   
            <Route path="/admin/create/assessments" element={<SelectTeams />}/>   
            <Route path="*" element={<Unauth obj={{code: "401", message: "Invalid Url", details: "You have come to invalid page"}} />} />
        </Routes>
        );
}

export default Main;