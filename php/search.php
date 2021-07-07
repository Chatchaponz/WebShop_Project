<?php 
    $connect = mysqli_connect('localhost', 'root', '', 'myshop');
    if(mysqli_connect_errno())
    {
        mysqli_close($connect);
        exit();
    }

    if(isset($_POST["id"]))
    {
        $search = $_POST["search_content"];

        $query_sql = "SELECT * FROM Product WHERE Product_Name like '$search%' ";

        $do_search = mysqli_query($connect, $query_sql);

        if(mysqli_num_rows($do_search)> 0)
        {
            $i = 0;
            while($row = mysqli_fetch_assoc($do_search))
            {
                $data[$i]["Product_ID"] = $row["Product_ID"];
                $data[$i]["Product_Name"] = $row["Product_Name"];
                $data[$i]["Product_Description"] = $row["Product_Description"];
                $data[$i]["Product_Rate"] = $row["Product_Rate"];
                $data[$i]["Product_Price"] = $row["Product_Price"];
                $data[$i]["Product_img_dir"] = $row["Product_img_dir"];
                $data[$i]["Product_InStock"] = $row["Product_InStock"];
                $i++;
            }
        }
        else
        {
            $data = false;
        }
        echo json_encode($data);
    }
?>