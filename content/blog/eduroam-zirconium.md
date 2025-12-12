+++
title = "Connecting to eduroam from Zirconium (and other non-DE systems)"
date = 2025-12-12
+++

I decided to set myself up with [Zirconium](https://github.com/zirconium-dev/zirconium) yesterday on my Framework 13.
When I booted into Aurora (my chosen image to rebase from) I got the wifi working immediately.
When I booted into Zirconium after switching, the wifi no longer worked.

When trying to connect manually via nmtui, it would give me a message along the lines of "AP security could not be confirmed" and stop connecting.
Other, non-enterprise networks worked fine.
To fix this, I finally found [https://campus-rover.gitbook.io/lab-notebook/fiiva/infrastructure/linux_terminal_eduroam_setup] this post which describes how to connect to eduroam from a terminal.

The steps are as follows:

1. Find your network adapter with `ip link`.

2. Create the connection with `nmcli con add type wifi con-name "eduroam" ifname $INTERFACE ssid "eduroam" wifi-sec.key-mgmt wpa-eap 802-1x.identity "$USERNAME" 802-1x.password "$PASSWORD" 802-1x.system-ca-certs yes 802-1x.eap "peap" 802-1x.phase2-auth mschapv2`.  Replace `$USERNAME` and `$PASSWORD` with the connection details you would use when connecting through a GUI.  Replace `$INTERFACE` with the WiFi interface you found in step 1.

3. Bring the connection up with `nmcli connection up eduroam --ask`.

Hopefully this goes out to help someone, because this took me *far* too long yesterday to debug.
