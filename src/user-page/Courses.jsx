import React from "react";
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/users/courses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenUser"),
          },
        })
        .then((res) => {
          setCourses(res.data.courses);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "30px 100px",
      }}
    >
      {courses &&
        courses.length > 0 &&
        courses.map((course) => <Course course={course} />)}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();

  return (
    <div onclick={() => navigate("/users/purchasedCourse")}>
      <Card
        style={{
          width: 300,
          margin: 14,
          height: 350,
          color: "black",
          background: "#F0F0F0",
          boxShadow: "-1px 0 5px 0 rgba(0, 0, 0, .5)",
        }}
      >
        <img
          src={course.imageLink}
          style={{ width: "300px", height: "200px" }}
        />
        <Typography
          textAlign={"left"}
          style={{ marginLeft: "10px" }}
          variant="h6"
        >
          {course.title}
        </Typography>
        <Typography
          textAlign={"left"}
          style={{ marginLeft: "10px" }}
          variant="subtitle1"
        >
          {course.description}
        </Typography>
        <Typography
          textAlign={"left"}
          style={{ marginLeft: "10px" }}
          variant="subtitle1"
        >
          {course.price}
        </Typography>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 5 }}
        >
          {/* <Button
        variant={"contained"}
        size="small"
        style={{
          backgroundColor: "#018749",
          marginRight: "10px",
        }}
        onClick={async () => {
          try {
            const response = await axios.post(
              `http://localhost:3000/users/courses/${course._id}`,
              null,
              {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("tokenUser"),
                },
              }
            );
            console.log(response);
            alert("Course Purchased successfully");
          } catch (error) {
            console.error("Error purchasing course:", error);
            if (error.response) {
              console.log(
                "Server responded with status:",
                error.response.status
              );
              console.log("Response data:", error.response.data);
            }
            alert("Failed to purchase course. Please try again.");
          }
        }}
      >
        Purchase
      </Button> */}
          <Button
            variant={"contained"}
            size="small"
            style={{
              backgroundColor: "#018749",
              marginRight: "10px",
            }}
            onClick={() => {
              navigate("/users/course/" + course._id);
            }}
          >
            View Course
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Courses;
