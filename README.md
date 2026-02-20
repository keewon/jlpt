# JLPT Quiz App

A browser-based interactive quiz app for studying Japanese Language Proficiency Test (JLPT) N5 and N4 levels. No frameworks, no build tools — just plain HTML, CSS, and JavaScript.

## Features

- **Two JLPT levels**: N5 (265 questions) and N4 (308 questions)
- **Multiple question types**: Reading, Writing, Context Vocabulary, Synonyms, and Grammar
- **Weak questions mode**: Automatically tracks your mistakes and lets you focus on problem areas
- **Randomized choices**: Answer order is shuffled each time to prevent memorization by position
- **Keyboard support**: Press 1–4 to select answers, Enter/Space to advance
- **Persistent stats**: Progress is saved in localStorage across sessions
- **Mobile-friendly**: Responsive design optimized for phones

## Demo

Try it online: **https://keewon.github.io/jlpt**

## Getting Started

No installation needed. Just serve the files with any static server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
├── index.html          Main HTML
├── app.js              Quiz logic
├── style.css           Styling
└── data/
    ├── n5.json         265 N5 questions
    └── n4.json         308 N4 questions
```

## Question Types

| Type | Description |
|------|-------------|
| Reading (読み) | Choose the correct reading for underlined kanji |
| Writing (書き) | Choose the correct kanji for underlined kana |
| Context (文脈語彙) | Select the word that fits the sentence context |
| Synonym (類義表現) | Pick the expression closest in meaning |
| Grammar | Choose the correct grammatical form or particle |

## How It Works

1. Select a JLPT level (N5 or N4)
2. Choose a question type filter (or "All")
3. Answer 20 randomly selected questions per session
4. Review wrong answers with explanations at the end
5. Retry missed questions or start a new quiz

## Tech Stack

- Vanilla JavaScript (ES5)
- CSS3 with custom properties
- No dependencies, no build step
