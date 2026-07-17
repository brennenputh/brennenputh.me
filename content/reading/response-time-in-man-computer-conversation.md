+++
title = "Response time in man-computer conversational transactions - Robert Miller"
date = 2026-07-15
+++

[PDF Source](dl.acm.org/doi/epdf/10.1145/1476589.1476628)

This little paper quantifies humans and computers experiencing delay differently. It's one of those papers I wish I had considered searching for sooner, but now that I've found it it makes a lot of sense.

It imposes an interesting restriction on form inputs. If the user has made an error, this places a *minimum* of two seconds delay on the response. The reason is that if the user is still mid-input, he may be annoyed or distracted by an error response.

A lot of web forms get this wrong, by immediately providing feedback. In one sense, it makes it feel snappy, but in another sense does contribute to my general annoyance. I wonder if one can change a JS `input` handler to wait at least a second after the input begins. Probably not too hard with something like the following:

```js
const delayedResponse = (inp) => {
	inp.addEventListener("input", () => {
		setTimeout(() => {
			inp.setCustomValidity("Bad input!")
		}, 2000)
	})
}
```

In topic 10, he talks about the time delay between pages of the same document not being more than a single second. If you consider online documentation written for in-order consumption (i.e. [The Rust Book](https://doc.rust-lang.org/stable/book/title-page.html) or the [WPILib Zero-To-Robot](https://docs.wpilib.org/en/stable/docs/zero-to-robot/introduction.html)), would it count as "the same document" enough for this purpose?
