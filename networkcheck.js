const chainIdDecimal = 8453;
const chainIdHex = '0x' + chainIdDecimal.toString(16);

if (typeof window.ethereum !== 'undefined') {
    window.ethereum.request({ method: 'eth_chainId' }).then(handleChainChange);
    window.ethereum.on('chainChanged', handleChainChange);
}

function handleChainChange(_chainId) {
    const currentChainId = parseInt(_chainId, 16);
    const btn1 = document.getElementById('notBaseMainnet1');
    const btn2 = document.getElementById('notBaseMainnet2');
    const networkAlert = document.getElementById('networkAlert');
    
    if (currentChainId !== chainIdDecimal) {
        document.getElementById('switchToBaseMainnet').style.display = 'block';

        // disable the buttons
        btn1.classList.add('disabled-button');
        btn1.onclick = null; // remove the onclick event
        btn2.classList.add('disabled-button');
        btn2.onclick = null; // remove the onclick event

        // show the network alert message
        networkAlert.style.display = 'block';
    } else {
        document.getElementById('switchToBaseMainnet').style.display = 'none';

        // enable the buttons
        btn1.classList.remove('disabled-button');
        btn1.onclick = getRandomNumberFree; // re-add the onclick event
        btn2.classList.remove('disabled-button');
        btn2.onclick = getRandomNumberGasBurn; // re-add the onclick event

        // hide the network alert message
        networkAlert.style.display = 'none';
    }
}



document.getElementById('switchToBaseMainnet').addEventListener('click', function() {
    const params = {
        chainId: chainIdHex,
        chainName: 'Base Mainnet',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://1rpc.io/base'],
        blockExplorerUrls: ['https://basescan.org/']
    };

    // First, try to switch to the network
    window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chainIdHex }] })
        .then(() => {
            console.log('Switched to the Base Mainnet');
        })
        .catch((switchError) => {
            // If the network hasn't been added to MetaMask
            if (switchError.code === 4902) {
                window.ethereum.request({ method: 'wallet_addEthereumChain', params: [params] })
                    .then(() => console.log('Network added'))
                    .catch((addError) => {
                        // Check for Chain ID mismatch
                        if (addError.code === -32603 && addError.message.indexOf('does not match the submitted chainId') !== -1) {
                            alert('The Chain ID returned by the RPC URL does not match the expected value. Please verify the RPC configuration.');
                        } else {
                            console.error('Could not add the network:', addError.message);
                        }
                    });
            } else {
                console.error('Could not switch to the network:', switchError.message);
            }
        });
});
