<?php
    $connect = mysqli_connect('localhost', 'root', '', 'myshop');
    if(mysqli_connect_errno())
    {
        mysqli_close($connect);
        exit();
    }

    if(isset($_POST['updateProduct']))
    {   
        $add_stock = $_POST['add_stock'];
        $product_id = $_POST['hid'];

        $update_info_sql = "UPDATE product SET Product_InStock = Product_InStock + $add_stock  WHERE Product_ID = $product_id;";

        $update_info = mysqli_query($connect,$update_info_sql);

        $get_rate_sql = "SELECT AVG(User_Rate) AS avg_rate
                         FROM SubOrderDetail
                         WHERE User_Rate IS NOT NULL
                         GROUP BY Product_ID HAVING Product_ID = $product_id;";
        
        $get_rate = mysqli_query($connect,$get_rate_sql);

        if(mysqli_num_rows($get_rate) > 0)
        {
            $avg_rate = mysqli_fetch_assoc($get_rate)['avg_rate'];

            $avg_rate = round($avg_rate);

            $update_info_sql_2 = "UPDATE product SET Product_Rate = $avg_rate WHERE Product_ID = $product_id;";

            $update_info_2 = mysqli_query($connect,$update_info_2);

            if($update_info && $get_rate && $update_info_2)
            {
                echo "<script>location.href = '../profile.html';</script>";
            }
        }
        else
        {
            if($update_info)
            {
                echo "<script>location.href = '../profile.html';</script>";
            }
        }
    }
?>