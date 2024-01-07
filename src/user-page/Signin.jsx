import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
          height: "400px",
          marginTop: "90px",
        }}
      >
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <Typography variant={"h6"} style={{ textAlign: "center" }}>
            Login to User account
          </Typography>
          <br />
          <TextField
            onChange={(e) => {
              let elemt = e.target;
              setEmail(elemt.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
            // type={"email"}
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
                "http://localhost:3000/users/login",

                {
                  username: email,
                  password: password,
                }
              );
              let data = response.data;
              localStorage.setItem("tokenUser", data.token);
              navigate("/users/courses");
            }}
          >
            {" "}
            Signin
          </Button>

          <div className="new" style={{ marginTop: "12px" }}>
            Dont have an account?{" "}
            <span
              className="hover"
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/users/signup")}
            >
              REGISTER
            </span>{" "}
            here
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
