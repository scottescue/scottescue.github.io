---
title: Dropwizard EntityManager
summary: Managed JPA EntityManager integration for Dropwizard applications using Hibernate.
repository: https://github.com/scottescue/dropwizard-entitymanager
language: Java
status: reference
statusLabel: Reference project
technologies:
  - Java
  - Dropwizard
  - Hibernate
  - JPA
order: 3
featured: true
---

Dropwizard EntityManager provides managed access to a Hibernate JPA `EntityManagerFactory` and a shareable, thread-safe `EntityManager` that works with Dropwizard Hibernate's `@UnitOfWork` annotation.

## Design

The module adapts Dropwizard Hibernate's lifecycle and unit-of-work integration for applications that use JPA's EntityManager APIs. It is preserved as a reference implementation for that integration pattern.

The project is licensed under Apache License 2.0.
