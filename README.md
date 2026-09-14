<div align="center">
  <h1>🚀 AetherMQ</h1>
  <p><b>A highly-concurrent, distributed message broker built in TypeScript.</b></p>
  <br />
  <p>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />
  </p>
</div>

## 🌟 Overview
AetherMQ is a fully functional message broker built from scratch. It handles real TCP traffic, persists messages using a Write-Ahead Log (WAL) with crash recovery, and supports Pub/Sub via Topics.

## 🏗️ Architecture
AetherMQ is designed with a modular architecture focusing on performance and reliability:
- **TCP Acceptor & Framer**: Manages raw socket connections, buffering, and extracting discrete JSON frames from continuous TCP streams.
- **Message Router**: Routes parsed commands to the appropriate handler (Publish, Subscribe, Acknowledge).
- **Storage Engine (WAL)**: An append-only log that sequentially writes commands to disk to guarantee persistence.
- **In-Memory State**: Maintains topics, consumer groups, and queue states for lightning-fast message delivery.

## 💾 Storage Mechanics: The Write-Ahead Log
To provide extreme throughput without sacrificing reliability, AetherMQ implements a custom Write-Ahead Log (WAL):
- **Durability Guarantee**: Every mutating operation is recorded in the `.wal` file before the client receives an acknowledgement.
- **Batching & Flushing**: To avoid I/O bottlenecks, operations are buffered in memory and asynchronously flushed to disk every `100ms`.
- **Crash Recovery**: On boot, the engine sequentially replays the WAL to reconstruct the exact state of all topics and queues up to the exact moment of failure.

## 📡 Protocol Specification
AetherMQ communicates over raw TCP using Newline-Delimited JSON (NDJSON).
Each payload must be a valid JSON object followed by a `\n` character.

### Publish
```json
{"type": "PUBLISH", "topic": "events", "payload": {"user": 1, "action": "login"}}
```
### Subscribe
```json
{"type": "SUBSCRIBE", "topic": "events"}
```

## ⚙️ Configuration
AetherMQ can be customized via environment variables:
| Variable | Description | Default |
| -------- | ----------- | ------- |
| `PORT` | TCP Port to bind the server | `8080` |
| `WAL_FLUSH_INTERVAL` | WAL flush frequency in ms | `100` |
| `DATA_DIR` | Directory for persistence files | `./data` |
| `MAX_CLIENTS` | Max concurrent TCP connections | `10000` |

## 🚀 Local Setup & Testing
1. **Clone & Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Broker:**
   ```bash
   npm run build
   npm start
   ```

3. **Run the Interactive Test Client:**
   ```bash
   node scripts/test_client.js
   ```

## 🤝 Contributing
Contributions are always welcome! Feel free to open an issue or submit a Pull Request.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
