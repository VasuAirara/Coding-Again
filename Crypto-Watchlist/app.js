let coin = document.getElementById("coin-name");
let price = document.getElementById("coin-price");
let addBtn = document.getElementById("add-btn");
let cryptoList = document.getElementById("crypto-info");

let cryptoData = JSON.parse(localStorage.getItem("crypto"));


function updateData(){
    let coinData = coin.value;
    let coinPrice = price.value;
    cryptoData.push({name:coinData,
        price:coinPrice
    });
    localStorage.setItem("crypto", JSON.stringify(cryptoData))
    cryptoList.innerHTML = `<li>${cryptoData}</li>`
}


addBtn.addEventListener("click", updateData);