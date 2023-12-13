import { Router } from "express";
import Auth from "./auth.controller";

const { signIn, auth, signUp } = new Auth();

const router = Router()
  .post("/login", signIn)
  .get("/auth", auth)
  .post("/sign-up", signUp);

export default router;
