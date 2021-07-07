    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cart__products__payment");

    if(cartItems && productContainer)
    {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class = "product__container">
                <div class = "cart__product">
                
                    <img src="${item.Product_img_dir}">
                    <span>${item.Product_Name}</span>

                </div>

                <div class = "price">${item.Product_Price}฿</div>
                    
                <div class = "quantity">
                    <span>${item.inCart}</span>
                </div>

                <div class = "total inCart">
                    ${item.inCart * item.Product_Price}฿
                </div>
            </div>
            `;
        });
        let total = parseFloat(cartCost) + (cartCost*0.07);
        productContainer.innerHTML += `
            <div class = "cartTotal__container">
                <h4 class="cartTotal__title">
                    Cart Total
                </h4>
                <h4 class="cartTotal">
                    ${cartCost} ฿
                </h4>
            </div>
            <div class = "cartTotal__container">
                <h4 class="cartTotal__title">
                    Tax ( 7% )
                </h4>
                <h4 class="tax">
                    ${(cartCost * 0.07).toFixed(2)} ฿
                </h4>
            </div>
            <div class = "cartTotal__container">
                <h4 class="cartTotal__title">
                    Total
                </h4>
                <h4 class="total__">
                    ${total.toFixed(2)} ฿
                </h4>
            </div>
        `;
    }

$(document).ready(function(){
    $.ajax({
        url: "./php/payment.php",
        method:"POST",
        data:{
            id: login_status.user_id
        },
        dataType: "JSON",
        success: function(data)
        {
            fill_del_address(data);
        }
    });
});

function fill_del_address(data)
{
    let del_address = document.querySelector('.delivery__address');
    del_address.innerHTML = `
    <div>
        <h3>Your Delivery Address</h3>
        <ul>
            <li>First Name: ${data.FirstName}</li>
            <li>Middle Name: ${data.MiddleName}</li>
            <li>Last Name: ${data.LastName}</li>
            <li>Adddress line 1: ${data.Address_1}</li>
            <li>Adddress line 2: ${data.Address_2}</li>
            <li>Country: ${data.Country}</li>
            <li>City: ${data.City}</li>
            <li>PostCode: ${data.PostCode}</li>
            <li>Phone: ${data.Phone}</li>
        </ul>
    </div>
    `;
}
let shipment_container = document.querySelector('.shipment');
let shipment = document.querySelectorAll('.shipmentType');
let total = parseFloat(cartCost * 1.07) ;
let cost = document.querySelector(".shipcost");
let totalShipcost = document.querySelector('.totalShipcost');

let shipment_type = 1;
cost.textContent = "30 ฿"
init_total = total + 30;
totalShipcost.textContent = init_total.toFixed(2) + " ฿";

for(let i =0; i < shipment.length; i++)
{
    shipment[i].addEventListener('click',function(){

        total = parseFloat(cartCost * 1.07);
        if(shipment[i].value == "registered")
        {
            total += 30;
            cost.textContent = "30 ฿"
            totalShipcost.textContent = total.toFixed(2) + " ฿";
            shipment_type = 1;
        }
        else if (shipment[i].value == "ems")
        {
            total += 60;
            cost.textContent = "60 ฿"
            totalShipcost.textContent = total.toFixed(2) + " ฿";
            shipment_type = 2;
        }
    });
}

function check_input_box()
{
    let check_input = document.querySelectorAll('.box_input');
    let make_sure = true
    for(let i =0;i<check_input.length; i++)
    {
        if(check_input[i].value == '')
        {
            make_sure = false;
        }
    }
    return make_sure;
}



let submit = document.querySelector('.payment__btn');

jQuery("form").submit(function(e){
    e.preventDefault();
    if(check_input_box())
    {
    $(document).ready(function(){
        $.ajax({
            url: "./php/payment.php",
            method:"POST",
            data:{
            submit: 1,
            user_id: login_status.user_id,
            PaymentStatus: 1,
            Tax: 7.00,
            Total: total,
            product: cartItems,
            shipment: shipment_type,
            tracking_num: 'ADS0000' + shipment_type
            },
            dataType: "JSON",
            success: function(data)
            {
                localStorage.removeItem('cartNumbers');
                localStorage.removeItem('totalCost');
                localStorage.removeItem('productsInCart');
                alert('Purchase Successfully');
                location.href = 'cart.html';
            }
        });
    });
    }
});
