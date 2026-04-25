export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
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

    console.log("Gemini response:", data);

    // 🔴 যদি error আসে
    if (data.error) {
      return res.status(200).json({
        reply: "❌ API Error: " + data.error.message
      });
    }

    // ✅ correct parsing
    let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      reply = "⚠️ AI reply empty (check quota or input)";
    }

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({
      reply: "⚠️ Server error: " + err.message
    });
  }
}
