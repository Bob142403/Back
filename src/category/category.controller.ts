import { Request, Response } from "express";
import { connect, pool } from "../../database/pool";

class Category {
  async getDataByUserId(req: Request, res: Response) {
    const client = await pool.connect();
    const userId = +req.params.userId;
    try {
      const userDatas = await client.query(
        `SELECT * FROM category WHERE userid = $1`,
        [userId]
      );
      res.status(200).json(userDatas);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async insert(req: Request, res: Response) {
    const client = await pool.connect();

    const {
      group1,
      group2,
      group3,
      group4,
      group5,
      group6,
      group7,
      group8,
      group9,
      group10,
      group11,
      group12,
      group13,
      userId,
      date,
    } = req.body;

    try {
      await client.query(
        `INSERT INTO category (group1, group2, group3, group4, group5, group6, group7, group8, group9, group10, group11, group12, group13, userId, date) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          group1,
          group2,
          group3,
          group4,
          group5,
          group6,
          group7,
          group8,
          group9,
          group10,
          group11,
          group12,
          group13,
          userId,
          date,
        ]
      );

      res.status(200).json("User Created");
    } catch (err) {
      res.status(400).json("UnExpected Error");
    }
  }
}

export default Category;
