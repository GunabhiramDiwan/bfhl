# Bajaj Finserv Health (BFHL) – API Task

## Objective
Build and host a REST API (Method: POST) that takes in an array and returns the following:

1. Status  
2. User ID  
3. College Email ID  
4. College Roll Number  
5. Array for odd numbers  
6. Array for even numbers  
7. Array for alphabets (converted to uppercase)  
8. Array for special characters  
9. Sum of numbers  
10. Concatenation of all alphabets in reverse order with alternating caps  

---

## Tech Stack
- **Node.js**  
- **Express.js**  
- **Railway** (for deployment)  

---

## API Endpoints

### 🔹 POST `/bfhl`
Takes a JSON input and returns processed data.

**Example Request**
```json
{
  "is_success": true,
  "user_id": "gunabhiram_diwan_08062004",
  "email": "gunabhiram.22bce9250@vitapstudent.ac.in",
  "roll_number": "22BCE9250",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}

Deployed URL

👉 https://bfhl-production-2c09.up.railway.app/bfhl
