const net = require('net');

const client = new net.Socket();
client.connect(8080, '127.0.0.1', () => {
    console.log('Connected to AEtherMQ');
    
    console.log('\n--- 1. Publishing messages ---');
    const pub1 = JSON.stringify({ command: 'PUBLISH', topic: 'default', payload: { event: 'user_signup', userId: 1 } });
    const pub2 = JSON.stringify({ command: 'PUBLISH', topic: 'default', payload: { event: 'user_payment', amount: 50 } });
    
    client.write(pub1 + '\n');
    client.write(pub2 + '\n');

    setTimeout(() => {
        console.log('\n--- 2. Polling messages (Offset 0) ---');
        const poll = JSON.stringify({ command: 'POLL', topic: 'default', offset: 0 });
        client.write(poll + '\n');
    }, 500);
});

client.on('data', (data) => {
    console.log(`Server Response: ${data.toString().trim()}`);
});

client.on('close', () => {
    console.log('Connection closed');
});
