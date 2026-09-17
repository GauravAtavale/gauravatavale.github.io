---
layout: post
title: The Curve That Explains Modern AI Scaling"
date: 2026-09-17 10:00:00 -0400
tags: [ai, reinforcement-learning]
excerpt: "An introduction to the REINFORCE algorithm, one of the fundamental policy gradient methods in reinforcement learning."
---

Classical statistics says: past a certain size, bigger models get worse.
Deep learning scaling law says: bigger models, more data, more compute — just keep getting better.
Both are true, and the reason is a curve called double descent 📉
When test error is plotted against model size and you don't get one smooth line — you get two dips with a hump in between:
Small model → underfits → bigger helps, as expected.
Small model → underfits → bigger helps, as expected.
Just-big-enough model → the danger zone. Not "too many parameters," but just barely enough to memorize the entire training set, noise included. Test error spikes here.
Just-big-enough model → the danger zone. Not "too many parameters," but just barely enough to memorize the entire training set, noise included. Test error spikes here.
Very large model → error falls again, often lower than before.
Very large model → error falls again, often lower than before.
The same curve shows up with more training data and more training steps, too — which is the real point. At the "just-big-enough" size, there's essentially only one function that fits the data, and it's forced to memorize noise along with signal. Push past it, and there are many fitting solutions — gradient descent tends to find the ones that generalize well.
This is the mechanism hiding behind scaling laws: pushing past the danger zone with more parameters, data, and compute isn't reckless — it's what gets you out of it.