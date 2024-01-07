import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>Register to User account</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(evant11) => {
              let elemt = evant11.target;
              setEmail(elemt.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button
            size={"medium"}
            variant="contained"
            style={{ backgroundColor: "#000C66" }}
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/users/signup",

                {
                  username: email,
                  password: password,
                }
              );
              // let data = response.data;
              // localStorage.setItem("token", data.token);
              navigate("/users/signin");
            }}
          >
            Signup
          </Button>
          <div className="div" style={{ marginTop: "12px" }}>
            Have an account?{" "}
            <span
              className="hover"
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/users/signin")}
            >
              LOGIN
            </span>{" "}
            here
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
