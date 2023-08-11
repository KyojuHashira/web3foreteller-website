const phrases = {
    0: "Stars align in favor.",
    1: "The cosmos whispers 'yes'.",
    2: "Fate nods affirmatively.",
    3: "Eclipses cast doubt.",
    4: "Winds blow the other way.",
    5: "The horizon stays dim.",
    6: "Mysteries remain veiled."
};

const contractAddress = "0xDe9F6ceDda947d8484807b68475DDA5A18Fb89BF";
const contractABI = [
    {
        "inputs": [],
        "name": "getRandomSaltFromGasBurn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRandomNumber",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRandomNumberWithGas",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "randomSalt",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

function traverseList(startIndex, steps) {
    const listLength = Object.keys(phrases).length;
    for (let i = 0; i < steps; i++) {
        startIndex = (startIndex + 1) % listLength;
    }
    return phrases[startIndex];
}

async function connectToWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log("Connected to Web3!");
    } else {
        console.error("Web3 not found. Please install Metamask or use a Web3-enabled browser.");
    }
}

function wipeOutEffect(element, callback) {
    element.classList.add('fade-out');
    
    const transitionDuration = 800;
    setTimeout(() => {
        element.classList.remove('fade-out');
        callback();
    }, transitionDuration);
}

function showResult(finalPhrase) {
    const circularWidget = document.querySelector('.circular-widget');
    const resultContainer = document.createElement('div');
    resultContainer.className = 'magic-result';
    resultContainer.textContent = finalPhrase;
    resultContainer.setAttribute('data-text', finalPhrase);

    wipeOutEffect(circularWidget, () => {
        circularWidget.innerHTML = '';
        const newStarsEffect = document.createElement('div');
        newStarsEffect.id = 'stars-effect';
        newStarsEffect.className = 'stars-effect';
        starsEffect = newStarsEffect;
        circularWidget.appendChild(newStarsEffect);
        circularWidget.appendChild(resultContainer);
    });
}

async function getRandomNumberFree() {
    try {
        const web3ForeTellerContract = new web3.eth.Contract(contractABI, contractAddress);
        const result = await web3ForeTellerContract.methods.getRandomNumber().call();
        const randomSteps = Math.floor(Math.random() * 7);
        const finalPhrase = traverseList(Number(result), randomSteps);
        showResult(finalPhrase);
    } catch (error) {
        console.error("Error calling smart contract method:", error);
    }
}

async function getRandomNumberGasBurn() {
    try {
        const web3ForeTellerContract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0];
        await web3ForeTellerContract.methods.getRandomSaltFromGasBurn().send({ from: fromAddress, gas: 200000 });
        const result = await web3ForeTellerContract.methods.getRandomNumberWithGas().call();
        const randomSteps = Math.floor(Math.random() * 7);
        const finalPhrase = traverseList(Number(result), randomSteps);
        showResult(finalPhrase);
    } catch (error) {
        console.error("Error calling smart contract method:", error);
    }
}

window.addEventListener("load", () => {
    connectToWeb3();
});
