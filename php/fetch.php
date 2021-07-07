<?php
    if(isset($_POST["id"]))
    {
        $connect = mysqli_connect("localhost","root","","myshop");
        $query = "SELECT * FROM product WHERE Product_ID = '".$_POST["id"]."' ";
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
            $data["inCart"] = 0;
        }
        echo json_encode($data);
    }
?>