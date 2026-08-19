+++
title = "The Invisible Cost of Responsibility"
date = 2026-08-19
description = "Some reflections on responsibility, and a suggested mathematical model for how it works for certain tools."
+++

The series Eragon contains one of my favorite magic systems. For every action you take with magic, the amount of energy it requires from you is equivalent to the amount of energy it would be to do the action yourself without magic. For example, to cut a blade of grass expends the amount of energy required to separate the stalk. Cutting a thousand requires a thousand times the energy. I like this magic system not only for its balance but its insight.

This system usually balances itself, because one cannot increase the amount of energy available in a given situation. It analogizes well to our usage of tools, although we can't tangibly feel their cost, unlike Eragon's magic. 

I propose the cost in the real world is instead responsibility, being that when something goes wrong with the tool, the buck stops at someone. A given tool's responsibility has a lower bound, the sum of the responsibility for each of its outputs. The better the tool works, the less you have to care about the potential. If the tool stops working entirely, the entirety of the potential actualizes at once. The chance of this comes to something like a multiplier on the responsibility. If I were to state it mathematically, not for precision but for intuition:

$$R = S \times D + E$$

Where `R` represents the responsibility (in units of effort), `S` is the total effort involved in solving problems the tool abstracts away without the tool, `D` is the percent chance of disaster, and `E` is the effort required to fix the tool. If `D` is high, then you really should reconsider the tool entirely, but the `S` term could overwhelm the `D` term anyways.

To continue with the grass analogy, a good way to think of this is like a lawn mower. The bundle of components in a lawn mower, working properly, save vast amounts of time for humans who would otherwise wield sickles. If your lifestyle requires mowing your lawn, then anytime the mower breaks down suddenly you have a new problem to solve. This problem breaks down into many subproblems that the mower was solving for you (one for each swing of the sickle or other alternative tool).

Technically, you're still solving the all of these subproblems regardless of having the mower, but taking away the mower requires you to pay attention to each one. If your mower is reliable, you may never encounter any of these. If it is unreliable, then you may encounter all of them regularly.

Individual people can only bear so much of this responsibility at once. To solve this issue, we create structures to divert responsibility from ourselves in the event of an emergency. Most of them involve changing the target of the responsibility if the problems were ever to actualize. In the prior example, you could hire a mechanic to fix your mower, and as a backup plan have a lawn service you can call. In software, this usually looks like a disclaimer in the README absolving the author of responsibility, or distributing the responsibility between multiple people. The underlying issue at stake: responsibility can indeed be created, but not destroyed. We intuitively understand this. In our legal system we express it that all people and companies are held liable for damages they cause.

Given all of this, I propose a method for evaluating tools, both personally and for business. For the most part, it's a set of questions related to the terms of that equation I suggested earlier (which I'll paste again below for visibility on smaller screens). Your goal is to minimize the $R$ term.

I will also caveat that I only claim this equation to hold for tools which bundle many tasks into one task. It may apply in part to other categories of tools, but will likely bring the wrong aspect into focus or decieve you altogether.

$$R = S \times D + E$$

- `S` term
    - What exact subproblems does this tool abstract away?
    - How much work will it be if it breaks to do the job manually?
    - Are all of the subproblems actually necessary to solve?
- `D` term
    - How reliable is this tool?
    - For the inventor of the tool: How can I decrease the chances of disaster, to take burden off my users?
    - For the user of the tool: Can I do this job more simply, with a lower chance of disaster?
- `E` term
    - Is the tool hard to fix?
    - Is the tool expensive to fix (relative to what I can easily afford)?
    - Would trying to solve the subproblems mentioned in $S$ overwhelm me such that I cannot fix the tool?

Evaluating tools this way helps to see that hidden cost, which drives so much pain for even discerning inventors.

As a postscript, I offer a challenge. I am unsure that responsibility is the right language to describe this hidden cost. If anyone else can find a better word for what I have described as responsiblity I am describing and explain why, send me an email!
