// объект корзина

let cart = {
    // массив товаров в корзине
    products: [],
    cartText: function(){
        if (this.products.length == 0){
            return "Ваша корзина пуста";
        } else{
            return "В корзине: " + this.countCartCount() +
            " товаров на сумму " + this.countCartPrice() + " cr";
        }
    },
    countCartPrice: function(){
        let sum = 0;
        for(let i = 0; i < this.products.length; i++){
            sum = sum + this.products[i].price * this.products[i].count;
        }
        return sum;
    },
    countCartCount: function(){
        let sum = 0;
        for(let i = 0; i < this.products.length; i++){
            sum = sum + this.products[i].count;
        }cart
        return sum;
    },

    //  добавляет товар в корзину
    addProduct: function(product){
        // ищем товар в корзине
        let foundProduct = this.products.find(x => x.id == product.id);
        // если в корзине нет нужного товара то добавляем его
        if ( foundProduct === undefined){
            this.products.push(product);
        // если товар уже есть в корзине, то добавляем к найденой позиции количество (count + 1)
        } else{
            ++foundProduct.count;
        }
    }
}
// массив товаров в каталоге
products = [];

window.addEventListener("load",init);

// функция вызывается при загрузке страницы
function init(){

    // выводим пустую корзину
    cart.products = [];
    $cart = document.getElementById("cart");
    $cart.classList.add("cart");
    displayText($cart,cart.cartText());

    // заполняем каталог товаров
    products = [
        {name: 'buzz', price: 1000, count: 5, id: 0,},
        {name: 'tommygun', price: 5000, count: 2, id: 1,},
        {name: 'pipboy', price: 10000, count: 1, id: 2,},
    ];


    // выводим каталог товаров
    displayCatalog(products);

    // создаем подписку на событие клик по каталогу
    let $catalog = document.querySelector("#catalog");
    $catalog.addEventListener('click', handleCatalogClick);
}

// функция обработки события клика по каталогу
function handleCatalogClick(event){
    // проверяем что нажали на кнопку
    if (event.target.tagName === "BUTTON"){
        // ищем товар в каталоге по идентификатору
        let id = event.target.dataset.id;
        let foundProduct = products.find(x => x.id == id);
        // если товар найден то добавляем его в корзину
        if (foundProduct != undefined){
            cart.addProduct(foundProduct);
            // обновляем текст корзины на странице
            $cart = document.getElementById("cart");
            $cart.classList.add("cart");
            displayText($cart,cart.cartText());
        }
    }
}

// функция выводит текст в заданный элемент
function displayText($dom,text){
    $dom.textContent = text;
}

// функция генерит каталог товаров на странице
function displayCatalog(products){

    // ищем каталог
    $productBox = document.getElementById("catalog");
    $productBox.classList.add("catalog");

    // выводим информацию о каждом товаре из каталога
    for (let i = 0; i < products.length; i++){

        let $product = document.createElement("div");
        $product.classList.add("product");

        let $productName = document.createElement("div");
        $productName.classList.add("productName");

        let $productImg = document.createElement("img");
        $productImg.classList.add("productImg");

        let $productPrice = document.createElement("div");
        $productPrice.classList.add("productPrice");

        let $productButton = document.createElement("button");
        $productButton.classList.add("productButton");

        $productName.textContent = products[i].name;
        // в $productImg.dataset записываем id товара
        $productPrice.textContent = products[i].price;
        $productButton.textContent = "добавить в корзину";
        // в $productButton.dataset записываем id товара
        $productButton.dataset.id = products[i].id;

        $productBox.appendChild($product);
        $product.appendChild($productName);
        $product.appendChild($productPrice);
        $product.appendChild($productButton);
    }
    displayText($cart,cart.cartText());
}
