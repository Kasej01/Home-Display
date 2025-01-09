const fetch = require('node-fetch');

exports.handler = async () => {
    const apiKey = process.env.TNA_API_KEY; // Securely access the News API key
    const newsApiUrl = `https://api.thenewsapi.com/v1/news/top?locale=us&limit=3&api_token=${apiKey}`;

    try {
        const response = await fetch(newsApiUrl);

        if (!response.ok) {
            throw new Error(`News API Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('News API Response:', data);

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error in getNews function:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
