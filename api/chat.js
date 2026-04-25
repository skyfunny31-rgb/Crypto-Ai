export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: req.body.message || "Hello" }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({
        reply: "❌ " + data.error.message
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({
      reply: "⚠️ Server error: " + err.message
    });
  }
}
