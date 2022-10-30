import {
  Button,
  Grid,
  Tile,
  Typography,
  Select,
  Option,
  Spinner,
} from "@backyard/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Viewresult = () => {
  const navigate = useNavigate();
  const [showSpinner, setshowSpinner] = useState(false);
  const [teams, setteams] = useState("");
  const [arrayOfShas, setarrayOfShas] = useState([])
  const [shaToPass, setShaToPass] = useState("");
  const [shaToPass2, setShaToPass2] = useState("");
  const teamOptions = ["Vendor Compliance", "DACI Hadoop", "Item Portal", "Telemetry"];
  const onTeamSelect = async (e) => {
      try {
        const res = await axios.get(`http://localhost:8080/api/test/getalltheassessments/${e.target.value}`)
        setarrayOfShas(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
  }

  const onSubmit = async (e) => {
              sessionStorage.setItem("shaToPassForResult", shaToPass);
              sessionStorage.setItem("shaToPassForResult2", shaToPass2);
              setTimeout(() => {
                navigate("/admin/result/questionwise");
              }, 800);
              setshowSpinner(true);
  }
  return (
    <div className="card_tile" >
      <Tile variant="card" className="card-tile" color="subdued">
        <Grid.Row className="grid-row">
          <Grid.Column>
            <Typography
              color="black"
              variant="h4"
              align="left"
              marginBottom="s4"
            >
              Select Teams
            </Typography>
          </Grid.Column>
          <Grid.Column>
            <Typography color="black" align="center" marginBottom="s4">
              <Select onChange={onTeamSelect}>
                <Option disabled value="">
                  Select an option...
                </Option>
                {teamOptions.map(t => <Option value={t}>{t}</Option>)}
              </Select>
            </Typography>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="grid-row">
          <Grid.Column>
            <Typography
              color="black"
              variant="h4"
              align="left"
              marginBottom="s4"
            >
              Assessment 1
            </Typography>
          </Grid.Column>
          <Grid.Column>
            <Typography color="black" align="center" marginBottom="s4">
              <Select onChange={e => {setShaToPass(e.target.value)}}>
                <Option disabled value="">
                  Select date range
                </Option>
                {arrayOfShas.map(obj => {
                  return <Option value={obj.assessmentKey}>{new Date(obj.startdate).toDateString()} - {new Date(obj.enddate).toDateString()}</Option>
                })}
              </Select>
            </Typography>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="grid-row">
          <Grid.Column>
            <Typography
              color="black"
              variant="h4"
              align="left"
              marginBottom="s4"
            >
              Assessment 2
            </Typography>
          </Grid.Column>
          <Grid.Column>
            <Typography color="black" align="center" marginBottom="s4">
              <Select onChange={e => {setShaToPass2(e.target.value)}}>
                <Option disabled value="">
                  Select date range
                </Option>
                {arrayOfShas.map(obj => {
                  return <Option value={obj.assessmentKey}>{new Date(obj.startdate).toDateString()} - {new Date(obj.enddate).toDateString()}</Option>
                })}
              </Select></Typography>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="grid-row">
          <Grid.Column>
            <Button onClick={onSubmit}>View</Button>
          </Grid.Column>
        </Grid.Row>
      </Tile> 
      {showSpinner ? <Spinner show /> : null}
    </div>
  );
};

export default Viewresult;
