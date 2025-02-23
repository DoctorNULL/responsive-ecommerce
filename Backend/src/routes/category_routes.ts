import { Router } from "express";
import { validate_session_middleware } from "../middleware/validate_session";
import { is_admin_middleware, is_verified_middleware } from "../middleware/auth_middleware";
import { change_category_name_handle, create_category_handle } from "../modules/category_handle";

export const createCategoryRoute = Router();
export const updateCategoryRoute = Router();

createCategoryRoute.post("/", validate_session_middleware,
     is_verified_middleware, is_admin_middleware, create_category_handle);

updateCategoryRoute.put("/", validate_session_middleware,
     is_verified_middleware, is_admin_middleware, change_category_name_handle);