<div align="center">
  <h1>🚀 NexusQueue</h1>
  <p><b>A highly-concurrent, distributed message broker built in TypeScript.</b></p>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
</div>

## 🌟 Overview

NexusQueue is a lightweight alternative to Kafka, built from scratch to demonstrate advanced system design principles:
- **Write-Ahead Logging (WAL)** for crash-fault tolerance.
- **Custom Binary TCP Protocol** for high-throughput, low-latency messaging.
- **Consumer Groups** with offset tracking for horizontal scalability.
- **In-memory Buffer Flushing** to optimize Disk I/O.

## 🏗 Architecture

```mermaid
graph TD
    P[Producers] -->|TCP / Binary Protocol| NQ[NexusQueue Server]
    NQ --> T[Topic Manager]
    T --> WAL[(Write-Ahead Log)]
    T --> MEM[In-Memory Queue]
    MEM --> C[Consumers]
```B��P#�	��vWGF��r7F'FV@��&6��v�B6���R�GG3���v�F�V"�6�����W"�W6W&��R��W�W2�VWVR�v�@�6B�W�W2�VWVP�����7F�����'V�'V��@���7F'@�((����f���< Features
* **At-Least-Once Delivery:** Guaranteed message persistence.
* **Dead Letter Queue (DLQ):** Automatic routing for failed messages.
* **Blazing Fast:** Batch-flushing architecture handles thousands of messages/sec.

## 🤝 Contributing
Contributions, issues and feature requests are welcome!
