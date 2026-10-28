# DataCamp Credentials — Florian Braun

→ [data.braunf.com](https://data.braunf.com/)

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg) ![Hosted on GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-222.svg)

A static showcase of my 25 verified DataCamp credentials: 5 certifications, 8 course and track credentials, 10 foundations courses, and 2 bachelor specialization courses. Every credential also links to a local PDF copy in `assets/certificates/`.

## What the site does

- A home page with animated totals, the five certifications shown as their real certificates, and what the credentials cover.
- A preview of the actual certificate on every one of the 25 cards (rendered from the PDFs in `assets/certificates/` into `assets/certs/`), linking to the PDF.
- A copy button on every credential ID, a cursor spotlight on cards and a gentle tilt on certificate previews. Reduced motion turns the movement off.
- **all.html**: every credential on one page with search, filters for type, year and skill, a chart of when each was earned (click a month to filter), and sorting. Filters live in the URL, so a filtered view can be shared as a link.
- A verified badge on every card: "Verifiable on DataCamp" only when the credential has a DataCamp verification link (12 of 25), otherwise "PDF certificate on file".
- Totals counted from the certificates themselves (dates and course lengths), such as 48 hours of courses.
- A certificate viewer: click any preview to open the certificate large, browse the set with the arrow keys or by swiping, copy the ID, open the PDF or verify it on DataCamp. Without JavaScript (or with a modifier key) the preview is still a plain link to the PDF.
- "The year, in order": a timeline from the first to the latest credential with a running total of course hours. Each month links to the filtered list. Press `/` on `all.html` to jump to search.
- Smooth page-to-page transitions in browsers that support them.
- A "Back" button that returns to the braunf.com page the visitor came from.

To regenerate the images after adding a PDF, render page 1 of each file in `assets/certificates/` to a 960 px wide webp in `assets/certs/` and a 1600 px wide one in `assets/certs/lg/` (same base name). `assets/js/creds.js` holds the title, date, ID and verification link the viewer shows for each file.

## Certifications

