import express from 'express';
import bmiCalculator from './bmiCalculator'

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong')
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;
  const bmi = bmiCalculator(String(height), String(weight))
  if (bmi === "malformatted parameters") {
    res.send({error: bmi})
  } else {
    console.log(bmi)
    res.send({weight: weight, height: height, bmi: bmi})
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})