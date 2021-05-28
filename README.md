# Hackathon Setup

Example code to:
1) Connect an `api` session object with a CENNZnet testnet
2) Load a keypair
3) Send a transaction to say hi!

## Install
1) clone the repo
2) `yarn`

## Run it
Supply your message, path to keypair.json and the password
```bash
node index.js "hello CENNZnet!" ./myKeyPair.json  password
```

output 
```
My CENNZnet address is: 5FWEHQqYMN8YCg8yJxKHnon7Dtx4Psp2xnjvKfQqGC6kUwgv
Connecting to CENNZnet...
Saying hello...

Said hello 🚀: 'hello world'
Tx hash: 0x0390f6ea97a38ef762db8c44b4e69c5d7ebf9fed9dd726ce6007162f2d3acef7
```

Go to [UNcover](https://uncoverexplorer.com/?network=Nikau) to view the transaction!
<img width="1248" alt="Screen Shot 2021-05-28 at 14 26 12" src="https://user-images.githubusercontent.com/5133901/119920573-a9e64a80-bfc0-11eb-8512-0a3a9f257da8.png">
