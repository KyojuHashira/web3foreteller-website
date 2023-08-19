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

function wipeOutEffect(element, callback, customClass = 'fade-out') {
    element.classList.add(customClass);
    
    const transitionDuration = 800;
    setTimeout(() => {
        element.classList.remove(customClass);
        callback();
    }, transitionDuration);
}

function showResult(finalPhrase, randomSaltMessage = null) {
    const circularWidget = document.querySelector('.circular-widget');

    wipeOutEffect(circularWidget, () => {
        circularWidget.innerHTML = '';
        const newStarsEffect = document.createElement('div');
        newStarsEffect.id = 'stars-effect';
        newStarsEffect.className = 'stars-effect';
        circularWidget.appendChild(newStarsEffect);

        const resultContainer = document.createElement('div');
        resultContainer.className = 'magic-result';
        resultContainer.textContent = finalPhrase;
        resultContainer.setAttribute('data-text', finalPhrase);
        resultContainer.style.opacity = "0";
        circularWidget.appendChild(resultContainer);

        requestAnimationFrame(() => {
            resultContainer.style.opacity = "1";
        });

        if (randomSaltMessage !== null) {
            setTimeout(() => {
                const saltLabel = document.createElement('div');
                saltLabel.className = 'matrix-label';
                saltLabel.textContent = "Your unique magic salt:";
                saltLabel.style.opacity = "0";
                circularWidget.appendChild(saltLabel);

                const saltValue = document.createElement('code');
                saltValue.className = 'matrix-code';
                saltValue.textContent = randomSaltMessage;
                saltValue.style.opacity = "0";
                circularWidget.appendChild(saltValue);

                requestAnimationFrame(() => {
                    saltLabel.style.opacity = "1";
                    saltValue.style.opacity = "1";
                });

            }, 1000);
        }
    });
}



async function getRandomNumberFree() {
    try {
        const web3ForeTellerContract = new web3.eth.Contract(contractABI, contractAddress);
        const result = await web3ForeTellerContract.methods.getRandomNumber().call();
        const randomSteps = Math.floor(Math.random() * 7);
        const finalPhrase = traverseList(Number(result), randomSteps);
        showResult(finalPhrase, "To generate and use magic salt, burn some gas!");
    } catch (error) {
        console.error("Error calling smart contract method:", error);
    }
}


async function getRandomNumberGasBurn() {
    try {
        const web3ForeTellerContract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0];
        
        // Burn some gas
        await web3ForeTellerContract.methods.getRandomSaltFromGasBurn().send({ from: fromAddress, gas: 200000 });

        // Retrieve the random number
        const result = await web3ForeTellerContract.methods.getRandomNumberWithGas().call();

        // Retrieve the randomSalt value
        const randomSaltValue = await web3ForeTellerContract.methods.randomSalt().call();
        const randomSteps = Math.floor(Math.random() * 7);
        const finalPhrase = traverseList(Number(result), randomSteps);

        showResult(finalPhrase, randomSaltValue); 
    } catch (error) {
        console.error("Error calling smart contract method:", error);
    }
}

window.addEventListener("load", () => {
    connectToWeb3();
});
