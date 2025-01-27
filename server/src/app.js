import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000" || process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import authRouter from "./routes/authRoute.js";
// import userRouter from "./routes/userRoute.js";
// import propertyTypeRouter from "./routes/propertyTypeRoute.js";
// import amenityRouter from "./routes/amenityRoute.js";
// import propertyRouter from "./routes/propertyRoute.js";

// routes declaration
app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/property-types", propertyTypeRouter);
// app.use("/api/amenity", amenityRouter);
// app.use("/api/property", propertyRouter);

export { app };
