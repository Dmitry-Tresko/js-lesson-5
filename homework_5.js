async function getData(curID) {
    try {
        const response = await fetch(`https://www.nbrb.by/api/exrates/rates/${curID}`);
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}

function convertData(res, curName) {
    const inputValue = document.getElementById('byn-input').value;
    const scale = res.Cur_Scale;
    const rate = res.Cur_OfficialRate;

    const convertedValue = ((+inputValue * scale) / rate).toFixed(2);
    return `${convertedValue} ${curName}`;
}

const convertBtn = document.querySelector('#convert-btn');
convertBtn.addEventListener('click', async event => {
    const selectorValue = document.querySelector('#currency-choice');
    let currencyID;
    switch (selectorValue.value) {
        case 'USD':
            currencyID = 145;
            break;
        case 'EUR':
            currencyID = 292;
            break;
        case 'RUB':
            currencyID = 298;
            break;
        default: break;
    }
    const res = await getData(currencyID);
    const convertedValue = convertData(res, selectorValue.value);

    const outputEl = document.getElementById('result-print');
    outputEl.innerText = `Введенная вами сумма равна ${convertedValue}`;
})