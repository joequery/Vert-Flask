
title="""[SOLVED] warning: Insecure world writable dir"""
description=""""""
time="""2011-09-21 Wed 20:53 PM"""
excerpt="""I've had my face-palm moment for the day.

While searching for how to solve the annoying ruby alert of "Insecure world writable dir", the fact that I was on a FAT32 partition completely skipped my mind. The chmod/chown commands tutorials told me to execute weren't working, and my mind was blown. If you're an Ubuntu user working on a FAT32 partition, <b>you can't change file permissions</b>!""" 

