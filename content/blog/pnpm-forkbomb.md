+++
title = "My accidental pnpm forkbomb"
date = 2026-09-17
+++

I did something funny by accident the other night.

I have been working on a project where I have two subprojects, `web` and `backend`. To write the `package.json`, I took advantage of an example I had lying around. That example had its scripts set up as follows.

```json
"scripts": {
    ...
    "dev": "concurrently -n web,backend -c green,blue \"npm run dev --workspace web\" \"npm run dev --workspace backend\"",
    "backend": "npm run dev --workspace backend",
    "web": "npm run dev --workspace web",
    ...
}
```

There were a few more, but mostly just different variations of these. Now, knowing that `npm` is fairly similar to `pnpm` in usage, I assumed I could just replace `npm` with `pnpm` in all of these places. So I did so. I then ran `pnpm dev` to test it out.

My terminal then filled up with a bunch of blue and green, and the processes *wouldn't stop spawning*. I literally couldn't even kill the processes, because `kill` was malfunctioning at the CPU and memory pressure I had. Turns out, this configuration will not run things in the workspaces, it will instead run it in the root without questioning that pesky `workspace` flag. Ergo, `pnpm dev` immediately started a subprocess running `pnpm dev`, which recursed infinitely, creating a forkbomb. Even worse, the `concurrently` call made it spawn *two* processes per iteration. My roommate, watching from across the room, laughed at me as I forkbombed my laptop 3-4 times trying to debug this one.

All that to say, don't try to use the `--workspace` flag with `pnpm`. Go google the proper way to set up a monorepo, and use the `-r` flag to automatically recurse into the appropriate subprojects. Save yourself the reboots.

(I guess, also don't put `pnpm dev` as the `dev` script. That's the other lesson.)
