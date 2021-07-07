<?php
    if(isset($_POST["id"]))
    {
        $connect = mysqli_connect("localhost","root","","myshop");
        $timeUpdate = "UPDATE shopuser SET `Last_logout` = CURRENT_TIMESTAMP 
                         WHERE User_ID = '".$_POST["userID"]."' ";
        $update = mysqli_query($connect, $timeUpdate);

            if($update){$data['status'] = true;}
            else
            {
                echo "Error: " . $timeUpdate . "<br>" . mysqli_error($connect);
            }
        echo json_encode($data);
    }
?>