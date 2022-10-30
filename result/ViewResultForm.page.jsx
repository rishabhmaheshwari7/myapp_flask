import { Typography } from "@backyard/react";
import Nav from "../ui/nav/Nav.component";
// import "../select_teams/SelectTeams.css";
import Viewresult from "./ViewResult.component";
const ViewResultForm = () => {
  return (
    <>
    <Nav/>
    <div className="select_team" style={{"textAlign": "center", "padding": "5rem"}}>
      <Typography
        className="admin-comp"
        variant="h1"
        color="black"
        align="center"
      >
        View Result
      </Typography>
      <Viewresult className="tile admin-comp" align="center" />
    </div>
  </>);
};

export default ViewResultForm;
