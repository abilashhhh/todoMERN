require('dotenv').config();

const config = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);

const User = require("./models/user.model");
const Note = require("./models/notes.model");

const express = require("express")
const cors = require("cors")
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");


app.use(express.json());

app.use(
    cors({
        origin: "*"
    })
)

app.get("/", (req, res) => {
    res.json({ data: "hello" })
});

// signUp
app.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Full name is required" })
    }

    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "Email is required" })
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is required" })
    }

    const isUser = await User.findOne({ email: email });
    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists"
        })
    }


    const user = new User({
        fullName, email, password
    })

    await user.save();

    const accessToken = jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '3600m' }
    )

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful"
    })

})

// login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "Email is required" })
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is required" })
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.json({
            error: true,
            message: "User not found. Please signup"
        })
    }

    if (userInfo.email === email && userInfo.password === password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3600m" })

        return res.json({
            error: false,
            message: "Login successful",
            email,
            accessToken
        })
    } else {
        return res.json({
            error: true,
            message: "Invalid credentials",
        })
    }
})

//add-note
app.post("/add-note", async (req, res) => {
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title) {
        return res
            .status(400)
            .json({ error: true, message: "Title is required" })
    }
    if (!content) {
        return res
            .status(400)
            .json({ error: true, message: "Content is required" })
    }

    try {
        const note = new Note({
            title, content, tags: tags || [], isPinned, userId: user._id
        })
        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successsfully"
        });
    } catch (error) {
        return res.json({
            error: true,
            message: "Internal server error"
        });
    }
})

app.listen(8000)

module.exports = app;