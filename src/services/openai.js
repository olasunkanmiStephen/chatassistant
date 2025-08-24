const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL


export async function generateResponse (message){
    if(!OPENAI_API_KEY){
        throw new Error('API KEY not defined');
    };

    try {
        const res = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4.1-nano",
                messages: [
                    {role: "system", content: "Response only in English, Also Simplify Response"},
                    {role: "user", content: message},
                ]
            })
        })

        if(!res.ok){
            const errorMessage = await res.text();
            console.log("Error response from OPENAI API:", errorMessage);
            throw new Error(`OPENAI API error: ${res.status} ${res.statusText}`);
            
        }

        const data = await res.json();

        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating response: ', error);
        throw error;
    }
}
