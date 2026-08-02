const db = require("../config/db");

exports.addJournal = (req, res) => {

    const { title, content, entry_date } = req.body;

    const user_id = req.user.id;

    const sql =
        `INSERT INTO journal_entries
        (user_id,title,content,entry_date)
        VALUES(?,?,?,?)`;

    db.query(
        sql,
        [user_id, title, content, entry_date],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Journal Saved Successfully"
            });

        }
    );

};


exports.getJournalEntries = (req, res) => {

    const user_id = req.user.id;

    const sql =
        `SELECT *
         FROM journal_entries
         WHERE user_id=?
         ORDER BY entry_date DESC`;

    db.query(sql, [user_id], (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};


exports.deleteJournal = (req, res) => {

    const user_id = req.user.id;

    const id = req.params.id;

    const sql =
        `DELETE FROM journal_entries
        WHERE id=?
        AND user_id=?`;

    db.query(sql, [id, user_id], (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({
            message: "Deleted Successfully"
        });

    });

};