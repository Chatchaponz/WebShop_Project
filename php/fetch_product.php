<?php
    if(isset($_POST["id"]))
    {
        $connect = mysqli_connect("localhost","root","","myshop");
        $query = "SELECT * FROM product p 
                  JOIN subcategory s ON p.SubCategory_ID = s.SubCategory_ID 
                  JOIN category c ON s.category_ID = c.category_ID
                  JOIN shopuser u ON p.Seller = u.User_ID
                  WHERE p.Product_ID = '".$_POST["id"]."' ";
        $result = mysqli_query($connect, $query);

        while($row = mysqli_fetch_array($result))
        {
            $data["Product_ID"] = $row["Product_ID"];
            $data["Product_Name"] = $row["Product_Name"];
            $data["Product_Description"] = $row["Product_Description"];
            $data["Product_Rate"] = $row["Product_Rate"];
            $data["Product_Price"] = $row["Product_Price"];
            $data["Product_img_dir"] = $row["Product_img_dir"];
            $data["Product_InStock"] = $row["Product_InStock"];
            $data["Product_SubCategory"] = $row["Product_SubCategory"];
            $data["Product_Category"] = $row["Product_Category"];
            $data["Seller"] = $row["Username"];
        }

        $query_2 = "SELECT u.Username, s.Comment_Message 
                    FROM suborderdetail s
                    JOIN order_list o ON s.Order_ID = o.Order_ID
                    JOIN delivery_address d ON d.Delivery_add_ID = o.Delivery_add_ID
                    JOIN shopuser u ON u.User_ID = d.User_ID
                    WHERE s.Product_ID = '".$_POST["id"]."' ";

        $result_2 = mysqli_query($connect, $query_2);

        $i = 0;

        while($row = mysqli_fetch_array($result_2))
        {
            $data["Comment"][$i]["Username"] = $row["Username"];
            $data["Comment"][$i]["Message"] = $row["Comment_Message"];
            $i++;
        }

        echo json_encode($data);
    }
?>