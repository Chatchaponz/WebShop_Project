let singleProduct = localStorage.getItem('thisProduct');
singleProduct = JSON.parse(singleProduct);

let check_status = localStorage.getItem('loginStatus');
    check_status = JSON.parse(check_status);

let title = document.querySelector('title');

if(title != null)
{
    title.textContent = singleProduct.Product_Name;
}

let product_img = document.querySelector('.left-column');
if(product_img != null)
{
    product_img.innerHTML = `<img src="${singleProduct.Product_img_dir}" alt="">`;
}

let description = document.querySelector('.product-description');
if(product_img != null)
{
    description.innerHTML += `
    <h1>${singleProduct.Product_Name}</h1>
    <p>${singleProduct.Product_Description}</p>
`;
}

let product_config = document.querySelector('.product-cate');

if(product_config != null)
{
    product_config.innerHTML += `<span>Rate : </span>`;
    for(let i =0; i < singleProduct.Product_Rate; i++)
    {
        product_config.innerHTML += `
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' style = "fill: #ffcc00">
            <path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'/>
            </svg>
        `;
    }
    product_config.innerHTML += `
    <br><span>Seller : ${singleProduct.Seller}</span><br>
    <span>Category : ${singleProduct.Product_Category}</span><br>
    <span>SubCategory : ${singleProduct.Product_SubCategory}</span><br>
    <span>InStock : ${singleProduct.Product_InStock}</span>
    `;
}

let product_incart = document.querySelector('.product-incart');


if(product_incart != null)
{
    product_incart.innerHTML += `
    <span>Select Amount : </span>
    <input type="number" class="p_inStock" name="p_inStock" min="1" max="${singleProduct.Product_InStock}" value = 1>
`;
}

let product_price = document.querySelector('.product-price');

if(product_price != null)
{
    product_price.innerHTML = 
    `
        <span>${singleProduct.Product_Price} ฿</span>
        <a href="#" class="cart-btn">Add to cart</a>
    `;
}

let comment = document.querySelector('.comment-section');

if(comment != null)
{
    if(singleProduct.Comment == undefined)
    {
        comment.innerHTML += `
        <h2 style="margin-left :60px">No comment available yet</h2>
        `;
    }
    else
    {
        for(let i=0; i< singleProduct.Comment.length; i++)
        {
        comment.innerHTML += `
        <li class="comment user-comment">
          
          <div class="info">
              <a href="#">${singleProduct.Comment[i].Username}</a>
          </div>

          <p>${singleProduct.Comment[i].Message}</p>
        </li>
        `;
        }
    }
}

let check_amount = document.querySelector('.p_inStock');

if(check_amount != null)
{
    check_amount.addEventListener('change', ()=>{

        if(parseInt(check_amount.value) > parseInt(singleProduct.Product_InStock))
        {
            check_amount.value = parseInt(singleProduct.Product_InStock);
        }
        else
        {
            check_amount.value = check_amount.value
        }
    });
}

let addCart_btn = document.querySelector('.cart-btn');

if(addCart_btn != null)
{
    addCart_btn.addEventListener('click',()=>{

        if(check_status != null && check_status.login)
        {
        $.ajax({
            url:"./php/fetch.php",
            method:"POST",
            data:{id: singleProduct.Product_ID}, // will be in $_POST["id"]
            dataType: "JSON",
            success: function(data)
            {
                setItems_s(data, parseInt(check_amount.value));
                location.href = "cart.html";
            }
        });
        }
        else
        {
            location.href = 'login.html';
        }
    });
}

function setItems_s(product, amount)
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null && cartItems.length != undefined)
    {
        let this_amount = parseInt(cartItems[product.Product_ID].inCart) + amount;
        if(this_amount > parseInt(singleProduct.Product_InStock))
            this_amount = amount - parseInt(cartItems[product.Product_ID].inCart);
        else
            this_amount = amount;

        if(cartItems[product.Product_ID] == undefined)
        {
            cartItems = {
                ...cartItems,
                [product.Product_ID]: product
            }
        }
        cartItems[product.Product_ID].inCart += this_amount;

        cartNumbers_s(this_amount);
        totalCost_s(product, this_amount);
    }
    else
    {
        product.inCart = amount;
        cartItems = {
            [product.Product_ID] : product
        }

        cartNumbers_s(amount);
        totalCost_s(product,amount);
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function cartNumbers_s(amount)
{
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if( productNumbers )
    {   
        localStorage.setItem('cartNumbers', productNumbers + amount);
    }
    else
    {
        localStorage.setItem('cartNumbers', amount);
    }
}


function totalCost_s(product, amount)
{
    let cartCost = localStorage.getItem('totalCost');

    let plus_price = amount * parseFloat(product.Product_Price);

    if(cartCost != null)
    {
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", cartCost + plus_price);
    }
    else
    {
        localStorage.setItem("totalCost", parseFloat(plus_price));
    }
}