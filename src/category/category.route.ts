import { Router } from "express";
import Category from "./category.controller";

const { insert, getDataByUserId } = new Category();

const router = Router()
  .post("/insert", insert)
  .get("/get/:userId", getDataByUserId);

export default router;
