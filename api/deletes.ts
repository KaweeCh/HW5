import Express from "express";
import { conn } from "../dbconnect";

export const router = Express.Router();


router.delete("/movie/:id", (req, res) => {
    const movieId = +req.params.id;

    conn.query("DELETE FROM stars WHERE movie_id = ?", [movieId], (starsErr, starsResult) => {
        if (starsErr) {
            throw starsErr;
        }
        conn.query("DELETE FROM creator WHERE movie_id = ?", [movieId], (creatorsErr, creatorsResult) => {
            if (creatorsErr) {
                throw creatorsErr;
            }
            conn.query("DELETE FROM movie WHERE movie_id = ?", [movieId], (movieErr, movieResult) => {
                if (movieErr) {
                    throw movieErr;
                }

                res.status(200).json({
                    affected_rows: {
                        stars: starsResult.affectedRows,
                        creators: creatorsResult.affectedRows,
                        movie: movieResult.affectedRows
                    }
                });
            });
        });
    });
});

//delete Person
router.delete("/person/:id", (req, res) => {
    const personId = +req.params.id;


    conn.query("DELETE FROM stars WHERE person_id = ?", [personId], (starsErr, starsResult) => {
        if (starsErr) {
            console.error("Delete stars error:", starsErr);
            res.status(500).json({ error: "Internal Server Error", err: starsErr });
        } else {
            conn.query("DELETE FROM creator WHERE person_id = ?", [personId], (creatorsErr, creatorsResult) => {
                if (creatorsErr) {
                    console.error("Delete creators error:", creatorsErr);
                    res.status(500).json({ error: "Internal Server Error", err: creatorsErr });
                } else {
                    conn.query("DELETE FROM person WHERE person_id = ?", [personId], (personErr, personResult) => {
                        if (personErr) {
                            console.error("Delete person error:", personErr);
                            res.status(500).json({ error: "Internal Server Error", err: personErr });
                        } else {
                            res.status(200).json({
                                affected_rows: {
                                    stars: starsResult.affectedRows,
                                    creators: creatorsResult.affectedRows,
                                    person: personResult.affectedRows
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});


//Delete Stars
router.delete("/stars/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("DELETE FROM stars WHERE starID = ?", [id], (err, result) => {
        if (err) throw err;
        res.status(200).json
            ({ affected_row: result.affectedRows });
    })
})

//Delete Creator
router.delete("/creator/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("DELETE FROM creator WHERE creatorID = ?", [id], (err, result) => {
        if (err) throw err;
        res.status(200).json
            ({ affected_row: result.affectedRows });
    })
})