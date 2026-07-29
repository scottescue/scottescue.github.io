---
title: BackPorch ShedLock
summary: A Java 6 and 7 backport of ShedLock for coordinating scheduled tasks across application nodes.
context: Preserved as a reference example of solving distributed scheduled-task coordination under legacy runtime constraints.
repository: https://github.com/scottescue/backporch-shedlock
language: Java
status: reference
statusLabel: Unmaintained reference
technologies:
  - Java
  - Spring
  - JDBC
  - Hazelcast
order: 2
featured: true
---

BackPorch ShedLock brings the core distributed-locking behavior of ShedLock to applications that remain on Java 6 or 7. It prevents equivalent scheduled tasks from running concurrently across nodes by coordinating through JDBC or Hazelcast-backed locks.

## Status

This repository is preserved as a portfolio artifact and reference implementation. I do not actively maintain it, review dependency updates, or provide support for production use.

New projects and applications on Java 8 or newer should use the upstream ShedLock library instead.

## Why it exists

The project addressed a constrained runtime requirement without requiring a broader scheduler replacement. It demonstrates a pragmatic approach to extending useful open-source behavior into environments that could not yet adopt the current upstream library.

BackPorch ShedLock is licensed under the Apache License 2.0 and retains the upstream ShedLock licensing notices in its repository.
