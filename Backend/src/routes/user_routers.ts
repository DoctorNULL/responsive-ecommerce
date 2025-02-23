import { Router } from "express";
import { create_user_handle, login_handle, verify_handle } from "../modules/user_handle";
import { validate_session_middleware } from "../middleware/validate_session";
import { create_session, get_session_data } from "../utils/user/session";

export const registerRoute = Router();
export const loginRoute = Router();
export const validateSessionRoute = Router();
export const verifyRoute = Router();
export const refreshRoute = Router();

registerRoute.post("/", create_user_handle);
loginRoute.post("/", login_handle);
verifyRoute.post("/", validate_session_middleware, verify_handle);
validateSessionRoute.post("/", validate_session_middleware, (req, res) => {res.json("Valid")});

refreshRoute.get("/", validate_session_middleware, async (req, res) => {
    const data = get_session_data(req.body.token??"");
    res.json(await create_session(req.ip??"No IP", data.id, data.verified, data.admin));
});