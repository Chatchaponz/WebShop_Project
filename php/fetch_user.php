<?php
    if(isset($_POST["id"]))
    {
        $connect = mysqli_connect("localhost","root","","myshop");
        $query = "SELECT * FROM shopuser s INNER JOIN delivery_address d ON s.User_ID = d.User_ID 
                  WHERE s.User_ID = '".$_POST["id"]."' ";
        
        $result = mysqli_query($connect, $query);

        while($row = mysqli_fetch_array($result))
        {
            $data["User_ID"] = $row["User_ID"];
            $data["Email"] = $row["Email"];
            $data["Password"] = $row["Password"];
            $data["Username"] = $row["Username"];
            $data["Address_1"] = $row["Address_1"];
            $data["Address_2"] = $row["Address_2"];
            $data["Country"] = $row["Country"];
            $data["City"] = $row["City"];
            $data["PostCode"] = $row["PostCode"];
            $data["Phone"] = $row["Phone"];
            $data["BirthDate"] = $row["BirthDate"];
            $data["Gender"] = $row["Gender"];
            $data["Created"] = $row["Created"];
            $data["Last_login"] = $row["Last_login"];
            $data["Last_logout"] = $row["Last_logout"];
            $data["FirstName"] = $row["FirstName"];
            $data["MiddleName"] = $row["MiddleName"];
            $data["LastName"] = $row["LastName"];
        }

        // Total spend
        $query_2 = "SELECT a.User_ID, SUM(b.Total) AS TotalSpent
                    FROM Delivery_Address a INNER JOIN Order_List b ON a.Delivery_add_ID = b.Delivery_add_ID
                    WHERE a.User_ID = '".$_POST["id"]."' ";
        
        $result_2 = mysqli_query($connect,$query_2);

        while($row = mysqli_fetch_array($result_2))
        {
            $data["TotalSpent"] = $row["TotalSpent"];
        }

        // Total spend (this month)
        $query_3 = "SELECT a.User_ID, SUM(b.Total) AS TotalSpent
                    FROM Delivery_Address a INNER JOIN Order_List b ON a.Delivery_add_ID = b.Delivery_add_ID
                    WHERE a.User_ID = '".$_POST["id"]."' AND MONTH(b.OrderDateTime) = MONTH(CURRENT_DATE)
                    GROUP BY MONTH(b.OrderDateTime)";

        $result_3 = mysqli_query($connect,$query_3);

        while($row = mysqli_fetch_array($result_3))
        {
            $data["TotalSpent_month"] = $row["TotalSpent"];
        }

        // total income
        $query_4 = "SELECT a.Seller , sum(Subtotal) AS TotalSoldIncome
                    FROM product a INNER JOIN suborderdetail b ON a.Product_ID = b.Product_ID 
                    Where Seller = '".$_POST["id"]."' ";
        $result_4 = mysqli_query($connect,$query_4);

        while($row = mysqli_fetch_array($result_4))
        {
            $data["TotalSoldIncome"] = $row["TotalSoldIncome"];
        }

        //total income (this month)
        $query_5 = "SELECT a.Seller , sum(Subtotal) AS TotalSoldIncome
                    FROM suborderdetail b INNER JOIN product a ON a.Product_ID = b.Product_ID 
                    INNER JOIN order_list c ON b.Order_ID = c.Order_ID
                    Where Seller = '".$_POST["id"]."' AND MONTH(c.OrderDateTime) = MONTH(CURRENT_DATE)
                    GROUP BY MONTH(c.OrderDateTime)";
        
        $result_5 = mysqli_query($connect,$query_5);

        while($row = mysqli_fetch_array($result_5))
        {
            $data["TotalSoldIncome_month"] = $row["TotalSoldIncome"];
        }

        //================ Global ====================

        // Amount of  user for each country
        $query_6 = "SELECT country, count(country) AS count
                    FROM shopuser
                    GROUP BY country";
        
        $result_6 =  mysqli_query($connect,$query_6);
        $i = 0;
        while($row = mysqli_fetch_array($result_6))
        {
            $data["UserAmount"][$i]["Country_a"] = $row["country"];
            $data["UserAmount"][$i]["Number"] = $row["count"];
            $i++;
        }
        
        //  most spend person 
        $query_7 = "SELECT a.FirstName, a.MiddleName, a.LastName , SUM(b.Total) AS TotalSpent
                    FROM Delivery_Address a INNER JOIN Order_List b ON a.Delivery_add_ID = b.Delivery_add_ID
                    INNER JOIN shopuser c ON a.User_ID = c.User_ID
                    GROUP BY a.User_ID
                    ORDER BY TotalSpent DESC LIMIT 1";
        
        $result_7 = mysqli_query($connect,$query_7);

        while($row = mysqli_fetch_array($result_7))
        {
            $data["MostSpent"]["FirstName"] = $row["FirstName"];
            $data["MostSpent"]["MiddleName"] = $row["MiddleName"];
            $data["MostSpent"]["LastName"] = $row["LastName"];
            $data["MostSpent"]["TotalSpent"] = $row["TotalSpent"];
        }

        // Best selling product
        $query_8  = "SELECT p.Product_Name, p.Product_Price, p.Product_img_dir, SUM(s.Quantity) AS totalQuantity 
                    FROM product p INNER JOIN suborderdetail s ON p.Product_ID = s.Product_ID  
                    GROUP BY s.Product_ID
                    ORDER BY totalQuantity DESC LIMIT 1";
        
        $result_8 = mysqli_query($connect,$query_8);

        while($row = mysqli_fetch_array($result_8))
        {
            $data["BestSale"]["Product_Name"] = $row["Product_Name"];
            $data["BestSale"]["Product_Price"] = $row["Product_Price"];
            $data["BestSale"]["Product_img_dir"] = $row["Product_img_dir"];
            $data["BestSale"]["totalQuantity"] = $row["totalQuantity"];
        }

        // ===================== Review Pending ======================= //

        $query_9 = "SELECT o.Order_ID, o.Total, 
                    p.Product_Name, p.Product_img_dir, p.Product_Description, p.Product_Price, 
                    s.Subtotal, s.Quantity, s.SubOrderDetail_ID
                    FROM product p 
                    JOIN suborderdetail s ON p.Product_ID = s.Product_ID  
                    JOIN order_list o ON s.Order_ID = o.Order_ID
                    JOIN delivery_address d ON o.Delivery_add_ID = d.Delivery_add_ID
                    JOIN shopuser u ON d.User_ID = u.User_ID
                    WHERE u.User_ID = '".$_POST["id"]."' AND s.Comment_Message IS NULL";
        
        $result_9 = mysqli_query($connect,$query_9);
        $i = 0;
        while($row = mysqli_fetch_array($result_9))
        {
            $data["Re_pen"][$i]["Order_ID"] = $row["Order_ID"];
            $data["Re_pen"][$i]["Total"] = $row["Total"];
            $data["Re_pen"][$i]["Product_Name"] = $row["Product_Name"];
            $data["Re_pen"][$i]["Product_img_dir"] = $row["Product_img_dir"];
            $data["Re_pen"][$i]["Product_Description"] = $row["Product_Description"];
            $data["Re_pen"][$i]["Product_Price"] = $row["Product_Price"];
            $data["Re_pen"][$i]["Subtotal"] = $row["Subtotal"];
            $data["Re_pen"][$i]["Quantity"] = $row["Quantity"];
            $data["Re_pen"][$i]["SubOrderDetail_ID"] = $row["SubOrderDetail_ID"];
            $i++;
        }

        // ===================== My Product ======================= //

        $query_10 = "SELECT * FROM product WHERE seller = '".$_POST["id"]."' ";
        $result_10 = mysqli_query($connect, $query_10 );
        $i = 0;
        while($row = mysqli_fetch_array($result_10))
        {
            $data["myProduct"][$i]["Product_ID"] = $row["Product_ID"];
            $data["myProduct"][$i]["Product_Name"] = $row["Product_Name"];
            $data["myProduct"][$i]["Product_Description"] = $row["Product_Description"];
            $data["myProduct"][$i]["Product_Rate"] = $row["Product_Rate"];
            $data["myProduct"][$i]["Product_Price"] = $row["Product_Price"];
            $data["myProduct"][$i]["Product_img_dir"] = $row["Product_img_dir"];
            $data["myProduct"][$i]["Product_InStock"] = $row["Product_InStock"];
            $i++;
        }

        echo json_encode($data);
    }
?>