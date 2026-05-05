import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js"

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});