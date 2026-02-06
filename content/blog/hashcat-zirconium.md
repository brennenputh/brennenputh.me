+++
title = "Using Hashcat (with a Nvidia GPU) on a bootc system"
date = 2026-02-06
+++

This is intended as a future reference, for myself and anyone else who runs into issues.
I have a Nvidia 3060Ti in my desktop, and this is how I got hashcat working with it.

## Symptom

`hashcat` installed via `brew` cannot use the Nvidia GPU.
On further inspection, even `clinfo` cannot see the Nvidia GPU.

## Solution

TL;DR: Use a container!

### Step 1

[Set up podman for Nvidia GPUs](https://podman-desktop.io/docs/podman/gpu).

### Step 2

Create a container which has Nvidia integration.
The one I chose to use is [dizcza/docker-hashcat](https://hub.docker.com/r/dizcza/docker-hashcat), which includes `hashcat` and provides images for all the types of GPUs. The tag I'm interested in is `cuda`.

My strategy was to use `distrobox` to set up nice host integration. Use the following commands.

```sh
distrobox create --nvidia --image dizcza/docker-hashcat:cuda hashcat
distrobox enter hashcat
# Inside the container
distrobox-export /usr/local/bin/hashcat
```

Alternatively, use the below `distrobox-assemble` config.

```
[hashcat]
image=dizcza/docker-hashcat:cuda
nvidia=true
init=true
start_now=false
unshare_all=true
exported_bins="/usr/local/bin/hashcat"
additional_packages="systemd"
```

### Step 3

Use `hashcat` as you normally would from your host system!  `distrobox` should take care of exporting the binary such that it's available to your terminal.

---

Hopefully these steps helped.  If they didn't work, shoot me an [email](mailto:bputh.blog@gmail.com) and I'll see what I can do to help!
