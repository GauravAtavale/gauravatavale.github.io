---
layout: post
title: Why does scaling make models generalize better?
date: 2026-09-17 10:00:00 -0400
tags: [scaling laws, llm, double descent, machine-learning, neural-networks, data-wall]
excerpt: "Bigger models were supposed to overfit. Instead they generalize better the larger they get. Here's the mechanism behind that — double descent, compression, and the simplicity bias hiding inside scale — and why the data wall is where it stops being free."
---

## The theory said stop. Nobody stopped.

How big should the model be? It is a question every training run has to answer before it starts, and one where the field's theoretical foundations and its empirical results give opposite advice.

Classical statistical learning theory says that capacity is a tax. Beyond the point where a model is flexible enough to capture the structure in the data, extra parameters go toward fitting noise, and test error turns back upward. The bias-variance curve is a U, and the practitioner's job is to find its floor. This is not folk wisdom - it falls straight out of the bias-variance decomposition, and it guided model selection successfully for decades. Regularization, early stopping and cross-validation are all built on the assumption that the upward half of that curve is real.

What people observed when they started training much larger models was the opposite. Add parameters, data and compute together and the loss keeps falling, predictably, across many orders of magnitude, with no turn upward anywhere. Nor was this a quirk of language models - the same steady improvement had turned up across vision, speech and translation years earlier.

So the theory predicts a floor, and the measurements refuse to find one. Frontier models now sit orders of magnitude past the size where error should have started climbing, trained on data that is certainly noisy, and the climb has not arrived.

Both cannot be right — unless the question is wrong.

## When bigger meant worse

The clearest way to see the classical picture is to train the same model family at increasing sizes and watch training and test loss simultaneously.

Training loss only ever goes down. A bigger model has more freedom to bend toward the points it was shown, so it fits them better and better, and with enough capacity it fits them exactly.

Test loss does something else. Early on it falls alongside training loss, because the extra flexibility is being spent on real structure the smaller model was too rigid to capture. Then it bottoms out. Then it starts climbing, while training loss keeps dropping — and that widening gap between the two is the whole of the classical warning. The model is still improving on the data it has seen and getting worse on the data it hasn't. What it has started fitting is noise: the quirks of these particular training examples, which do not recur in test data.

<figure>
<img src="/assets/images/scaling_laws/classical_curve_widening_gap.svg)" alt="Double descent curve">
<figcaption>Test loss dips, rises, then falls again past the interpolation threshold.</figcaption>
</figure>


This is the bias-variance trade-off. Too little flexibility and the model misses real structure. Too much and it fits accidents. The theory of the era made this precise. It measured a model's flexibility by asking how much it could fit — a class flexible enough to fit any labelling you threw at it counted as very flexible, and VC dimension was the standard way of putting a number on that. Every guarantee had the same shape. More flexibility, weaker guarantee. So the advice was simple: use the smallest model that fits. Unused flexibility is not free.

The universal approximation theorems, proved at the end of the 1980s, showed that a network with a single hidden layer can approximate any continuous function on a bounded domain as closely as you like, given enough hidden units. In the 2010s this became a talking point about the promise of neural networks. At the time it read as confirmation of the warning. A model class that can represent anything can certainly represent your noise — and the theorems said nothing about how many units that might take, or whether training would ever find the approximation they promised.

Underneath all of it ran a piece of folklore that borrowed its authority from Wolpert's no-free-lunch theorem, usually without stating it. The theorem says that if every possible way the world could behave is treated as equally likely, then averaged across all of them, no learning algorithm does better than any other. That is true and it is proved. Hold onto the conditional — the gap between what the theorem assumes and what the field took it to mean is where this story ends.

And sitting quietly alongside all of this was a result that should have caused trouble. In 1992, Amari and colleagues derived learning curves in which generalization error decays as a clean power law in the number of training examples. Predictable improvement with scale, in print, decades before anyone had a name for it.

## The anomaly

Two independent works from 2017 revealed major problems in the classical picture.

The first came from a group at Baidu. Hestness and colleagues swept dataset size across machine translation, image classification, language modelling and speech recognition, and in every domain generalization error fell as a power law in the amount of data — a straight line on a log-log plot, across orders of magnitude. Two things stood out. A better architecture lowered the error everywhere but did not change how fast it fell as data grew, so that rate of improvement looked like a property of the problem rather than the model. And the parameters needed to fit a dataset of a given size grew as a power law too. Improvement with scale was not just real; it was regular enough to extrapolate.

The second, from Zhang and colleagues, went at the theory directly. They trained standard image classifiers on images whose labels had been shuffled into random noise, and the networks fit the training set perfectly; they swapped the images for noise as well, and the networks fit that too. These were networks that could fit anything at all, yet trained on real data the same networks generalized fine.

