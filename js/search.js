let search_product = document.getElementById('search__product');
let search_content = document.getElementById('search');
let text = document.querySelector('.title2');

let login_status = localStorage.getItem('loginStatus');
    login_status = JSON.parse(login_status);
let carts = document.querySelectorAll('.add__cart');
let cart_info = document.querySelector('.cart__info');

get_product();

to_singleProduct();

jQuery("form").submit(function(e){
    text.innerHTML = ` `;
    e.preventDefault();
    $(document).ready(function(){
        $.ajax({
            url: "./php/search.php",
            method: "POST",
            data:{
                id: 1,
                search_content: search_content.value
            },
            dataType: "JSON",
            success: function(data)
            {
                if(data)
                {
                    show_search_reasult(data);
                    onLoadCartNumber();
                    get_product();
                    to_singleProduct();
                    login_status = localStorage.getItem('loginStatus');
                    login_status = JSON.parse(login_status);
                    carts = document.querySelectorAll('.add__cart');
                    cart_info = document.querySelector('.cart__info');
                    
                }
                else
                   show_non();                
            }
        });
    });
});

function show_search_reasult(data)
{
    let i = 0;
    Object.values(data).map(item => {
    
    if( i == 0)
    {
        search_product.innerHTML = `
        <div class='product' ></div>
        `;
    }
    else
    {
        search_product.innerHTML += `
        <div class='product' ></div>
        `;
    }
    let product = document.querySelectorAll('.product');
    product[i].innerHTML = `
    <div class='img__container'>
        <img src='${item.Product_img_dir}' alt=''>
    </div>

    <div class='product__bottom'></div>`;
    let product_buttom = document.querySelectorAll('.product__bottom');
    product_buttom[i].innerHTML = `<div class='rating'></div>`;

        let rate_div = document.querySelectorAll('.rating');
        let star = 5;
        let rate = parseInt(item.Product_Rate);
            while (star != 0) 
            {
                if(rate != 0)
                {
                    rate_div[i].innerHTML +=
                    `
                    <span>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                            <path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'/>
                        </svg>
                    </span>
                    `;
                    rate -= 1;
                }
                else
                {
                    rate_div[i].innerHTML +=
                    `
                    <span>
                        <svg>
                            <use xlink:href='./images/icons.svg#icon-star-empty'></use>
                        </svg>
                    </span>
                    `;
                }
                star -= 1;
            }
    product_buttom[i].innerHTML +=
    `  
        <h3 class='to_single' id = ${item.Product_ID}>${item.Product_Name}</h3>
        <h4>${item.Product_Price} ฿</h4>
        <button class = 'add__cart' id = ${item.Product_ID}>Add To Cart</button>

    `;
    i++;
});
}

function show_non(data)
{
    if(!data)
    {
        text.innerHTML = `
        <h1> "${search_content.value}" not found :( </h1>
    `;
        search_product.innerHTML = ` `;
    }
}

function get_product()
{

    $('.add__cart').click( (e) =>{
        if(login_status != null && login_status.login)
        {
        // async function need to wait for get product from database
        $(document).ready(function(){
            if(  e.target.id != '')
            {
                $.ajax({
                    url:"./php/fetch.php",
                    method:"POST",
                    data:{id: e.target.id}, // will be in $_POST["id"]
                    dataType: "JSON",
                    success: function(data)
                    {
                        checkCart(data);
                    }
                })
            }
            else
            {
                console.log("No data (search.js)"); 
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

function to_singleProduct()
{
    $('.to_single').click((e)=>{

        $.ajax({
            url:"./php/fetch_product.php",
            method:"POST",
            data:{id: e.target.id}, // will be in $_POST["id"]
            dataType: "JSON",
            success: function(data)
            {
                keepTemp(data);
            }
        })
    
    });
}

function keepTemp(data)
{
    localStorage.setItem("thisProduct", JSON.stringify(data));
    location.href = "singleProduct.html";
}


onLoadCartNumber();