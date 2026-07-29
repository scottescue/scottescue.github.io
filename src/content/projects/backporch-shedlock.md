---
title: BackPorch ShedLock
summary: A Java 6 and 7 backport of ShedLock for coordinating scheduled tasks across application nodes.
repository: https://github.com/scottescue/backporch-shedlock
language: Java
status: reference
statusLabel: Reference project
technologies:
  - Java
  - Spring
  - JDBC
  - Hazelcast
order: 2
featured: true
---

BackPorch ShedLock brings the core distributed-locking behavior of ShedLock to applications that remain on Java 6 or 7. It prevents equivalent scheduled tasks from running concurrently across nodes by coordinating through JDBC or Hazelcast-backed locks.

## Why it exists

The project addressed a constrained runtime requirement without requiring a broader scheduler replacement. Applications on Java 8 or newer should use the upstream ShedLock library instead.

BackPorch ShedLock is licensed under Apache License 2.0 and retains the upstream ShedLock licensing notices in its repository.
