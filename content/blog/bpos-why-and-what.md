+++
title = "bpOS: Why and how I made my own bootable container"
date = 2025-08-06
+++

That title sounds dramatic, right?
I like it, at least.

I previously ran primarily Arch on all my systems.
I don't think that it was particularly thoughtful on my part, I followed the "cool kids" of Linux.
Experiences of breakage were rare for me, but I realized I was doing too much playing sysadmin on my own computer.
In the rare occasion something broke I was never sure whether the failure was on the hardware's part or the software's, which cost me a day of debugging.
Granted, I enjoyed that debugging some, but I don't have the time to assess failures on my computer *and* reliably do productive work on it.
The secondary problem I found was the setup time.
If Arch requires a reinstall, better hope you wrote a script, because getting everything the way you like it again is otherwise costs hours.

After a particularly bad breakage, someone pointed me to the Universal Blue project.
If you're unfamiliar, they provide bootable containers.
Bootable containers give you the experience of a Docker container on the desktop.
If something breaks on the image, you can always go back to the last version without an issue, all your data stays safe.

Universal Blue provides images for KDE and GNOME, which was fine for testing but I much prefer my tiling window manager for daily use.
Luckily, their [frontpage](https://universal-blue.org/) mentions the awesome power of the technology they build upon.
Anyone can create their own custom operating system image, and it takes less than 30 minutes to set up (assuming a base level of familiarity with the CLI and Git).

So, I built my own image.
The source is [here](https://github.com/brennenputh/bpOS), although honestly it's not that interesting.
Which is exactly how I wanted it, because the more boring my image setup is, the less work I'll have to do.
I haven't had a single day where my computer breaks entirely yet, because if it ever breaks, I just roll back to the last deployment (or, if it doesn't boot, it does that itself).

Quick sidenote to mention, desktop files are awesome, and now that I have a proper place I can store them, I will be making *far* more.
I now have all sorts of shortcuts that I can launch right from my desktop with my application launcher.
If you look in the repository, you'll see I have a few set up for different web services I use.

I really don't have that much more to say about all of this, I just hope some more people take a look at the awesome work all the members of Universal Blue are doing, and this is my encouragement to continue on for all of them.
If you want to check out their images for yourself, their [website](https://universal-blue.org/) is a good place to start.
If you want to build your own image like I have, check out the [image-template](https://github.com/ublue-os/image-template) repository they set up.

P.S. If you think this is awesome too and want to get involved, contributing is *super* easy.  Documentation, code, even just support are all great ways to help out, and the community loves to welcome new contributors in good faith.
