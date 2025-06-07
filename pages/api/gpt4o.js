export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, category } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!category) {
    console.warn("Category not provided in request body.");
  }

  const replicateApiToken = process.env.REPLICATE_API_TOKEN;
  const model = "openai/gpt-4o";

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${replicateApiToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "57a60d57127c950c8abc050eda2b5d058fed42fd1137e0a21b1a0a01e6c964d7",
        input: {
          prompt: `Generate ONLY a creative and engaging pickup line in the style of ${category || 'all'} category. Provide ONLY the pickup line itself, with no introductory or concluding text. Make it unique and memorable. The output should be just the pickup line.`
        }
      })
    });

    const data = await response.json();

    if (response.status !== 201) {
      console.error("Replicate API Error:", data);
      return res.status(response.status).json({ error: data.detail || "Error creating prediction" });
    }

    let prediction = data;
    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const pollResponse = await fetch(prediction.urls.get, {
        headers: {
          "Authorization": `Token ${replicateApiToken}`,
        }
      });
      prediction = await pollResponse.json();
      console.log("Polling status:", prediction.status);
    }

    if (prediction.status === "succeeded") {
      res.status(200).json({ output: prediction.output.join("") });
    } else {
      console.error("Prediction failed:", prediction);
      res.status(500).json({ error: prediction.error || "Prediction failed" });
    }

  } catch (error) {
    console.error('Server error calling Replicate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
