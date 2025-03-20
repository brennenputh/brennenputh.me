+++
title = "Thoughts on Teaching Text Editing"
date = 2025-03-19
+++

### Why?

A friend recently asked me the question that's been around since the dawn of editors: "Is it best to teach someone programming with a pure text editor or with an IDE?"
There is some bias to the formation of the question.
No one who did not believe a text editor was objectively better for one reason or another would ask it with that wording.
In response, I tried to take a reasonable position allowing both IDEs and text editors for teaching.
Our short discussion spawned another in my opinion more interesting question in my mind, however.

What editing tools **should** be taught to programming students?

### How?

My mind immediately cries out that they should start with the basics.
Nothing but a empty Vim buffer and a small cheatsheet for whatever language they're being taught first.
Then, they learn the fundamentals of exactly which character goes where, and they have a deep understanding of the syntax.

**Wait.** Of the _syntax_?

Perhaps I'll write up my full opinions on this later, but suffice it to say for now that syntax should not be the goal of teaching programming.
Of course, you need a framework, so you teach someone how to express something in syntax.
I'm not insane enough (yet) to propose a pure pseudocode curriculum, and besides, that would only swap one sort of syntax for another.

What I want is for the syntax and design of the language not to get in the way of learning.
Unfortunately, there is no way around syntax at a fundamental level.
At some point the language must be in the learning programmer's way, and I don't think that's a bad thing.
So if we can't improve the language, the tooling is the next best thing.
I believe there exist a few tools which both do not inhibit learning and are ubiquitous among languages (unless you write your own, I suppose).

#### In-Editor Code Analysis

I can hear the comments now. "You've practically just allowed an IDE!"
Look. There comes a time to make people watch their syntax carefully as they write it.
It's not while you're learning how a computer thinks.

The faster the feedback loop, the better the learning.
The amount of people I've helped who waited to compile until they were done typing a whole bunch of incorrect code, simply because compiling takes a lot of keystrokes, is insane.
While teaching "compile and test often" is good, _it should not take 20 keystrokes to check your syntax is right_.

#### Code Formatter

Cedarville (where I'm getting my bachelors), at the very least, has a C++ and Java programming format policy.
I highly appreciate the effort.
Only, code formatters solved that problem a while ago.
There's an opinionated formatter for basically every commonly taught language, and it should be standard to leave most of the formatting to it.

Some examples in modern (and not modern) programming languages:

- [clang-format](https://docs.kernel.org/dev-tools/clang-format.html) for C++.
- [rustfmt](https://github.com/rust-lang/rustfmt) for Rust.  It's inbuilt into the Rust install, anyways.
- [black](https://github.com/psf/black) for Python.
- Go just has a inbuilt [command](https://go.dev/blog/gofmt). No need to even install anything.

I omitted Java, because there is no good argument for not using a Java IDE, which should come with all of the tools I mention here and more.

The point is, formatting is something to give to tools.
Standardize a config for your clang-format, not a formal specification document (specifically in the context of teaching).
Especially when languages have begun to bundle these sorts of tools, it's absolutely silly to insist that your format is better.

From a teaching and grading perspective, the formatters also can help.
Most of these tools also have a validate mode to ensure the input code is already formatted.

#### Code Formatter, pt 2

A tool which closes a bracket for you, or maybe spaces out your brackets as you hit `Enter` instead of afterwards.
This is something I went without for a while on my Neovim config, and it was incredibly painful.

![Opening brackets need closed.](https://xkcd.com/comics/\(.png)

<sup>Credit XKCD for the image.</sup>

### An Ending

I consider this document to be a "standard of living" for a new programmer.
Vim and Vim alone is a terrible strategy when we have tools to help.
So long as those tools teach good behavior and get out of the programmer's way as much as possible, I see no reason not to use them.

I will admit, it's also a personal preference.
Helping people who don't format their code nicely until they submit pains every programming instinct I have.
