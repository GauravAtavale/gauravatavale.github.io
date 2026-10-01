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
  <figcaption>Video 1. Fine-tuned CLM (open source) checkmates Jev.</figcaption>
</figure>

On September 15, 2026, TypeSafe AI came out of stealth with a model called **Jev**, and it felt like the industry changed overnight. **Jev** isn't a language model in the usual sense. It doesn't generate text; it returns calibrated probabilities over options you define in advance, an approach TypeSafe calls a **"System One"** model. On its own workflow evaluations, TypeSafe claims **Jev** is 193.6 times faster and \444.6 times cheaper than using a large language model, and it charges \$0.042 per million input tokens. The reaction was immediate: its launch video drew 36 million views in two days, and within nine days TypeSafe was reportedly negotiating a \$1 billion-plus round at a valuation of around \$10 billion.

Alternatives arrived almost as fast. Because Jev isn't open source, the community published its own reproductions almost immediately, and open-weight decision models like **Laya (ConvAI)** and **CLM-8B (Stanford / NVIDIA researchers)** now promise the same kind of fast, typed decisions, but with weights you can download, run, and fine-tune yourself.

TypeSafe's numbers come from structured business tasks. I wanted to see what happens when you put these models in a genuinely ambiguous setting, where the right move depends on what happens several turns down the line: chess.

Two questions drove the experiment:

1. How well do decision models handle an ambiguous, long-horizon task like chess, where they can't look a single move ahead?
2. Can open-weight models match or beat Jev if we're allowed to fine-tune them?

I set up a tournament between **Jev**, **Laya**, and **CLM-8B**, first untrained and then after fine-tuning the open models on positions labeled by the chess engine Stockfish. The game above is one answer: a fine-tuned open model, trained for about ten minutes, checkmating Jev in 22 moves.


## Meet the three models

All three models work the same way from the outside: you give them a situation and a typed question, and they return a probability for every possible answer in a single pass. Under the hood, and in how you can use them, they're very different.

**<u>Jev</u>** is the reference point. It's available only as TypeSafe's hosted API, and its size and architecture aren't published. You describe your questions in each request and it answers with no training at all, which makes it the most capable of the three out of the box. The tradeoff is control: since its weights aren't public, you can use Jev but never fine-tune it on your own task.

**<u>Laya</u>**  is an open-source model of about 400 million parameters, built on the ModernBERT encoder, and it accepts the same request format as Jev, so it can stand in for Jev with almost no code changes. It's small enough to run on a MacBook Air, and you can fine-tune the entire model on your own data. Its authors present it as a starting point for fine-tuning rather than a finished zero-shot model.

**<u>CLM-8B</u>**  released in September 2026 by researchers from Stanford and NVIDIA, takes a different approach. It turns the situation and each option into separate representations using a frozen Qwen3-8B model, then compares them using two small trained "heads." That means it can score every legal move in a position at once, and fine-tuning only touches those small heads, which takes minutes. The catch is hardware: it needs a GPU with around 16 GB of memory.

|                       | Jev                | Laya              | CLM-8B                        |
|-----------------------|--------------------|-------------------|-------------------------------|
| Access                | Hosted API         | Open weights      | Open weights                  |
| Size                  | Not published      | ~400M parameters  | Frozen 8B model + small heads |
| Runs on               | TypeSafe's servers | A laptop          | A GPU                         |
| Can you fine-tune it? | No                 | Yes, fully        | Yes, heads only               |
| Out of the box        | Strong             | Weak              | Weak                          |

So the matchup is one strong, closed generalist against two weak but trainable open models. The question is how far a little training can close that gap.