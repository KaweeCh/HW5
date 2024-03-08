import Express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { Movie } from "../model/modelTable";
import { Stars } from "../model/modelTable";
import { Creator } from "../model/modelTable";
import { Person } from "../model/modelTable";
export const router = Express.Router();


router.post("/person", (req, res) => {
    const insertReq: Person = req.body;
    let sql =
        "INSERT INTO `person` (`name`,`biography`,`image`)  VALUES (?,?,?)";

    sql = mysql.format(sql, [
        insertReq.name,
        insertReq.biography,
        insertReq.image,
    ]);

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: "Internal Server Error" , err});
        } else {
            res.status(201).json({
                affected_row: result.affectedRows,
                last_idx: result.insertId
            });
        }
    });
});

//Insert Movie
router.post("/movie", (req, res) => {
    const Movie: Movie = req.body;
    let sql =
        "INSERT INTO `movie` (`title`,`year`,`plot`,`poster`,`genre`)  VALUES (?,?,?,?,?)";

    sql = mysql.format(sql, [
        Movie.title,
        Movie.year,
        Movie.plot,
        Movie.poster,
        Movie.genre,
    ]);

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: "Internal Server Error" , err});
        } else {
            res.status(201).json({
                affected_row: result.affectedRows,
                last_idx: result.insertId
            });
        }
    });
});

//stars
router.post('/stars', (req, res) => {
    let star: Stars = req.body;

    let sql = "INSERT INTO `stars` (`person_ID`,`movie_ID`)  VALUES (?,?)"

    sql = mysql.format(sql, [
        star.person_ID,
        star.movie_ID
    ]);

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: "Internal Server Error" , err});
        } else {
            res.status(201).json({
                affected_row: result.affectedRows,
                last_idx: result.insertId
            });
        }
    });
})


router.post('/creator', (req, res) => {
    let creator: Creator = req.body;

    let sql = "INSERT INTO `creator` (`person_ID`,`movie_ID`)  VALUES (?,?)"

    sql = mysql.format(sql, [
        creator.person_ID,
        creator.movie_ID
       
    ]);

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ error: "Internal Server Error" , err});
        } else {
            res.status(201).json({
                affected_row: result.affectedRows,
                last_idx: result.insertId
            });
        }
    });
})