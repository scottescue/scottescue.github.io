---
title: Dropwizard EntityManager
summary: JPA EntityManager integration for older Dropwizard/Hibernate applications.
context: Preserved as a reference example of adapting Dropwizard Hibernate lifecycle behavior for applications built around JPA EntityManager APIs.
repository: https://github.com/scottescue/dropwizard-entitymanager
language: Java
status: reference
statusLabel: Unmaintained reference
technologies:
  - Java
  - Dropwizard
  - Hibernate
  - JPA
order: 3
featured: true
---

Dropwizard EntityManager is an add-on module created for older Dropwizard applications that used JPA `EntityManager` APIs while still wanting managed lifecycle behavior compatible with Dropwizard Hibernate and `@UnitOfWork`.

## Status

This repository is preserved as a portfolio artifact and reference implementation. I do not actively maintain it, review dependency updates, or provide support for production use.

Modern Dropwizard applications should start with the official `dropwizard-hibernate` module and current Dropwizard/Hibernate documentation before considering this approach.

## Design

The module adapts Dropwizard Hibernate's lifecycle and unit-of-work integration for applications built around JPA EntityManager APIs. It demonstrates how I approached framework extension when an application needed JPA-style access while still fitting into Dropwizard's request-scoped unit-of-work model.

The project is licensed under the Apache License 2.0.
