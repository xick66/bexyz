import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const generateTimeline = async () => {
        if (!query) {
            alert('Please enter a name');
            return;
        }

        setResponse('Generating...');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setResponse(data.result);
        } catch (error) {
            setResponse('Error generating content: ' + error.message);
        }
    };

    return (
        <div>
            <Head>
                <title>Life Timeline Generator</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main>
                <h1>Life Timeline Generator</h1>
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a person's name" 
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            generateTimeline();
                        }
                    }}
                />
                <button onClick={generateTimeline}>Generate Timeline</button>
                <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                    {response}
                </div>
            </main>
            <style jsx>{`
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                input, button {
                    margin-top: 10px;
                    margin-right: 10px;
                }
            `}</style>
        </div>
    );
}
