import  {GoogleGenerativeAI}  from '@google/generative-ai';


const api_key = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(api_key);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };

const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const { query } = req.body;
    const prompt = `I will give you any person's name, create their life timelines highlighting important incidents and stints in the below format:
        be Greg Brockman,
        spawn in North Dakota, nothing but tundra and sadness
        an analytical genius, dominating the domains of math, chemistry, and computer science
        win a silver medal for the US team of chemistry in South Korea, my boys an Olympian
        attend Harvard (nothing but the best for Brock the hawk)
        Harvard students are too dumb, drop out and go to MIT
        they still can't meet his expectations, drop out AGAIN and found stripe with the Collison brothers
        stripes valuation reaches 3.5 billion but Greg simply doesn't care about money
        leaves to co-found openAI
        train the Dota 2 bot and beat a professional esports player
        contribute to OpenAI's codex tool
        contribute to the creation of GPT models as CTO of openAI
        his journey has just begun 

        be Elad Gil
        born in Israel, Technion grad
        works at Google, learns the ropes
        becomes an angel investor, funds Wish, Instacart
        founds Color Genomics, DNA testing company
        publishes “High Growth Handbook”, startup guide
        joins Sequoia Capital as a partner
        invests in companies like Instacart, Wish, Opendoor, Brex, and Carta
        invests heavily in crypto and blockchain companies
        mentors countless founders, the guru of the startup world
        always building, always innovating

        be Ilya Sutskever
        born in Russia, in Gorky (now Nizhny Novgorod)
        moves to Israel
        attends University of Toronto, studies under Geoffrey Hinton
        joins Hinton's research company
        becomes a research scientist at Google Brain after acquisition
        co-authors "AlexNet," groundbreaking deep learning paper
        develops the LSTM neural network architecture
        becomes Chief Scientist of OpenAI
        architects the GPT series of language models
        changes the world with AI, the journey continues

        keep the points short and if you have more incredible info include more points but dont make a single point longer.
        keep all the points straight to the point, no bullshit philosophy
        Give me the life timeline just like this for ${query}
        
        Give me their life timeline in the same format as the above examples
        
        Please don't lie about anyone or give incorrect response. `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        res.json({ result: text });
    } catch (error) {
        res.status(500).json({ error: 'Error generating content: ' + error.message });
    }
}
