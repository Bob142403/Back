import { Request, Response } from "express";
import { connect, pool } from "../../database/pool";
import jsonwebtoken from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import SignIn from "../types/SignIn";

class Auth {
  async signIn(req: Request, res: Response) {
    const client = await pool.connect();

    const { username } = req.body;

    try {
      const user = await client.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
      );

      const token = jsonwebtoken.sign(req.body, jwtConfig.privateKey);

      if (!user) {
        res.status(404).json("Incorrect User name or passsword");
      } else res.status(200).json({ token, user });
    } catch (err) {
      res.status(400).json("UnExpected Error");
    }
    return req.body;
  }
  async auth(req: Request, res: Response) {
    const client = await pool.connect();
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(400).json("Token is not verifed!");

      const user = jsonwebtoken.verify(token, jwtConfig.privateKey) as SignIn;
      const userInfo = await client.query(
        `SELECT * FROM users WHERE username = $1`,
        [user.username]
      );

      if (userInfo) res.status(200).json(userInfo);
      else res.status(400).json("Error");
    } catch (err) {
      res.status(400).json("Token is not verifed!");
    }
  }
  async signUp(req: Request, res: Response) {
    const {
      username,
      email,
      district: disctrict,
      village,
      gender,
      fio,
      password,
      birthday,
      telephone,
      jamoat,
    } = req.body;

    const client = await pool.connect();

    try {
      const userCheck = await client.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
      );
      if (userCheck.rowCount) {
        res.status(400).json("This username is already Excist");
        return req.body;
      }

      await client.query(
        `INSERT INTO users (username, disctrict, email, fio, gender, jamoat, password, telephone, village, birthday) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          username,
          disctrict,
          email,
          fio,
          gender,
          jamoat,
          password,
          telephone,
          village,
          birthday,
        ]
      );

      res.status(200).json("User Created");
    } catch (err) {
      res.status(400).json("UnExpected Error");
    }
    return req.body;
  }
}

export default Auth;
