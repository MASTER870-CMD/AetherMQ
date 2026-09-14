<div align="center">
  <h1>🚀 AetherMQ</h1>
  <p><b>A highly-concurrent, distributed message broker built in TypeScript.</b></p>
</div>

## 🌟 Overview
AetherMQ is a fully functional message broker built from scratch. It handles real TCP traffic, persists messages using a Write-Ahead Log (WAL) with crash recovery, and supports Pub/Sub via Topics.

## 🏗️ Architecture
AetherMQ is designed with a modular architecture focusing on performance and reliability:
- **TCP Acceptor & Framer**: Manages raw socket connections, buffering, and extracting discrete JSON frames from continuous TCP streams.
- **Message Router**: Routes parsed commands to the appropriate handler (Publish, Subscribe, Acknowledge).
- **Storage Engine (WAL)**: An append-only log that sequentially writes commands to disk to guarantee persistence.
- **In-Memory State**: Maintains topics, consumer groups, and queue states for lightning-fast message delivery.

## ⚙️ Core Features
* **100% Functional TCP Server:** Handles TCP stream buffering and parses newline-delimited JSON commands.
* **Crash-Fault Tolerance:** Uses a Write-Ahead Log (`.wal`). If the server dies, it parses the `.wal` file on restart and perfectly reconstructs the queues.
* **Batch-Flushing WAL:** Messages are held in an in-memory buffer and flushed to disk every 100ms to eliminate Disk I/O bottlenecks.

## 🚀 How to Test it Locally
1. **Start the server:**
   ```bash
   npm run build
   npm start
   ```

2. **Run the Test Client (in a new terminal):**
   ```bash
   node scripts/test_client.js
   ```
