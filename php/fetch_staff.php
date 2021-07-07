<?php 
    if(isset($_POST["id"]))
    {
        $connect = mysqli_connect("localhost","root","","myshop");
        $query = "SELECT * FROM staff 
                  WHERE Staff_ID = '".$_POST["id"]."' ";
        
        $result = mysqli_query($connect,$query);

        while($row = mysqli_fetch_array($result))
        {
            $data["Staff_ID"] = $row["Staff_ID"];
            $data["Username"] = $row["Username"];
            $data["Password"] = $row["Password"];
            $data["Position"] = $row["Position"];
            $data["Email"] = $row["Email"];
            $data["FirstName"] = $row["FirstName"];
            $data["MiddleName"] = $row["MiddleName"];
            $data["LastName"] = $row["LastName"];
            $data["Address_1"] = $row["Address_1"];
            $data["Address_2"] = $row["Address_2"];
            $data["Country"] = $row["Country"];
            $data["City"] = $row["City"];
            $data["PostCode"] = $row["PostCode"];
            $data["Phone"] = $row["Phone"];
            $data["BirthDate"] = $row["BirthDate"];
            $data["Gender"] = $row["Gender"];
        }

        echo json_encode($data);

    }
?>