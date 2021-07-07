

let subCategory = document.getElementById("subcategory");
let category = document.getElementById("category");

subCategory.addEventListener('change', function(){
    this_value = subCategory.value;
    if(this_value == '1' || this_value == '2'|| this_value == '3')
    {
        category.value = "Clothes";
    }
    else if(this_value == '4'|| this_value == '5' || this_value == '6' || this_value == '12')
    {
        category.value = "Electronics";
    }
    else if(this_value == '7'|| this_value == '8' )
    {
        category.value = "General";
    }
    else if(this_value == '9'|| this_value == '10' || this_value == '11' )
    {
        category.value = "Furniture";
    }
});

let get_user = localStorage.getItem("loginStatus");
get_user = JSON.parse(get_user);
let seller = document.getElementById("seller");

if(get_user != null && get_user.login)
{
    seller.value = get_user.user_id;
}