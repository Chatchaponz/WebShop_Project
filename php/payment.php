<?php
    $connect = mysqli_connect('localhost', 'root', '', 'myshop');
    if(mysqli_connect_errno())
    {
        exit();
    }

    if(isset($_POST["id"]))
    {
        $query = "SELECT * FROM delivery_address WHERE User_ID = '".$_POST["id"]."' ";
        
        $result = mysqli_query($connect, $query);

        while($row = mysqli_fetch_array($result))
        {
            $data["Delivery_add_ID"] = $row["Delivery_add_ID"];
            $data["Address_1"] = $row["Address_1"];
            $data["Address_2"] = $row["Address_2"];
            $data["Country"] = $row["Country"];
            $data["City"] = $row["City"];
            $data["PostCode"] = $row["PostCode"];
            $data["Phone"] = $row["Phone"];
            $data["FirstName"] = $row["FirstName"];
            $data["MiddleName"] = $row["MiddleName"];
            $data["LastName"] = $row["LastName"];
        }
        echo json_encode($data);
    }

    if(isset($_POST['submit']))
    {
        $userID = $_POST['user_id'];
        $tracking_num = $_POST['tracking_num'];
        $shipment = $_POST['shipment'];
        $product = $_POST['product'];
        $Total = $_POST['Total'];
        $Tax = $_POST['Tax'];
        $PaymentStatus = $_POST['PaymentStatus'];

        
        $query_sql = "INSERT INTO order_list ( `Delivery_add_ID`, `OrderDateTime`, `PaymentStatus`, `Tax`, `Total`)
        VALUES((SELECT Delivery_add_ID FROM delivery_address WHERE User_ID = '$userID'),CURRENT_TIMESTAMP, '$PaymentStatus','$Tax', '$Total')";

        $result_insert = mysqli_query($connect,$query_sql);

        if($result_insert)
        {
            foreach ($product as $value)
            {
                $val1 = $value['Product_ID'];
                $val2 = $value['inCart'];
                $val3 = $value['inCart'] * $value['Product_Price'];
                $val4 = $value['Product_InStock'];
                $val5 = $val4 - $val2;

                $query_sql_sub = "INSERT INTO suborderdetail ( `Order_ID`, `Product_ID`, `ShipmentType_ID`, `Quantity`, `Subtotal`, `Tracking_Number`, `Shipment_DateTime`)
                VALUES ( (SELECT MAX(Order_ID) FROM order_list), $val1 , $shipment, $val2, $val3, '$tracking_num', CURRENT_TIMESTAMP)";

                $result_insert_sub = mysqli_query($connect, $query_sql_sub);

                $update_query = "UPDATE product SET Product_InStock = $val5 WHERE Product_ID = $val1";

                $result_update = mysqli_query($connect, $update_query);

            }
        }
        $data = 1;
        echo json_encode($data);
    }
?>