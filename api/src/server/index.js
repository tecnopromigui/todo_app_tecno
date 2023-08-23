const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const routes=require("./settings/router/index");

const server=express();
server.use(express.json());
server.use(morgan("dev"));
server.use(cors({origin:"*"}));
server.use("/",routes);

module.exports=server;
