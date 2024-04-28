import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
// Mock database
let users = [];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.send(users);
})
router.get('/:id', (req, res) => {
    const userID = req.params.id;
    // Search for a user with the given ID in the mock database
    const foundUser = users.find((user) => user.id === userID);
    if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
    } else {
        return res.json(foundUser);
    }
    });
router.post('/', (req, res) => {
  const user = req.body;
  
  users.push({ ...user, id: uuidv4() });
  
  res.send(`${user.first_name} has been added to the Database`);
  })  
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    users = users.filter((user) => user.id !== id)
  
    res.send(`${id} deleted successfully from database`);
});
router.patch('/:id', (req, res) => {
    const { id } = req.params;
  
    const { first_name, last_name, email } = req.body;
  
    const userIndex = users.findIndex((user) => user.id === id);
  
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
  
    const user = users[userIndex];
  
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
  
    res.send(`User with the ${id} has been updated`)
});

export default router