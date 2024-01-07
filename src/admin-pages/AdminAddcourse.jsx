import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminAddcourse() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "60px",
      }}
    >
      <Typography
        variant="h6"
        style={{ fontSize: "25px", fontWeight: "600", paddingBottom: "20px" }}
      >
        Create New Course
      </Typography>
      <div className="div" style={{ width: "550px", border: "" }}>
        <form action="">
          <TextField
            label="Title"
            style={{ margin: "5px 0px" }}
            fullWidth
            size="small"
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            style={{ margin: "5px 0px" }}
            fullWidth
            size="small"
            onChange={(e) => setDes(e.target.value)}
          />

          <TextField
            label="ImageUrl"
            style={{ margin: "5px 0px" }}
            fullWidth
            size="small"
            onChange={(e) => setImage(e.target.value)}
          />

          <TextField
            label="Price"
            style={{ margin: "5px 0px" }}
            fullWidth
            size="small"
            onChange={(e) => setPrice(e.target.value)}
          />

          <Button
            variant={"contained"}
            style={{ backgroundColor: "#000C66", marginTop: "25px" }}
            onClick={async () => {
              await axios.post(
                "http://localhost:3000/admin/courses",
                {
                  title,
                  description: des,
                  imageLink: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              alert("Created Course Successfully");
              navigate("/admin/courses");
            }}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddcourse;