Put the two together and the classical prediction breaks where it was most confident. Improvement with scale is predictable enough to bet on, and the reason error was supposed to eventually reverse — too much flexibility, too much capacity to fit noise — does not describe what these networks actually do. The field had a reliable curve and no theory for it.

That missing theory is what Belkin and Nakkiran supplied — not by adding a bound to the curve, but by showing the curve had been drawn too short.

In 2019, Belkin and colleagues extended the plot past the point where everyone had stopped looking. Train a model family at growing sizes and, as before, test error falls, bottoms out, then climbs — the classical warning, playing out on schedule. But keep going. Just as the model becomes large enough to fit the training set exactly, test error peaks — and then, as the model grows further, it falls a second time, often below the best value the classical regime ever reached. One curve, two descents. They named it double descent.

Later that year, Nakkiran and colleagues at OpenAI showed how general the pattern was. The second descent appears as you enlarge the model, as you add data, and as you train for longer — the same shape along three separate axes. And they located the peak precisely: it sits at the interpolation threshold, the point where the model is just barely able to fit the training set. Not "too many parameters." Just barely enough.

That threshold is the key to the whole picture. Model size relative to it gives three regimes, and the danger is not at either end but in the middle.

Below the threshold, the model is too small to fit the training data, so it does the best it can: it spends its limited capacity on the strongest, most general structure and leaves the rest. Both training and test error fall together as capacity grows. This is the classical regime, and inside it the classical advice holds.

At the threshold, the model has just enough capacity to fit the training set exactly, and no more. That turns out to be the worst place to be, and it is where the ascent leads. With only enough room to pass through every training point, the model has no freedom in how it does so — there is essentially one function available that fits, and it is forced to bend through every example, including the noisy ones. Fitting the data and memorizing its quirks become the same act, because the model cannot do one without the other. Test error peaks here, and it peaks highest when the data is noisy — exactly what you would expect if fitting noise is the cause.

Above the threshold, capacity exceeds what is needed to fit the data, and the picture inverts. Now many different functions fit the training set exactly, not just one, and the model settles on a simple one — a smoother function that passes through the same points, and a smoother function that fits the data is also one that generalizes better. Extra capacity past the threshold is no longer more room to memorize noise. It is more room to fit the data and stay simple at once, and that is what the model does with it.

Nakkiran's team was careful about what they could and could not claim. That many good functions exist above the threshold is clear; that gradient descent reliably finds them, they flagged as something they observed but could not yet explain. The mechanism was visible in outline. The account of *why* would take a few more years to fill in — and that account took a few more years to arrive.

## When industry scaled ahead of theory

By the time double descent had a name, the labs were already living past the peak, out in the second descent.

In January 2020, Kaplan and colleagues at OpenAI turned the scattered observations into a discipline: test loss fell as a power law in model size, data, and compute at once, each holding over orders of magnitude, and a fixed budget could now be spent by rule rather than by guess. Two years later, DeepMind's Chinchilla paper corrected the recipe — parameters and data should grow together, not with the budget poured mostly into size — and showed the payoff by beating a model three times larger. How these curves are actually fit is worth an article of its own; Lilian Weng has written the definitive one, and I will point there rather than repeat it.

What matters for this story is the timing: the industry was already scaling hard before the theory existed. The biggest models of 2019 were trained months before the double descent paper appeared that December, and the first scaling-laws paper followed it by only weeks. Nobody scaled because double descent gave them permission; the labs scaled because it kept working, and the theory arrived alongside the practice rather than ahead of it. The two OpenAI papers even shared an author in Ilya Sutskever and came out of the same building within weeks of each other — two halves of one question worked at once, though nobody was claiming one caused the other. The curve was being industrialized. The reason it was safe to ride was still open.

That reason was being worked out elsewhere, by people mostly outside the scaling conversation, and they had taken up the exact question the random-label experiments had left unanswered: if these networks can fit anything at all, why do they generalize (Zhang et al., 2017) ? The classical tools were silent, because they count what a model *could* fit, and by that count a large network is off the scale. Answering it meant changing the instrument.

Follow that track back to its start and it begins a few years earlier. In 2017, Dziugaite and Roy produced the first generalization guarantee for a deep network that was actually worth stating — earlier bounds were so loose they amounted to "the error could be almost anything," while this one gave a real number. They did it by measuring not the size of the model but how much it could be compressed without damaging what it had learned. In 2022, Lotfi and colleagues — with Andrew Gordon Wilson among them — pushed the same idea far enough to produce the tightest such bounds yet, and in doing so found the result that closes the loop. Larger models, they showed, can be compressed *more* than smaller ones, not less. In their words, this encapsulates Occam's razor: the bigger network does not merely tolerate its size, it uses the extra room to find a solution simpler than a smaller model could have expressed.

