const { Api } = require('@cennznet/api');
const { Keyring } = require('@polkadot/keyring');

// A websocket address for some CENNZnet full nodes
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

// Send some transaction to say hello to a CENNZnet blockchain
// message: the thing you want to say
// keyPairPath: the file path to your account.json
async function sayHello(message, keyPairPath) {
    // Setup a keyring to sign messages
    let keyring = new Keyring({ type: 'sr25519' });
    let myKeyPair = keyring.addFromJson(keyPairPath);
    console.log(`My CENNZnet address is: ${keyring.encodeAddress(myKeyPair.address)}`);

    // Connect to Nikau network full nodes
    let api = await Api.create(NIKAU_WS);

    // Blockchains like the message in bytes form
    let encodedMessage = new TextEncoder().encode(message);

    // Say hello, signing the message without keypair
    await api.tx.system.remark(encodedMessage).signAndSend(myKeyPair);

    return message;
}

const [message, keyPairPath] = process.argv.slice(2);
let message = "Hello CENNZnet 🌴!";

sayHello(message, keyPairPath)
    .then((message) => console.log(`said hello 🚀: ${message}`))
    .catch((err) => console.log(`couldn\'t say hello because: ${err}`));
