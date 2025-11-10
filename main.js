const express = require("express");
const {userService} = require("./services/user.service");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/users", async (req, res) => {
    const data = await userService.getAll()
    res.json(data)
})

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await userService.getById(id)
    res.json(user)
})

app.post("/users", async (req, res) => {
    const user = req.body;
    const data = await userService.create(user);
    res.json(data);
})

app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const newUserData = req.body;
    const updatedUser = await userService.update(id, newUserData)

    updatedUser ? res.json(updatedUser) : res.status(404).json();
})

app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const data = await userService.delete(id);
    res.json(data);
})

app.listen(5000, () => {
    console.log("Server started on port: 5000");
})