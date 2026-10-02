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

**<u>Jev</u>** is the reference point. It's available only as TypeSafe's hosted API, and its size and architecture aren't published. You describe your questions in each request and it answers with no training at all, which makes it the most capable of the three out of the box. The tradeoff is control: since its weights aren't public, you can use Jev but <u>_never fine-tune it on your own task._</u>

**<u>Laya</u>**  is an open-source model of about 400 million parameters, built on the ModernBERT encoder, and it accepts the same request format as Jev, so it can stand in for Jev with almost no code changes. It's small enough to run on a MacBook Air, and you can fine-tune the entire model on your own data. Its authors present it as a <u>_starting point for fine-tuning rather than a finished zero-shot model._</u>

**<u>CLM-8B</u>**  released in September 2026 by researchers from Stanford and NVIDIA, takes a different approach. It turns the situation and each option into separate representations using a frozen Qwen3-8B model, then compares them using two small trained "heads." That means it can score every legal move in a position at once, and <u>_fine-tuning only touches those small heads, which takes minutes._</u> The catch is hardware: it needs a GPU with around 16 GB of memory.

|                       | Jev                | Laya              | CLM-8B                        |
|-----------------------|--------------------|-------------------|-------------------------------|
| Access                | Hosted API         | Open weights      | Open weights                  |
| Size                  | Not published      | ~400M parameters  | Frozen 8B model + small heads |
| Runs on               | TypeSafe's servers | A laptop          | A GPU                         |
| Can you fine-tune it? | No                 | Yes, fully        | Yes, heads only               |
| Out of the box        | Strong             | Weak              | Weak                          |

So the matchup is one strong, closed generalist against two weak but trainable open models. The question is how far a little training can close that gap.

## Decision-Making in Chess: How Does the Model Choose a Move?

The key constraint in this experiment is that no model searches. A chess engine like Stockfish explores millions of future positions before choosing a move. Here, each model gets one look at the current position and has to decide immediately.

<figure>
<img src="/assets/images/chess_jev_laya_clm/how_a_move_is_chosen.png" alt="Classical ML Curve">
<figcaption>Figure 1. Position + every legal move + rule facts → decision model → a score for each move → play the highest.</figcaption>
</figure>

Each turn, the model sees the position, every legal move, and simple rule facts, such as whether a move would end the game in a draw. It scores the moves and plays the highest.

To fine-tune Laya and CLM, I used Stockfish as a teacher: it scored every legal move in about 30,000 positions, and the models learned to rank moves the same way. Then every pair played a 10-game match.

## A Ten-Minute Fine-Tune Beat Jev

Out of the box, Jev is in a class of its own. After 10-game matches between every pair of models, the picture came down to five findings.

<figure>
<img src="/assets/images/chess_jev_laya_clm/head_to_head.png" alt="Classical ML Curve">
<figcaption>Figure 2. 6×6 crosstable, models ranked by performance.</figcaption>
</figure>

**Jev is by far the strongest zero-shot model.** It won 29 of 30 games against untrained opponents (including random), and every one of those 29 wins ended in checkmate.

**Fine-tuning lifts small open models to Jev's levels and beyond.** Fine-tuned CLM had the best record against Jev, with 4 wins, 5 draws, and 1 loss (65%). Fine-tuned Laya scored 40%.

**Training setup matters more.** Laya v2 (400M parameters) and CLM (8B-based) got the same training data, the same rule facts, and the same Stockfish-based targets. They ended up playing at nearly the same level. To measure move quality, I compared each model's chosen move with Stockfish's best move on the same 300 positions. I recorded how much winning chance each move gave up, where lower is better. A random move gave up 0.231 per move. Laya v2 gave up 0.103 and fine-tuned CLM gave up 0.098. A model 20 times smaller closed almost the whole gap.

<figure>
<img src="/assets/images/chess_jev_laya_clm/move_quality.png" alt="Classical ML Curve">
<figcaption>Figure 3. bar chart of winning chance lost per move. Random 0.231, base CLM 0.219, Laya round 1 0.146, Laya v2 0.103, fine-tuned CLM 0.098</figcaption>
</figure>

**Untrained CLM was worse than random.** It scored just 17% against a bot that picks legal moves uniformly at random.


**You don't need a big budget to run JEV.** Running Jev for all 50 of its games cost under \$2. Training the open models took a few hours on one Colab A100, and CLM's heads trained in about 10 minutes.

With only ten games per matchup, the exact ranking is not definitive—but the larger result is clear: lightweight fine-tuning brought open decision models up to Jev’s level.