| # | Title | ID | Date | PDF |
|---|-------|----|------|-----|
| 01 | [Data Engineer](https://www.datacamp.com/certificate/DE0018248106652) | DE0018248106652 | May 2026 | [PDF](assets/certificates/certification-data-engineer-DE0018248106652.pdf) |
| 02 | [Data Scientist](https://www.datacamp.com/certificate/DS0028859688856) | DS0028859688856 | May 2026 | [PDF](assets/certificates/certification-data-scientist-DS0028859688856.pdf) |
| 03 | [Associate Data Scientist](https://www.datacamp.com/certificate/DSA0017638872370) | DSA0017638872370 | May 2026 | [PDF](assets/certificates/certification-associate-data-scientist-DSA0017638872370.pdf) |
| 04 | [Python Data Associate](https://www.datacamp.com/certificate/PDA0018740159645) | PDA0018740159645 | May 2026 | [PDF](assets/certificates/certification-python-data-associate-PDA0018740159645.pdf) |
| 05 | AI Fundamentals | AIF0021124919473 | Oct 2025 | [PDF](assets/certificates/certification-ai-fundamentals-AIF0021124919473.pdf) |

## Course Credentials

| # | Course | Skills | Status | PDF |
|---|--------|--------|--------|-----|
| 01 | [Multi-Modal Models with Hugging Face](https://www.datacamp.com/completed/statement-of-accomplishment/course/05dd46097cacb0fcda53f2c672fcf418a78dc3a9) | Hugging Face, Vision-Language, Transformers | ✅ Sep 2026 | [PDF](assets/certificates/course-multi-modal-models-with-hugging-face-47600066.pdf) |
| 02 | [Natural Language Processing (NLP) in Python](https://www.datacamp.com/completed/statement-of-accomplishment/course/906e5a5606947147f3c5ef6dcdf7af74a07c8ae7) | NLP, Hugging Face, Tokenization | ✅ Sep 2026 | [PDF](assets/certificates/course-natural-language-processing-nlp-in-python-50148543.pdf) |
| 03 | [Linear Algebra for Data Science in R](https://www.datacamp.com/completed/statement-of-accomplishment/course/4af4fcd3ef0c74ed96353549285bf0e7d374b158) | Linear Algebra, R, PCA | ✅ Sep 2026 | [PDF](assets/certificates/course-linear-algebra-for-data-science-in-r-50154269.pdf) |
| 04 | [Transformer Models with PyTorch](https://www.datacamp.com/completed/statement-of-accomplishment/course/1afc7147bdb538e2e138fff4587d37b1a72f3955) | PyTorch, Deep Learning, NLP | ✅ Mar 2026 | [PDF](assets/certificates/course-transformer-models-with-pytorch-46685001.pdf) |
| 05 | [Developing LLM Applications with LangChain](https://www.datacamp.com/completed/statement-of-accomplishment/course/be5e7b847f1ecfe0040912492161c968b3c9c416) | LangChain, RAG, Prompt Engineering | ✅ Mar 2026 | [PDF](assets/certificates/course-developing-llm-applications-with-langchain-46661646.pdf) |
| 06 | [Intermediate Deep Learning with PyTorch](https://www.datacamp.com/completed/statement-of-accomplishment/course/d78aef5cd39de2975b3c8ae4f00e9b275a53b147) | Deep Learning, PyTorch, CNNs | ✅ Mar 2026 | [PDF](assets/certificates/course-intermediate-deep-learning-with-pytorch-46478958.pdf) |
| 07 | GitHub Foundations (#725,724) | Git, GitHub, Version Control | ✅ Oct 2025 | [PDF](assets/certificates/track-github-foundations-725724.pdf) |
| 08 | AI Fundamentals Track (#956,877) | Generative AI, LLMs, AI Ethics | ✅ Oct 2026 | [PDF](assets/certificates/track-ai-fundamentals-956877.pdf) |

## Foundations — AI Fundamentals & GitHub Foundations Tracks

| # | Course | Track | Status |
|---|--------|-------|--------|
| 01 | Understanding Artificial Intelligence | AI Fundamentals | ✅ Dec 2025 · [PDF](assets/certificates/course-understanding-artificial-intelligence-43791842.pdf) |
| 02 | Understanding Machine Learning | AI Fundamentals | ✅ Dec 2025 · [PDF](assets/certificates/course-understanding-machine-learning-44900148.pdf) |
| 03 | Understanding ChatGPT | AI Fundamentals | ✅ Dec 2025 · [PDF](assets/certificates/course-understanding-chatgpt-44892108.pdf) |
| 04 | Large Language Models (LLMs) Concepts | AI Fundamentals | ✅ Oct 2026 · [PDF](assets/certificates/course-large-language-models-llms-concepts-45264783.pdf) |
| 05 | Generative AI Concepts | AI Fundamentals | ✅ Oct 2026 · [PDF](assets/certificates/course-generative-ai-concepts-50191062.pdf) |
| 06 | AI Ethics | AI Fundamentals | ✅ Oct 2026 · [PDF](assets/certificates/course-ai-ethics-50191722.pdf) |
| 07 | Introduction to Git | GitHub Foundations | ✅ Oct 2025 · [PDF](assets/certificates/course-introduction-to-git-43809080.pdf) |
| 08 | Intermediate Git | GitHub Foundations | ✅ Oct 2025 · [PDF](assets/certificates/course-intermediate-git-43813325.pdf) |
| 09 | Introduction to GitHub Concepts | GitHub Foundations | ✅ Oct 2025 · [PDF](assets/certificates/course-introduction-to-github-concepts-43816123.pdf) |
| 10 | Intermediate GitHub Concepts | GitHub Foundations | ✅ Oct 2025 · [PDF](assets/certificates/course-intermediate-github-concepts-43849204.pdf) |

## Bachelor Specialization — AI & Data Engineering

| # | Course | Skills | Status | PDF |
|---|--------|--------|--------|-----|
| 01 | [Building Web Applications with Shiny in R](https://www.datacamp.com/completed/statement-of-accomplishment/course/8185c33d2fc2c98587b02a2df54dcaef54b704ad) | R, Shiny, Reactive Programming | ✅ Sep 2026 | [PDF](assets/certificates/course-building-web-applications-with-shiny-in-r-50083998.pdf) |
| 02 | [Introduction to Data Visualization with ggplot2](https://www.datacamp.com/completed/statement-of-accomplishment/course/e5047d1dd7934a01318b8441bb77230dbc918831) | R, ggplot2, Data Visualization | ✅ Sep 2026 | [PDF](assets/certificates/course-introduction-to-data-visualization-with-ggplot2-50086693.pdf) |

## Structure

```
DataCamp/
├── assets/
│   ├── certificates/   (25 credential PDFs)
│   ├── css/style.css
│   └── img/favicon.ico, og-image.png
├── index.html
├── certifications.html
├── courses.html
├── foundations.html
├── specialization.html
├── CHANGELOG.md
└── README.md
```

## Links

[LinkedIn](https://www.linkedin.com/in/braunflorian25/) · [GitHub](https://github.com/lumenworksco) · [Hugging Face](https://huggingface.co/iPwnds) · [Personal Projects](https://projects.braunf.com) · [CalmCampus](https://cc.braunf.com)

## License

Released under the [MIT License](LICENSE).

---

*Built with vanilla HTML/CSS · Hosted on GitHub Pages*
