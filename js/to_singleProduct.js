
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

function keepTemp(data)
{
    localStorage.setItem("thisProduct", JSON.stringify(data));
    location.href = "singleProduct.html";
}