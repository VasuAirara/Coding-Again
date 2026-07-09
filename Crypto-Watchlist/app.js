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
    // 1. Wipe the container completely clean so we don't double-draw old items
    cryptoInfo.innerHTML = "";

    // 2. Loop through every coin object inside our array
    cryptolist.forEach(function(coinItem, index) {
        
        // 3. Create a new <li> element for the card
        let li = document.createElement("li");

        // 4. Set the text inside the <li> using our object properties (name and price)
        li.textContent = coinItem.name + " - Target: $" + coinItem.price;

        // 5. Create a "Remove" button
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        // 6. Tell the button what to do when clicked (The Delete Action)
        removeBtn.addEventListener("click", function() {
            // Filter out the clicked coin using its position (index)
            cryptolist = cryptolist.filter(function(_, i) {
                return i !== index;
            });

            // Save the newly filtered array to storage
            localStorage.setItem("crypto-portfolio", JSON.stringify(cryptolist));

            // Re-run the render function to refresh the screen instantly
            render();
        });

        // 7. Put the button inside the <li>, and put the <li> inside our <ul> container
        li.appendChild(removeBtn);
        cryptoInfo.appendChild(li);
    });
}

// 🚀 CRUCIAL STEP: Call render once at the bottom so it runs immediately on page load!
render();