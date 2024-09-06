import express from "express";
import connectDb from "./db.js";
import projectRoutes from "./routes/projectRoutes.js";
import Users from "./models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import dashboardRoutes from "./routes/dashboardRoutes.js"

const app = express();
const PORT = 3000;
const KEY = "jwtsecretkey"; // Make sure to use a secure secret key

app.use(express.json());
app.use(cors());

connectDb();

app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      console.log("User with this email is alredy exist");
    }
    const newUser = new Users({ userName, email, password });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log("Error while register user", error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials"); // Properly send response
    }

    const pwIsValid = await bcrypt.compare(password, user.password);
    if (!pwIsValid) {
      return res.status(400).json({status: "failed", message: "Credential are wrong"}); // Properly send response
    }

    const token = jwt.sign({ email }, KEY, { expiresIn: "1h" });
    res.status(200).send({ token });
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).send("Server error");
  }
});

app.use("/", projectRoutes);

app.use("/", dashboardRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
