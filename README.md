<div align=""center"">
  <h1>🚀 AetherMQ</h1>
  <p><b>A highly-concurrent, distributed message broker built in TypeScript.</b></p>
  <img src=""https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"" />
  <img src=""https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"" />
</div>

## 🌟 Overview

AetherMQ is a lightweight alternative to Kafka, built from scratch to demonstrate advanced system design principles:
- **Write-Ahead Logging (WAL)** for crash-fault tolerance.
- **Custom Binary TCP Protocol** for high-throughput, low-latency messaging.
- **Consumer Groups** with offset tracking for horizontal scalability.
- **In-memory Buffer Flushing** to optimize Disk I/O.

## 🏗 Architecture

`mermaid
graph TD
    P[Producers] -->|TCP / Binary Protocol| NQ[AetherMQ Server]
    NQ --> T[Topic Manager]
    T --> WAL[(Write-Ahead Log)]
    T --> MEM[In-Memory Queue]
    MEM --> C[Consumers]
`

## 🚀 Getting Started

`ash
git clone https://github.com/MASTER870-CMD/AetherMQ.git
cd AetherMQ
npm install
npm run build
npm start
`

## ⚙️ Features
* **At-Least-Once Delivery:** Guaranteed message persistence.
* **Dead Letter Queue (DLQ):** Automatic routing for failed messages.
* **Blazing Fast:** Batch-flushing architecture handles thousands of messages/sec.

## 🤝 Contributing
Contributions, issues and feature requests are welcome!
