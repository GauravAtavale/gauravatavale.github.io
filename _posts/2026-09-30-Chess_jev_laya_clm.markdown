---
layout: post
title: "Chess_jev_laya_clm"
date: 2026-09-30 10:00:00 -0400
# published: false
tags: [ai, reinforcement-learning]
excerpt: "--"
---

<figure>
  <video autoplay loop muted playsinline>
    <source src="/assets/images/chess_jev_laya_clm/jev_vs_clm_ft.mp4" type="video/mp4">
  </video>
  <figcaption>Figure 2. Model playing chess against the baseline.</figcaption>
</figure>

On September 15, 2026, TypeSafe AI came out of stealth with a model called **Jev**, and it felt like the industry changed overnight. **Jev** isn't a language model in the usual sense. It doesn't generate text; it returns calibrated probabilities over options you define in advance, an approach TypeSafe calls a **"System One"** model. On its own workflow evaluations, TypeSafe claims **Jev** is 193.6 times faster and 444.6 times cheaper than using a large language model, and it charges \$0.042 per million input tokens. The reaction was immediate: its launch video drew 36 million views in two days, and within nine days TypeSafe was reportedly negotiating a \$1 billion-plus round at a valuation of around \$10 billion.

Alternatives arrived almost as fast. Because Jev isn't open source, the community published its own reproductions almost immediately, and open-weight decision models like **Laya (ConvAI)** and **CLM-8B (Stanford / NVIDIA researchers)** now promise the same kind of fast, typed decisions, but with weights you can download, run, and fine-tune yourself.

TypeSafe's numbers come from structured business tasks. I wanted to see what happens when you put these models in a genuinely ambiguous setting, where the right move depends on what happens several turns down the line: chess.

Two questions drove the experiment:

1. How well do decision models handle an ambiguous, long-horizon task like chess, where they can't look a single move ahead?
2. Can open-weight models match or beat Jev if we're allowed to fine-tune them?

I set up a tournament between **Jev**, **Laya**, and **CLM-8B**, first untrained and then after fine-tuning the open models on positions labeled by the chess engine Stockfish. The game above is one answer: a fine-tuned open model, trained for about ten minutes, checkmating Jev in 22 moves.
