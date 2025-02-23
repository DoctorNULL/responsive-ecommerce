import express, { Application } from "express";
import cors from 'cors';
import { loginRoute, refreshRoute, registerRoute, validateSessionRoute, verifyRoute } from "./routes/user_routers";
import { createCategoryRoute, updateCategoryRoute } from "./routes/category_routes";

const app : Application = express();

//Config
const host : string = process.env.HOST?? "localhost";
const port : number = parseInt(process.env.PORT?? "1415");


//Development Only
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Auth
app.use("/auth/register", registerRoute);
app.use("/auth/login", loginRoute);
app.use("/auth/verify", verifyRoute);
app.use("/auth/refresh", refreshRoute);
app.use("/auth/validate", validateSessionRoute);


//Category
app.use("/category/add", createCategoryRoute);
app.use("/category/change", updateCategoryRoute);

app.listen(port, host, ()=>{
    console.log(`Server is running on http://${host}:${port}`);
});