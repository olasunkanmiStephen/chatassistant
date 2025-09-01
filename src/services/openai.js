const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export async function generateResponse(message) {
  if (!API_KEY) {
    throw new Error("API KEY not defined");
  }

  try {
    const token = localStorage.getItem("token")


    let endpoint = "/chat";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({message}),
    }

    const res = await fetch(`${API_URL}${endpoint}`, options);

    if (!res.ok) {
      const errorMessage = await res.text();
      console.log("Error response from OPENAI API:", errorMessage);
      throw new Error(`OPENAI API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.aiWeather || data.reply;
  } catch (error) {
    console.error("Error generating response: ", error);
    throw error;
  }
}