const { Api } = require('@cennznet/api');
const { Keyring, KeyringPair } = require('@polkadot/keyring');
const fs = require('fs');
const { exit } = require('process');

// A websocket address for some CENNZnet full nodes
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

// Send some transaction to say hello to a CENNZnet blockchain
// message: the thing you want to say
// keyPairPath: the file path to your account.json
// password: password for the keypair file
async function sayHello(message, keyPairPath, password) {
    // Setup a keyring to sign messages
    let keyring = new Keyring({ type: 'sr25519' });
    let keyPairJson = JSON.parse(fs.readFileSync(keyPairPath));
    let myKeyPair = keyring.addFromJson(keyPairJson);
    myKeyPair.decodePkcs8(password); // unlock the keypair

    console.log(`My CENNZnet address is: ${keyring.encodeAddress(myKeyPair.address)}`);

    // Connect to Nikau network full nodes
    let api = await Api.create({ provider: NIKAU_WS });
    console.log(`Connecting to CENNZnet...`);

    // Say hello, signing the message without keypair
    console.log(`Saying hello...\n\n`);
    let txHash = (await api.tx.system.remark(message).signAndSend(myKeyPair));

    return [message, txHash];
}

const [message, keyPairPath, password] = process.argv.slice(2);
if(!message) {
    console.error('please provide a message');
    exit(1);
}
if(!keyPairPath) {
    console.error('please provide the key pair path');
    exit(1);
}
if(!password) {
    console.error('please provide a password');
    exit(1);
}

sayHello(message, keyPairPath, password)
    .then(([message, txHash]) => {
        console.log(`Said hello 🚀: '${message}'\nTx Hash: ${txHash}`)
        exit(0);
    })
    .catch((err) => {
        console.log(`Couldn\'t say hello because: ${err}`)
        exit(1)
    });
