import express from "express";
import { router as search } from "./api/search";
import { router as insert } from "./api/insert";
import {router as deletes} from "./api/deletes";

// import { router as vote } from "./api/vote";
import bodyParser from "body-parser";
import cors from "cors";

export const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// app.use("/" , (rea , res)=>{
//    res.send("Hello world");
// });

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/search", search);
app.use("/insert", insert);
app.use("/delete", deletes);

