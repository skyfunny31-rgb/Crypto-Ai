export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: req.body.message }]
          }]
        })
      }
    );

    const data = await response.json();

    console.log("FULL RESPONSE:", JSON.stringify(data)); // debug

    let reply = "No response";

    if (data.candidates && data.candidates.length > 0) {
      const parts = data.candidates[0].content.parts;
      reply = parts.map(p => p.text).join(" ");
    }

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
