
const app = express();
app.use(express.json());

openai.apiKey = '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';

app.post('/generate-story', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.Completion.create({
      engine: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.8,
    });

    res.json(response.choices[0].text.trim());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating the story.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
