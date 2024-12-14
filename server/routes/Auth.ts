import express, { Request, Response } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// Register User (Manual)
router.post("/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// Login User (Manual)
router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password!);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "test", { expiresIn: "1d" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

// Google Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login/failed",
    }),
    (req, res) => {
        // console.log(req.user);
        res.redirect("http://localhost:5173/"); // Frontend task page
    }
);

router.get("/current_user", async (req, res) => {
    try {
        console.log(req.user);
        if (req.user) {
            //@ts-ignore
            const user = await User.findOne({ email: req.user.email });
            console.log(user);
            if (!user) return res.status(404).json({ message: "User not found" });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "test", { expiresIn: "1d" });
            res.status(200).json({ token });

        }
        res.status(401).json({ message: "Not logged in" });

    } catch (error) {

    }
});



// Login Failed
router.get("/login/failed", (req, res) => {
    res.status(401).json({ message: "Login failed" });
});

// Logout
router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.redirect("/");
    });
});

export default router;
