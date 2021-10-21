# Blockchain-Tasks
A dapp in where you can create your own tasks using the blockchain and Metamask!

For runing this app you should install:
Truffle: https://www.trufflesuite.com/docs/truffle/getting-started/installation
Ganache: https://www.trufflesuite.com/ganache
You should have installed Metamaks in your browser, if you dont have it: 
https://www.youtube.com/watch?v=OJqaZRpRqXM

After installing Metamask you should establish the connection between Ganache and Metamask, this you can do it via Metamask --> Networks --> Custom RPC
Then you shoul import your Ganache default account to Metamask importing the private key of that account.

After all this is done, run:
$npm install

Then you should deploy the contract to ganache using:
$truffle deploy

And later:
$npm run dev

The application should open in your localhost:3000
You should verify that your Metamak connect to this aplication using the Ganache network.
