let login_status = localStorage.getItem('loginStatus');
    login_status = JSON.parse(login_status);
let carts = document.querySelectorAll('.add__cart');
let cart_info = document.querySelector('.cart__info');

for (let i=0; i< carts.length; i++)
{
    carts[i].addEventListener('click', () =>{
        if(login_status != null && login_status.login)
        {
        // async function need to wait for get product from database
        $(document).ready(function(){
            if( carts[i].id != '')
            {
                $.ajax({
                    url:"./php/fetch.php",
                    method:"POST",
                    data:{id: carts[i].id}, // will be in $_POST["id"]
                    dataType: "JSON",
                    success: function(data)
                    {
                        checkCart(data);
                    }
                })
            }
            else
            {
                console.log("No data (cartIndex.js)"); 
            }
        });
        
        }
        else
        {
            location.href = 'login.html';
        }
    });
}

if(login_status != null && login_status.login)
{
    cart_info.setAttribute('href', "cart.html");
}
else
{
    cart_info.setAttribute('href', "login.html");
}



function onLoadCartNumber()
{
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers)
    {
        document.querySelector('.cart__info span').textContent = productNumbers;
    }
}

function checkCart(product)
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null)
    {
        if(cartItems[product.Product_ID] == undefined)
        {
            cartNumbers(product);
            totalCost(product);
        }
        else if( cartItems[product.Product_ID].inCart < parseInt(cartItems[product.Product_ID].Product_InStock))
        {
            cartNumbers(product);
            totalCost(product);
        }
        else
            alert(cartItems[product.Product_ID].Product_Name + ' out of stock');
    }
    else
    {
        cartNumbers(product);
        totalCost(product);
    }
}

function cartNumbers(product)
{
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if( productNumbers )
    {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart__info span').textContent = productNumbers + 1;
    }
    else
    {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart__info span').textContent = 1;
    }

    setItems(product);
}

function setItems(product)
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);


    if(cartItems != null)
    {
        if(cartItems[product.Product_ID] == undefined)
        {
            cartItems = {
                ...cartItems,
                [product.Product_ID]: product
            }
        }
        cartItems[product.Product_ID].inCart += 1;
    }
    else
    {
        product.inCart = 1;
        cartItems = {
            [product.Product_ID] : product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product)
{
    let cartCost = localStorage.getItem('totalCost');


    if(cartCost != null)
    {
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", cartCost + parseFloat(product.Product_Price));
    }
    else
    {
        localStorage.setItem("totalCost", parseFloat(product.Product_Price));
    }
}


/* icon from https://ionic.io/ionicons/v4 */
function displayCart()
{
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cart__products");

    if(cartItems  && productContainer && cartCost > 0)
    {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class = "product__container">
                <div class = "cart__product">
                    <ion-icon class="cart__close" id="${item.Product_ID}"
                    name="close-circle"></ion-icon>
                    <img src="${item.Product_img_dir}">
                    <span>${item.Product_Name}</span>

                </div>

                <div class = "price">${item.Product_Price}฿</div>
                    
                <div class = "quantity">
                    <ion-icon class="decrease" id="${item.Product_ID}"
                    name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase" id="${item.Product_ID}"
                    name="arrow-dropright-circle"></ion-icon>
                </div>

                <div class = "total inCart">
                    ${item.inCart * item.Product_Price} ฿
                </div>
            </div>
            `;
        });
        productContainer.innerHTML += `
            <div class = "cartTotal__container">
                <h4 class="cartTotal__title">
                    Cart Total
                </h4>
                <h4 class="cartTotal">
                    ${cartCost} ฿
                </h4>
            </div>
        `;

        productContainer.innerHTML += `
            <div class="cart__button">
                <a href="payment.html" class="checkout">Checkout!</a>
            </div>
        `;
    }
    else if( (cartCost == 0 || cartItems == null) && productContainer)
    {
        productContainer.innerHTML = '';
        productContainer.innerHTML += `
            <div class = "cart__warning">
                <h1>
                    Your cart is empty :(
                </h1>
            </div>
        `;
    }
}

/* add or remove item in cart/stock */
function inCartAdjust()
{
    /* get item from local storage */
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseFloat(cartCost);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    
    /* query document */
    let productContainer = document.querySelector(".cart__products"); // check product in cart

    if(cartItems && productContainer)
    {
        /* query document */
        let increase = document.querySelectorAll('.increase');
        let decrease = document.querySelectorAll('.decrease');
        let cartNum = document.querySelector('.cart__info span');
        let quantity = document.querySelectorAll('.quantity span');
        let total = document.querySelectorAll('.total.inCart');
        let cartTotal = document.querySelector('.cartTotal');

        for (let i=0; i< increase.length; i++)
        {
            increase[i].addEventListener('click', () =>{

                if(cartItems[increase[i].id].inCart < parseInt(cartItems[increase[i].id].Product_InStock))
                {
                    localStorage.setItem('cartNumbers', productNumbers += 1);
                    cartNum.textContent = productNumbers;

                    cartItems[increase[i].id].inCart += 1;
                    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                    quantity[i].textContent = cartItems[increase[i].id].inCart;

                    total[i].textContent = cartItems[increase[i].id].inCart * cartItems[increase[i].id].Product_Price + '฿';
                
                    cartCost += parseFloat(cartItems[increase[i].id].Product_Price);
                    localStorage.setItem("totalCost", parseFloat(cartCost));
                    cartTotal.textContent = cartCost + '฿';
                }
                else
                {
                    alert(cartItems[increase[i].id].Product_Name + ' out of stock');
                }
            });
        }

        for (let i=0; i< decrease.length; i++)
        {
            decrease[i].addEventListener('click', () =>{

                if(cartItems[decrease[i].id].inCart != 1) 
                {
                    localStorage.setItem('cartNumbers', productNumbers -= 1);
                    cartNum.textContent = productNumbers;

                    cartItems[decrease[i].id].inCart -= 1;
                    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                    quantity[i].textContent = cartItems[decrease[i].id].inCart;

                    total[i].textContent = cartItems[decrease[i].id].inCart * cartItems[decrease[i].id].Product_Price + '฿';
                
                    cartCost -= parseFloat(cartItems[decrease[i].id].Product_Price);
                    localStorage.setItem("totalCost", parseFloat(cartCost));
                    cartTotal.textContent = cartCost + '฿';

                }
                else
                {
                    alert('Minimum Reach');
                }
            });
        }

        let close = document.querySelectorAll('.cart__close');
        for (let i=0; i< close.length; i++)
        {
            close[i].addEventListener('click', () =>{

                localStorage.setItem('cartNumbers', productNumbers -= cartItems[close[i].id].inCart);
                cartNum.textContent = productNumbers;
                
                cartCost -= cartItems[close[i].id].inCart * parseFloat(cartItems[close[i].id].Product_Price);
                localStorage.setItem("totalCost", cartCost);
                cartTotal.textContent = cartCost + '฿';

                delete cartItems[close[i].id];

                localStorage.setItem("productsInCart", JSON.stringify(cartItems));

                location.reload();

            });
        }
    }
}

onLoadCartNumber();
displayCart();
inCartAdjust();


