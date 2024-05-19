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
        <div className="min-h-screen flex flex-col items-center justify-start bg-white text-black p-8">
            <Head>
                <title>Life Timeline Generator</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className="flex flex-col items-center w-full">
                <h1 className="text-4xl font-bold mb-4">Life Timeline Generator</h1>
                <div className="flex items-center mb-8">
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
                        className="p-3 rounded-full border border-primary focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <button onClick={generateTimeline} className="p-3 rounded-full bg-primary hover:bg-secondary transition-colors ml-4">
                        Generate
                    </button>
                </div>
                <div className="text-lg mt-4 text-left w-full max-w-2xl">
                    {response && (
                        <div className="mb-8">
                            <ul className="list-disc list-inside">
                                {response.split('\n').map((line, index) => (
                                    <li key={index}>{line}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="card-container">
                    <div className="card">
                            <h2 className="font-bold">1.</h2>
                            <p>be Andrej Karpathy<br />
                            born in Czechoslovakia, grew up in Canada<br />
                            learns programming at an early age, fascinated by AI and games<br />
                            attends University of British Columbia, studies engineering and physics<br />
                            rolls out the DeepDream and Stylizer projects as a research intern at Google<br />
                            finishes Masters at UBC and Stanford PhD in Artificial Intelligence<br />
                            joins Tesla in 2016, leads computer vision and autonomous driving<br />
                            plays a key role in Tesla's Autopilot and Full Self-Driving<br />
                            announces his departure from Tesla in 2023<br />
                            co-founded the AI research company OpenAI<br />
                            joins OpenAI as an employee again in 2023</p>
                        </div>
                        <div className="card">
                            <h2 className="font-bold">2.</h2>
                            <p>be David Holz,<br />
                            spawn in Ohio, Buckeye state of mind<br />
                            left the familiar grounds for Cambridge, MIT bound<br />
                            computer science whiz, mind sharp as a knife<br />
                            worked at Google, engineering with drive<br />
                            yearning for more, leaving the nest to start Leap Motion<br />
                            a wearable gesture recognition firm, innovation in motion<br />
                            Leap Motion acquired by Ultraleap, mission accomplished<br />
                            founded Midjourney, a different path charted<br />
                            AI-powered image generation, creativity liberated<br />
                            embracing the metaverse, shaping the future's mold<br />
                            journey ongoing, the story yet to be told</p>
                        </div>
                        <div className="card">
                            <h2 className="font-bold">3.</h2>
                            <p>be Elad Gil<br />
                            born in Israel, Technion grad<br />
                            works at Google, learns the ropes<br />
                            becomes an angel investor, funds Wish, Instacart<br />
                            founds Color Genomics, DNA testing company<br />
                            publishes “High Growth Handbook”, startup guide<br />
                            joins Sequoia Capital as a partner<br />
                            invests in companies like Instacart, Wish, Opendoor, Brex, and Carta<br />
                            invests heavily in crypto and blockchain companies<br />
                            mentors countless founders, the guru of the startup world<br />
                            always building, always innovating</p>
                        </div>
                        <div className="card">
                            <h2 className="font-bold">4.</h2>
                            <p>be Demis Hassabis,<br />
                            born in London, a child prodigy<br />
                            play chess at a young age, becomes a master by age 13<br />
                            attend Cambridge University, study computer science<br />
                            found "DeepMind Technologies" in Canada<br />
                            win video game development contest with "Evil Genius"<br />
                            study neuroscience at Cambridge University, phD<br />
                            sells DeepMind to Google for over $600 million<br />
                            leads Google DeepMind, a machine learning powerhouse<br />
                            develop revolutionary AI techniques for drug discovery, materials science<br />
                            wins Turing award, the "Nobel prize of computer science"<br />
                            his journey is far from over, AI revolution in progress</p>
                        </div>
                        <div className="card">
                            <h2 className="font-bold">5.</h2>
                            <p>be Gavin Wood,<br />
                            born in England<br />
                            recognized as a child prodigy in mathematics<br />
                            studied computer science at the University of York<br />
                            founded Ethereum along with Vitalik Buterin<br />
                            developed Solidity, a programming language for Ethereum<br />
                            co-founded Parity Technologies, a leading blockchain infrastructure company<br />
                            developed Polkadot, a multi-chain blockchain framework<br />
                            helped found the Web3 Foundation, a non-profit organization promoting decentralized web technologies<br />
                            the mind behind the Web3 movement<br />
                            a pioneer in the field of blockchain and distributed computing</p>
                        </div>
                        <div className="card">
                            <h2 className="font-bold">6.</h2>
                            <p>be John Schulman<br />
                            raised in New York City<br />
                            attends Carnegie Mellon for undergrad, studies computer science<br />
                            moves to Berkeley for his PhD where he works in AI under Pieter Abbeel<br />
                            interns at Google in reinforcement learning under Sergey Levine<br />
                            joins OpenAI upon finishing his PhD<br />
                            leads development of Proximal Policy Optimization and Soft Actor-Critic algorithms<br />
                            contributes to OpenAI's Safety Gym and Universe<br />
                            becomes co-founder and VP of research at OpenAI<br />
                            his research has a significant impact on the field of reinforcement learning</p>
                        </div>
                        <div className="card">
                            <h2 className="font-bold">7.</h2>
                            <p>be Reid Hoffman<br />
                            born in Palo Alto, California<br />
                            Stanford grad, studied computer science<br />
                            Apple rejected him, changed his life for the good<br />
                            joined Fujitsu after some bouncing around<br />
                            meets Peter Thiel, joins Thiel's PayPal mafia<br />
                            COO at PayPal, designed their anti-fraud systems<br />
                            left PayPal as a millionaire<br />
                            founded LinkedIn, the professional networking site<br />
                            LinkedIn becomes a huge success, now worth billions<br />
                            builds a venture capital firm, Greylock Partners<br />
                            mentor to many successful founders, including Elon Musk<br />
                            co-founds Inflection AI, an AI-powered talent company<br />
                            chairman of the Partnership for a New Economy<br />
                            continues to invest and mentor, shaping the tech industry</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}