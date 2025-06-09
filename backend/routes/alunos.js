const express = require("express");
const router = express.Router();
const { registrarAluno, loginAluno } = require("../controllers/alunosController");

router.post("/registro", registrarAluno);
router.post("/login", loginAluno);

module.exports = router;
