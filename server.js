const express = require("express");
const os = require("os");
const { execSync } = require("child_process");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome! Visit <a href='http://localhost:3000//ntop'>/ntop</a> to see system info.");
});

app.get("/ntop", (req, res) => {
    const fullName = "Your Full Name"; // Replace with your actual name
    const username = os.userInfo().username;
    const serverTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Run the 'top' command (Linux/macOS)
    let topOutput;
    try {
        topOutput = execSync("top -bn1").toString();
    } catch (error) {
        topOutput = "Error fetching top command output.";
    }

    // Return an HTML response
    res.send(`
        <h1>Name: ${fullName}</h1>
        <h2>User: ${username}</h2>
        <h2>Server Time (IST): ${serverTime}</h2>
        <pre>${topOutput}</pre>
    `);
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}/ntop`);
});
