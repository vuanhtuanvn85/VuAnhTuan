async function getPrices() {
    const response = await fetch('https://interview.switcheo.com/prices.json');
    const data = await response.json();
    const prices = data.reduce((token, current) => {
        const existing = token.find(item => item.currency === current.currency);
        if (!existing || new Date(existing.date) <= new Date(current.date)) {
            if (existing) {
                token = token.filter(item => item.currency !== current.currency);
            }
            token.push(current);
        }
        return token;
    }, []);

    try {
        console.log(prices);
        const inputTokenName = document.getElementById('input-token-name');
        const outputTokenName = document.getElementById('output-token-name');
        prices.forEach(price => {
            const inputOption = document.createElement('option');
            inputOption.text = price.currency;
            inputOption.value = price.price;
            inputTokenName.appendChild(inputOption);
            
            const outputOption = document.createElement('option');
            outputOption.text = price.currency;
            outputOption.value = price.price;
            outputTokenName.appendChild(outputOption);
        });
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));     // demo loading
    return prices;
}

getPrices();

document.getElementById('input-token-name').addEventListener('change', async function() {
    const selectedText = this.options[this.selectedIndex].text;
    const inputTokenIcon = document.getElementById('input-token-icon');
    inputTokenIcon.src = "images/loading.svg";
    await getPrices();
    
    const selectedValue = this.value;
    console.log('selectedValue: ', selectedValue);
    const inputUSD = document.getElementById('input-usd');
    const inputAmount = document.getElementById('input-amount');
    console.log('inputAmount: ', inputAmount.value);

    inputUSD.innerText = selectedValue * inputAmount.value + " USD";
    calcFromInputToOutput(document.getElementById('input-amount'));

    inputTokenIcon.src = "images/tokens/" + selectedText + ".svg";
});  


document.getElementById('output-token-name').addEventListener('change', async function() {
    const selectedText = this.options[this.selectedIndex].text;
    const outputTokenIcon = document.getElementById('output-token-icon');
    outputTokenIcon.src = "images/loading.svg";
    await getPrices();

    const selectedValue = this.value;
    console.log('selectedValue: ', selectedValue);
    const outputUSD = document.getElementById('output-usd');
    const outputAmount = document.getElementById('output-amount');
    console.log('outputAmount: ', outputAmount.value);
    
    outputUSD.innerText = selectedValue * outputAmount.value + " USD";
    calcFromOutputToInput(document.getElementById('output-amount'));

    outputTokenIcon.src = "images/tokens/" + selectedText + ".svg";
});

document.getElementById('swap-vertical-btn').addEventListener('click', function() {
    const inputTokenIcon = document.getElementById('input-token-icon');
    const outputTokenIcon = document.getElementById('output-token-icon');
    const inputTokenName = document.getElementById('input-token-name');
    const outputTokenName = document.getElementById('output-token-name');
    const inputAmount = document.getElementById('input-amount');
    const outputAmount = document.getElementById('output-amount');
    const inputUSD = document.getElementById('input-usd');
    const outputUSD = document.getElementById('output-usd');

    // Swap icons
    const tempIconSrc = inputTokenIcon.src;
    inputTokenIcon.src = outputTokenIcon.src;
    outputTokenIcon.src = tempIconSrc;

    // Swap token names
    const tempTokenName = inputTokenName.value;
    inputTokenName.value = outputTokenName.value;
    outputTokenName.value = tempTokenName;

    // Swap amounts
    const tempAmount = inputAmount.value;
    inputAmount.value = outputAmount.value;
    outputAmount.value = tempAmount;

    // Swap USD values
    const tempUSD = inputUSD.innerText;
    inputUSD.innerText = outputUSD.innerText;
    outputUSD.innerText = tempUSD;
});

function calcFromInputToOutput(inputAmountElement) {
    const inputTokenName = document.getElementById('input-token-name');
    const selectedValue = inputTokenName.value;
    const inputUSD = document.getElementById('input-usd');
    const inputAmount = inputAmountElement.value;
    inputUSD.innerText = selectedValue * inputAmount + " USD";

    const outputTokenName = document.getElementById('output-token-name');
    const outputSelectedValue = outputTokenName.value;
    const outputAmount = document.getElementById('output-amount');
    outputAmount.value = (selectedValue * inputAmount) / outputSelectedValue;

    const outputUSD = document.getElementById('output-usd');
    outputUSD.innerText = outputAmount.value * outputSelectedValue + " USD";
}

document.getElementById('input-amount').addEventListener('input', function() {
    calcFromInputToOutput(this);
});

function calcFromOutputToInput(outputAmountElement) {
    const outputTokenName = document.getElementById('output-token-name');
    const selectedValue = outputTokenName.value;
    const outputUSD = document.getElementById('output-usd');
    const outputAmount = outputAmountElement.value;
    outputUSD.innerText = selectedValue * outputAmount + " USD";

    const inputTokenName = document.getElementById('input-token-name');
    const inputSelectedValue = inputTokenName.value;
    const inputAmount = document.getElementById('input-amount');
    inputAmount.value = (selectedValue * outputAmount) / inputSelectedValue;

    console.log('selectedValue: ', selectedValue);
    console.log('outputAmount: ', outputAmount);
    console.log('inputSelectedValue: ', inputSelectedValue);

    const inputUSD = document.getElementById('input-usd');
    inputUSD.innerText = inputAmount.value * inputSelectedValue + " USD";
}

document.getElementById('output-amount').addEventListener('input', function() {
    calcFromOutputToInput(this);
});
