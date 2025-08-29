const express = require("express");

const app = express();
app.use(express.json()); // parse JSON bodies

// ----- CONFIG -----
const FULL_NAME = "gunabhiram_diwan"; 
const DOB_DDMMYYYY = "08062004"; 
const EMAIL = "gunabhiram.22bce9250@vitapstudent.ac.in";
const ROLL_NUMBER = "22BCE9250";

function makeUserId() {
  return `${FULL_NAME}_${DOB_DDMMYYYY}`;
}

// helpers
function isIntegerToken(token) { return /^-?\d+$/.test(token); }
function isAlphaToken(token) { return /^[A-Za-z]+$/.test(token); }
function isPureSpecialToken(token) { return /^[^A-Za-z0-9]+$/.test(token); }
function extractLettersFromToken(token) {
  const matches = token.match(/[A-Za-z]/g);
  return matches ? matches.join("") : "";
}

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: "bfhl" });
});

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const body = req.body;
    if (!body || !Array.isArray(body.data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid request: 'data' must be an array in request body"
      });
    }

    const data = body.data;
    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    const allLetters = [];
    let sum = 0;

    for (const item of data) {
      const token = String(item);

      // collect letters
      const letters = extractLettersFromToken(token);
      if (letters.length) for (const ch of letters) allLetters.push(ch);

      if (isIntegerToken(token)) {
        const n = parseInt(token, 10);
        sum += n;
        if (Math.abs(n) % 2 === 0) even_numbers.push(token);
        else odd_numbers.push(token);
      } else if (isAlphaToken(token)) {
        alphabets.push(token.toUpperCase());
      } else if (isPureSpecialToken(token)) {
        special_characters.push(token);
      } else {
        special_characters.push(token);
      }
    }

    // build concat_string
    const reversedLetters = allLetters.reverse();
    let concat_string = "";
    for (let i = 0; i < reversedLetters.length; i++) {
      const ch = reversedLetters[i];
      concat_string += (i % 2 === 0) ? ch.toUpperCase() : ch.toLowerCase();
    }

    res.json({
      is_success: true,
      user_id: makeUserId(),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`bfhl API running on port ${PORT}`));
