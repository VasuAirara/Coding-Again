let coin = document.getElementById("coin-name");
let price = document.getElementById("coin-price");
let addCrypto = document.getElementById("add-coin");
let cryptoInfo = document.getElementById("crypto-info");

let  cryptolist = JSON.parse(localStorage.getItem("crypto-portfolio")) || [];


addCrypto.addEventListener('click', function(){
    let coinPrice = price.value;
    let coinName = coin.value.trim();
    if(coinPrice < 0 || coinName === " "){
        console.log("Coin name and price can't be zero or empty")
        return;
    }


    let newCoin = {
        name: coinName,
        price: coinPrice 
    };
    cryptolist.push(newCoin);

    localStorage.setItem("crypto-portfolio", JSON.stringify(cryptolist))

    coin.value = "";
    price.value = "";

    console.log("Successfully saved!", cryptolist);

    render();

})

function render() {
    cryptoInfo.innerHTML = "";

    cryptolist.forEach(function(coinItem, index) {
        
        let li = document.createElement("li");

        li.textContent = coinItem.name + " - Target: $" + coinItem.price;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", function() {

            cryptolist = cryptolist.filter(function(_, i) {
                return i !== index;
            });

            
            localStorage.setItem("crypto-portfolio", JSON.stringify(cryptolist));

            
            render();
        });

        li.appendChild(removeBtn);
        cryptoInfo.appendChild(li);
    });
}

render();