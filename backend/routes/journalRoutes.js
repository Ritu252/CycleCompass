const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addJournal,
    getJournalEntries,
    deleteJournal
} = require("../controllers/journalController");

router.post("/", authMiddleware, addJournal);

router.get("/", authMiddleware, getJournalEntries);

router.delete("/:id", authMiddleware, deleteJournal);

module.exports = router;