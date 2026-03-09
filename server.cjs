const express = require("express");
const path = require("path");
const app = express();

// Serve static files from dist
app.use(express.static(path.join(__dirname, "dist")));

// Handle client-side routing
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3123;
app.listen(port, "0.0.0.0", () => {
  console.log(`Text Converter Server running on http://localhost:${port}`);
});
