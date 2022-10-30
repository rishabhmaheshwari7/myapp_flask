import './Nav.css'
import {Link} from 'react-router-dom';
function Nav(){
    return(
        <div class="nav-container" data-testid = "img">
            {/*Used to link all the components*/}
            <Link to="/admin/view/results" className="linker">View Results</Link> <br></br>
            <Link to="/admin/add/questions" className="linker">Add Questions</Link> <br></br>
            <Link to="/admin/delete/questions" className="linker">Delete Questions</Link> <br></br>
            <Link to="/admin/create/assessments" className="linker">Create Assessment</Link> <br></br>
        </div>
    )
}
export default Nav;