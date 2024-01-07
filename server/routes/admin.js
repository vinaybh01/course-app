// Admin routes
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .sendStatus(400)
      .json({ message: "Username and password are required" });
  }
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const result = await Admin.create({ username, password });
    // const newAdmin = new Admin({ username, password });
    // await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .sendStatus(400)
      .json({ message: "Username and password are required" });
  }
  const existingAdmin = await Admin.findOne({ username, password });
  if (existingAdmin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin Logged", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/admin/courses", async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", async (req, res) => {
  // logic to edit a course
  const course = req.body;
  const courseId = req.params.courseId;
  const updateCourse = await Course.findByIdAndUpdate(courseId, course);
  res.json({ message: "Updated Successfully", updateCourse });
});

app.get("/admin/courses", async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json(courses);
});

app.get("/admin/course/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json(course);
});