That single word — compression — is where the whole argument turns, and it is worth being exact about why. Count a model's raw parameters and the classical bounds get *looser* as it grows: more parameters, weaker guarantee, error should climb. Measure instead how compressible the trained model is, and the bounds get *tighter* as it grows, because large models compress better. Same networks, same training runs, opposite verdicts — and only the second one matches what actually happens. "Bigger generalizes better" was never true against a raw parameter count. It is true against the right measure of complexity, and finding that measure was the whole game.

These two lines of work ran in parallel for a decade. One community measured how fast loss fell with scale and built an industry on the answer. Another worked out why the extra capacity was not a liability and gave it a rigorous account. They were answering two halves of a single question — *how much does scale help* and *why is it safe* — across the same years, drawing on the same phenomenon, and they barely cited one another. The curve and its explanation were built in separate rooms.

## The data wall — where the cost returns

Every result so far assumed something the early scaling papers stated openly and then set aside: an effectively unlimited supply of fresh data. The escape from the danger zone always meant adding real data alongside parameters, so the model had more genuine signal to spend its growing capacity on. That assumption is now the binding constraint. High-quality unique text is finite, and the argument over how long scaling can continue has a name for the ceiling: **the data wall**. What happens as you approach it was mapped in 2022, when Hernandez and colleagues trained on data that was mostly unique but leaned increasingly on a small repeated fraction. As they leaned harder, test loss got worse and then better again — a double descent.

This is not the curve from earlier. That one ran along model size and peaked where the model could just barely fit the training set; this one runs along data repetition, and peaks where repetition forces the model to memorize the same few examples over and over. The shape is the same in both — too little capacity, a dangerous middle, then recovery — and so is the cause. Trouble arrives when capacity outruns the amount of genuine, non-redundant signal available, whether you get there by shrinking the model toward the data or the data toward the model.

Once repetition is unavoidable, the question becomes how to spend a fixed budget on data that is not fresh. Muennighoff and colleagues studied exactly that in 2023. A token repeated many times stops adding much, and extra parameters stop helping even sooner — so with limited data, train for longer before you build bigger. A model can simply be too large for its dataset — the classical warning, in the vocabulary of scaling.

Muennighoff's fit already carried a penalty for excess model size, but it was added in a way even careful readers struggled to justify. In 2026, Lovelace and colleagues put it on firmer ground by measuring how model size and repetition interact. They found that repetition hurts larger models more, and wrote the damage into the scaling law as an explicit penalty — one that grows with both the number of repeats and the model's size relative to the unique data on hand. Parameters over unique data: a capacity ratio in all but name. The classical cost of too much capacity for too little signal, hidden through a decade of abundant data, written back into the equation once the data wall takes the hiding place away.

Both forms are empirical fits, though: they describe the penalty without explaining why it takes that shape.

## The simplicity hidden in scale

Everything since the interpolation threshold has pointed at a single mechanism: a large network uses its extra capacity to prefer simpler solutions. Wilson has given that mechanism its clearest statement. A large network is not a flexible model held in check by regularization. It is a flexible model that already prefers simple explanations — and the larger it grows, the stronger that preference becomes. In his words, the larger we make a neural net, the stronger its compression bias. Flexibility and simplicity, long treated as opposites, actually move together.

Wilson calls this a soft inductive bias. Rather than shrinking the model to prevent overfitting — the classical prescription — you keep it large and add a gentle preference for the simpler solutions that fit the data. The model can represent anything, noise included, and still lean toward the compressible answers. Occam's razor — the principle that the simplest adequate explanation is usually the best — stops being a rule imposed from outside and becomes a property the architecture and optimizer carry on their own.

This is the resolution to the contradiction we began with. Classical theory said capacity was a tax and error would eventually climb; the measurements said error kept falling with scale. Both were reading from the same broken assumption — that added flexibility must be paid for in generalization. Once flexibility and simplicity are understood to rise together, the classical curve and the scaling curve stop contradicting each other. The first describes the regime before a model can fit its data; the second, the regime after, where extra capacity buys simpler solutions rather than memorized noise. The no-free-lunch theorem survives intact — averaged over every possible problem, no learner beats any other — but that average is taken uniformly over all problems, and real data is not uniform. It is structured, redundant, compressible, and overparameterized networks are built to exploit exactly that.

Scaling laws work because scale and simplicity pull in the same direction. Each new parameter is not just more room to fit the data — it is more room to fit it *simply*, and simple solutions are the ones that generalize. That is the engine beneath the steady, predictable gains from scale. The recent data-constrained work only adds a condition: that engine needs fuel. The free lunch came from compressible data in plentiful supply, and as unique data runs short, the old penalty returns.
