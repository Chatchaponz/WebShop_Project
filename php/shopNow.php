<?php


$table = 'product';

#$result = $mysqli->query("SELECT * FROM $table ORDER BY 'PriductID' DESC LIMIT 4 ") or die($mysqli->error);
$query = "SELECT * FROM $table";
$result = mysqli_query($connect,$query);

while ($data = $result->fetch_assoc()) 
{
echo
"
<div class='product'>

    <div class='img__container'>
        <img src='{$data['Product_img_dir']}' alt=''>
    </div>
    <div class='product__bottom'>

        <div class='rating'> ";
            $star = 5;
            $rate = $data['Product_Rate'];
            while ($star != 0) 
            {
                if($rate != 0)
                {
                    echo 
                    "
                    <span>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                            <path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'/>
                        </svg>
                    </span>
                    ";
                    $rate -= 1;
                }
                else
                {
                    echo 
                    "
                    <span>
                        <svg>
                            <use xlink:href='./images/icons.svg#icon-star-empty'></use>
                        </svg>
                    </span>
                    ";
                }
            $star -= 1;
            }
    echo 
    "       
        </div>
        
        <h3 class='to_single' id = {$data['Product_ID']}>{$data['Product_Name']}</h3>
        <h4>{$data['Product_Price']} ฿</h4>
        <button class = 'add__cart' id = {$data['Product_ID']}>Add To Cart</button>

    </div>
</div>
";
}
?>