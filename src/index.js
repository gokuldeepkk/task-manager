import express from "express";
import { userRouter } from "./routers/users.js";
import { taskRouter } from "./routers/tasks.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is running on port :: ${port}`);
});
