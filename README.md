# CausalLens — an explainable AI lab

> Make an AI decision easier to question.

![CausalLens visual: inputs flow into a transparent model whose contributions and confidence are visible](outputs/causallens-linkedin-launch.png)

CausalLens is a compact, dependency-free interactive project for learning how an AI-style prediction works. Adjust four fictional applicant signals and see an intentionally simple logistic-regression model produce a probability, local feature attributions, and a counterfactual suggestion.

## What it demonstrates

- **Interactive prediction:** Change experience, portfolio strength, role match, or interview signal and immediately see the model output respond.
- **Inspectable reasoning:** View each input's signed contribution to the model's log-odds before the score becomes a probability.
- **Counterfactual thinking:** Explore the smallest model-side change that could reach the "strong shortlist" threshold.
- **Critical AI literacy:** Learn why correlation is not causation, why explanations are local to a model, and why interpretable systems can still be unfair.

## Run locally

No installation or API key is required.

1. Clone or download this repository.
2. Open `index.html` in a current web browser.
3. Adjust the controls and inspect the output.

## How it works

The entire model is intentionally visible in `app.js`. Inputs are normalized, multiplied by fixed weights, added to a baseline intercept, and passed through a sigmoid function:

```text
probability = 1 / (1 + e^-(intercept + sum(weight × input)))
```

This is a learning model, not a production AI system. The scenario is fictional; it does not use personal data and must never be used to evaluate real people.

## Project structure

```text
index.html   # Page content and learning material
styles.css   # Responsive visual design
app.js       # Transparent model and interactivity
outputs/     # Launch visual for sharing the project
```

## Why this project is different

Many AI demos hide the model. CausalLens makes its small model and its limitations explicit: weights describe learned patterns rather than causes; explanations depend on the specific model and input; and transparency alone does not make an automated decision fair.
