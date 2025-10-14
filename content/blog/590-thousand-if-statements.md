+++
title = "590 Thousand If Statements, For the Web"
date = 2024-08-11
+++

This post was almost entirely inspired by [Andreas Karlson's blog post](https://andreasjhkarlsson.github.io/jekyll/update/2023/12/27/4-billion-if-statements.html) where he details how he created the worst version of an `isOdd` function ever to visit this land.
Andreas's 4 billion if statements cover the whole of 32-bit integers, and ultimately were written in Assembly to avoid compiler limits from C++.
Of course, when I saw this post, I wondered, how crippled would a browser be to read a 4 billion if statement WASM program?

I started my exploration in a similar way: I attempted to write a Rust program that compiled to WASM for the simplest solution.
Using a Python script to generate the if statements, I used the first wasm-pack base I found and gave Rust a shot.
This went well for smaller numbers (under 2^20 or so).  After reaching 2^20, the Rust compile times became absurdly long.
The file with 2^8 if statements compiled in about 10 seconds.  The file with 2^16 took about 8 minutes.
When I tried the file with 2^24 if statements, the Rust compiler still tried, but ultimately I had to go to bed and shut it down after about three hours.
This isn't too surprising, since the Rust compiler is optimized for safety, but I did want a WASM file with 4 billion if statements before the end of the millenia still.

When Rust took too long, I decided the C/C++ to WASM route was probably also improbable for the same reason as in the original rendition.  The compiler won't like a 330GB code file.
I may also have decided this because I really wanted to mess with writing binaries, but that's not the point here.
The point here is that the plan was to write the WASM by hand.

Since I didn't have any prior experience with working with binary formats, I started by compiling a simple WASM program which did a single comparison, and parsed that in order to understand what was going on.
With a single if statement, I was able to begin understanding the binary format.  Here's the quick explanation:

WASM files all start with the following bytes, the first four are a special sequence (equivalent to `\0asm`) and the latter four are a version number.  WASM is on version one at the time of writing.
```
00 61 73 6D 01 00 00 00
```

The next step is the types section.  Quick detour about sections, every one starts with a id and then a [LEB128 encoded number](https://en.wikipedia.org/wiki/LEB128) which defines the length of the section.
The type section has an id of `3` and will contain a single function type, taking a i32 parameter and returning a i32.  Booleans in WASM are represented by i32, returning a `0` or `1`.
```
01 06 01 60 01 7F 01 7F
```
I won't go too far into the details of the type here, you can take a look at the [WASM instruction list](https://webassembly.github.io/spec/core/appendix/index-instructions.html) yourself if you get curious.

The function also has to be defined separately in the function section, which is simple enough.
```
03 02 01 00
```
To translate, we are declaring we are in section id 3, giving it a length of 2, and reporting which types the function has in the func section of the module.
I don't fully understand this bit either, don't worry.  All that's important here is that the compiler expects it.

Finally, the function needs a name, given in the export section.  This is also the section that makes the function available from JavaScript.
```
07 09 01 05 69 73 4F 64 64 00 00
```
The gist of this one is that the ASCII for the function name `isOdd` is encoded into the bytes of the section.

All of this can come together into a simple Python script to write the preamble for our code.
```py,linenos
filename = 'isodd.wasm'

start_bin = bytes([0x00, 0x61, 0x73, 0x6D, 0x01, 0x00, 0x00, 0x00,
                   0x01, 0x06, 0x01, 0x60, 0x01, 0x7F, 0x01, 0x7F,
                   0x03, 0x02, 0x01, 0x00,
                   0x07, 0x09, 0x01, 0x05, 0x69, 0x73, 0x4F, 0x64, 0x64, 0x00, 0x00,
                   0x0A])

with open(filename, 'wb+') as f:
    f.write(start_bin)
```
The final `0A` byte is to start the code section.

With all that tedious work out of the way, now comes the fun part.  Unlike in raw Assembly, the resulting WASM file is exporting a function.  WASM doesn't have anything to the effect of `return true` that we can use.
The easy version of the code in a sane language would've looked like this.
```c++
if (x == 1) return true;
if (x == 2) return false;
...
```
Instead, WASM forces us into a paradigm that looks more like this.
```c++
if (x == 1) return true;
else {
    if (x == 2) return false;
    else { ... }
}
```
This isn't a huge issue, but it forces a slightly different code structure where we have to end all of those else statements at some point.

The other issue is that we can't have all 4 billion if statements in memory at once, or my Linux environment likes to freeze up and kill the process.  Instead, we write byte by byte appending into the file.
This doesn't seem like an issue until you remember that we don't really know how long the code is until we generate it, and I don't want to go back and write into a specific byte of the file because I'm lazy and don't feel like it.
We'll solve that issue later, though, and just focus on getting the code written for now.  I'll pretend I have it solved by making a variable and dealing with it later.
```py
function_size = 32 # This is incredibly wrong
```

For the actual code part, the concept is simple.  WASM is a stack-based language, which means you do operations by pushing values onto the stack.
To do the simple comparison (`if (x == 1)`), it takes four steps.  First, grab the local variable (`x`) with the bytes `20 00`, `20` meaning get a local variable, and `00` being the first one.
Second, push the constant value to compare with onto the stack with `41 ??`, `41` being load constant and `??` being our number to load.  The number is encoded in LEB128 format, which will make life a little harder later, but not much.
Third, compare the two and leave that value on the stack with `46`, which is the instruction for `==` in WASM.
Fourth, the if statement is represented with `04 7F`, with `04` being the if and `7F` being the return type of i32.
Fifth, to write our code inside this if statement, `41 ??` returns whether the value resulted in true or false.
Finally, the end of the if statement is capped off with a `else`, with `05`.

The only thing left to do then is create one more branch for anything that doesn't fit these values, and cap off all those if statements with end statements.
The full code for all of this is below.
```py,linenos
with open(filename, 'ab') as f:
    # section size
    f.write(leb128.u.encode(function_size + 1 + len(leb128.u.encode(function_size))))
    # locals passed
    f.write(bytes([0x01]))
    # function size
    f.write(leb128.u.encode(function_size))
    # no-op
    f.write(bytes([0x00]))

    for i in range(0, limit):
        # local.get 0
        f.write(bytes([0x20, 0x00]))
        # i32.const i
        f.write(bytes([0x41]) + leb128.u.encode(i))
        # i32.eq
        f.write(bytes([0x46]))
        # if (return i32)
        f.write(bytes([0x04, 0x7F]))
        # if block
        f.write(bytes([0x41]) + leb128.u.encode((i) % 2))
        # else
        f.write(bytes([0x05]))
        # else block is the next if

    f.write(bytes([0x41, 0x02]))

    for i in range(0, limit + 1):
        f.write(bytes([0x0B]))
```

Now it is time to return to the issue earlier of figuring out the code size before we've written the code.  Turns out, this is a simple enough problem to solve iteratively, and since I'm lazy, I did that.
There might be a smarter mathematical way of doing this.
```py,linenos
function_size = 4
for i in range(0, limit):
    function_size += 10
    if i != 0:
        function_size += 1 + math.floor((math.log2(i)) / 7)
    else:
        function_size += 1
```
The reason for the `math.floor` bit is because of the LEB128 encoding.  Every time the number grows by 7 powers of 2, it gains an extra byte of code size per if statement.

After all this, I finally have a Python script capable of writing the program I want.
You'll notice I have a `limit` variable used in the earlier two snippets for convenience, so I can quickly change the number of if statements.

Let's start with a size of 2^8 if statements, just to make sure it's working.
```bash,linenos
> python generator.py
Calculating function size...
Total time for calculating function size: 5.4430000091088004e-05s
Writing file...
Writing file... progress: 32/2980 bytes
```
When I run it using a quick index.js I whipped up with `isOdd(1)`, I get a value of `true`.  Exactly what I wanted, and the WASM parses correctly!
A quick test with 2^16 gives the same result, so I decide to go ahead and try a value of 2^32.
After an hour, it's still running.  Must be stuck writing the file, right?  Nope, it's stuck in the `function_size` bit.

I tried in vain to optimize it to the point where it won't take many hours to calculate the function size, but while testing, I stumbled across something unfortunate.
A limit of 2^24 causes the WASM compiler within Firefox to give up.  Turns out, WASM has a hard limit on the size of a function body.
There was no need to finish optimizing so that I could have my 2^32 WASM file, my dreams have been dashed.
I did some playing to reach the exact number, and the max limit I could reach via this strategy was `590063`.

Within the time I set aside for this project, I couldn't quite solve this.  The only idea I have to get around this hard limit is to start dividing into multiple functions.
For that, though, you have to dynamically generate the functions as well, so I decided to let this one rest for now.  Perhaps I shall return someday, and a browser will load a WASM file containing all 4 billion if statements.
