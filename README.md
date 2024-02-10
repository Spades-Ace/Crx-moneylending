# Backened-AES-updated-code-GAmultisig-with-Lending

## The repository hosts the source code for a multi-signature smart contract implemented in the Sophia programming language for the æternity blockchain platform. This smart contract enables secure and decentralized multi-signature transactions based on generalized accounts (GAs).

# SimpleGAMultiSig

**SimpleGAMultiSig** is a multi-signature smart contract implemented in the Sophia programming language for the æternity blockchain platform. It provides a decentralized and secure framework for managing multi-signature transactions based on generalized accounts (GAs). This repository contains the source code for the smart contract, along with documentation and usage guidelines.

## Features

- **Multi-Signature Transactions:** Enable multiple authorized signers to propose, confirm, refuse, or authorize transactions.
- **Fee Protection:** Configure fee protection parameters to prevent unauthorized transactions with excessive fees.
- **Loan Management:** Functionality for lending and borrowing money, with support for loan tracking and repayment.
- **Transaction Consensus:** Transactions require consensus from a predefined number of signers before authorization and execution.
- **Secure and Audited:** Follows best practices for security and has been audited to ensure robustness and reliability.
- **Comprehensive Documentation:** Detailed documentation explaining the contract's functionalities, entrypoints, and usage examples.

## Usage

To deploy the `SimpleGAMultiSig` smart contract on the æternity blockchain platform, follow these steps:

1. Clone the repository:

   ```
   git clone [https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending]
   ```

2. Deploy the contract using the æternity blockchain SDK or web IDE.
3. Customize the contract parameters, such as the number of required confirmations, fee protection settings, and initial signers, according to your requirements.

4. Integrate the contract into your decentralized applications (dApps) or use it as a standalone solution for multi-party transactions.

## Contract Setup

To keep things simple we will be using the web contract compiler

1. head over to the [https://contracts.aepps.com/] and paste the code.

2. Before we Compile and deploy our contracts we would need two things.
   - Superhero Wallet [https://chromewebstore.google.com/detail/superhero/mnhmmkepfddpifjkamaligfeemcbhdne]
   - Test AE cryptocurrency
3. Let's walk through by setting up the Superhero Wallet, it's relatively easy and simple just download the extension from the above link and setup at least 5 accounts. Follow the images below to setup the wallet. (Make sure to look at the red boxes)

<div align="center">
   <img src = "https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending/assets/91803132/f343ee44-b2c4-4533-915d-5b38378d886f">
               
</div>

<div align="center">
   <img src ="https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending/assets/91803132/f6822792-3b90-4f5c-94df-d10ce06d061e">
</div>

<div align="center">
   <img src ="https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending/assets/91803132/84091457-6c4d-4f47-9fa5-5b2085cdc715">
</div>

4. Now, let us claim some Test AE click on this link [https://faucet.aepps.com/]. now copy your wallet address and paste it in the website and hit on "Top Up". Could check your wallet, there will be 5 AE deposited.

<div align="center">
   <img src="https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending/assets/91803132/37cc3019-d0de-4beb-83ac-8f958585cd7d">
</div>

<div align="center">
   <img src="https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending/assets/91803132/f21b2b1b-0dd7-427c-b88a-fb0e2410ce2a">
</div>

5. Now that we have got Test AE into our Wallet lets head over to the IDE [https://contracts.aepps.com/] , now paste the code from "contracts.aes" file from the repository into IDE, connect the wallet and it will ask you to deploy. (Note While connecting to Wallet a sign request will pop up )
   <div align="centre">
      <img src="https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending/assets/91803132/05cf7409-87a8-40e1-b664-de0788cb03ec">
   </div>

   <div align ="center">
      <img src="https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending/assets/91803132/d0cc1079-e74a-4a1d-b42b-ad19ee1e57a5">
   </div>

6. We are finally Done with the Setup , let us now walk through the important functions and how to call them.

## Contract Initialization

1. Time to call the init() {this is similar to a constructor} function. [ stateful entrypoint init(confirmations_required : int, a1 : address, a2 : address, a3 : address, a4 : address) ]
   - It requires a "int" value and 4 addresses seperated by commas.
     <div align="center">
        <img src="https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending/assets/91803132/cb640cc0-4920-461b-ae66-1ba7d4a4b470">
     </div>
2. Deploy the smart contract and sign the transsaction
   <div align="center">
        <img src="https://github.com/albertisaac12/Backened-AES-updated-code-GAmultisig-with-Lending/assets/91803132/02a9b4a7-b9de-4cba-a973-570ce6000810">
     </div>

3. Now Let's Walk through few important functions
   - stateful entrypoint authorize(nonce : int) : bool // this function is used to authorize the proposed txn request . It takes an int value.
   - stateful entrypoint propose(tx_hash : hash, ttl : Chain.ttl) // propose a new tx valid for the given ttl.
   - stateful entrypoint confirm(tx_hash : hash) // signer confirms the current tx . It takes in a txn hash.
   - stateful entrypoint refuse(tx_hash: hash) // refuse the current tx. It takes in a txn hash. It takes in a txn hash.
   - stateful entrypoint revoke(tx_hash : hash) // revoke the current tx and clean state. It takes in a txn hash.
   - stateful entrypoint lend(amount : int, borrower : address) // This function can only called by Lenders(signers) i.e the addresses passed into the init() , it takes in a "int" and "address".
   - stateful entrypoint borrow(amount : int) // This function can be called by any address other than the signers i.e the addresses passed into the init() , it takes in a "int".
   - stateful entrypoint repay(amount : int) // This function can be called to repay the taken loan , it takes an int argumrnt (Note: make sure to pass 1% more fee than what you have borrowed)

## Contributions

Contributions to the `SimpleGAMultiSig` repository are welcome! Here's how you can contribute:

- Report bugs or suggest improvements by opening an issue through the issue tracker.
- Submit pull requests to enhance functionality, optimize code, or address identified issues.
- Participate in discussions to provide feedback, share ideas, and collaborate on future enhancements.

## License

The code in this repository provided is a modified code with lending and borrowing features. The unedited code is provided here [https://github.com/aeternity/ga-multisig-contract]

---
