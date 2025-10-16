const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// ***** MongoDB Connection *****
const mongoURL =
  "mongodb+srv://aditigem2003_db_user:Iamthat@cluster0.b4eaxwk.mongodb.net/citizen_grievance?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ***** User Schema *****
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["citizen", "officer", "admin"], default: "citizen" },
  name: String,
  username: String,
  email: String,
  password: String,
  uid: String,
});

const User = mongoose.model("users", userSchema);

// ***** Complaint Schema *****
const complaintSchema = new mongoose.Schema({
  username: String,
  uid: String,
  departmentOfficer: String,
  category: String,
  location: String,
  description: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Submitted" },
  comments: String,
  resolutionRating: String,
  citizenFeedback: String,
});

const Complaint = mongoose.model("complaints", complaintSchema);

// ***** Register User *****
app.post("/register", async (req, res) => {
  try {
    const { role, name, username, email, pass, uid } = req.body;
    const existing = await User.findOne({
      $or: [{ email }, { username }, { uid }],
    });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    await User.create({ role, name, username, email, password: pass, uid });
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ***** Login *****
app.post("/login", async (req, res) => {
  try {
    const { uname, pass } = req.body;

    if (uname === "admin" && pass === "admin@1234") return res.sendStatus(201);
    if (uname === "officer" && pass === "officer@1234") return res.sendStatus(202);

    const user = await User.findOne({ username: uname });
    if (!user) return res.sendStatus(300);
    if (user.password !== pass) return res.sendStatus(300);

    res.status(200).json({ uid: user.uid, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.sendStatus(500);
  }
});

// ***** File Complaint *****
app.post("/complaints", async (req, res) => {
  try {
    const { username, uid, departmentOfficer, category, location, description } = req.body;

    const complaint = await Complaint.create({
      username,
      uid,
      departmentOfficer,
      category,
      location,
      description,
    });

    res.status(201).json({ msg: "Complaint submitted successfully", complaint });
  } catch (err) {
    console.error("Complaint error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ***** Update Complaint (Admin/Officer) *****
app.put("/complaints/:id", async (req, res) => {
  try {
    const { status, comments } = req.body;
    const { id } = req.params;

    const updated = await Complaint.findByIdAndUpdate(
      id,
      { status, comments },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Complaint not found" });
    res.json({ msg: "Complaint updated successfully", updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ***** Citizen Feedback *****
app.put("/feedback/:id", async (req, res) => {
  try {
    const { resolutionRating, citizenFeedback } = req.body;
    const { id } = req.params;

    const updated = await Complaint.findByIdAndUpdate(
      id,
      { resolutionRating, citizenFeedback },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Complaint not found" });
    res.json({ msg: "Feedback submitted successfully", updated });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ***** Admin View All Complaints *****
app.get("/admin", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    console.error("Admin view error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ***** Officer View Assigned Complaints *****
app.get("/officer/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const complaints = await Complaint.find({ departmentOfficer: name });
    res.json(complaints);
  } catch (err) {
    console.error("Officer view error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ***** Citizen Complaint History *****
app.get("/history/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const complaints = await Complaint.find({ uid });
    res.json(complaints);
  } catch (err) {
    console.error("History error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ***** Delete Complaint (Admin Only) *****
app.delete("/complaints/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndDelete(id);
    res.json({ msg: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ***** Remove User *****
app.delete("/removeUser/:username", async (req, res) => {
  try {
    const { username } = req.params;
    await User.deleteOne({ username });
    res.json({ msg: "User removed successfully" });
  } catch (err) {
    console.error("Remove user error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.listen(port, () => console.log(`🚀 Citizen Grievance server running on port ${port}`));
