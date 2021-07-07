<?php
    $connect = mysqli_connect('localhost', 'root', '', 'myshop');
    if(mysqli_connect_errno())
    {
        mysqli_close($connect);
        exit();
    }


    if(isset($_POST["id"]))
    {
        $check_query_user = "SELECT * FROM `shopuser`
                        WHERE (Email = '".$_POST["username_input"]."' or Username = '".$_POST["username_input"]."') 
                        and Password = '".$_POST["password_input"]."' ";
        $check_user = mysqli_query($connect, $check_query_user);
        if(mysqli_num_rows($check_user) == 1)
        {
            $data['login'] = true;
            $data['user_type'] = "user";
            while($row_user = mysqli_fetch_array($check_user))
            {
                $data['user_id'] = $row_user['User_ID'];
                $data['user_name'] = $row_user['Username'];
            }

            $timeUpdate = "UPDATE shopuser SET `Last_login` = CURRENT_TIMESTAMP 
                         WHERE Username = '".$_POST["username_input"]."' or Email = '".$_POST["username_input"]."' ";
            $update = mysqli_query($connect, $timeUpdate);

            if($update){}
            else
            {
                echo "Error: " . $timeUpdate . "<br>" . mysqli_error($connect);
            }
        }
        else
        {
            $data['login'] = false;
            $data['user_type'] = "none";
            $data['user_id'] = "none";
            $data['user_name'] = "none";
        }

        if(!$data['login'])
        {
        $check_query_staff = "SELECT * FROM `staff`
                        WHERE (Email = '".$_POST["username_input"]."' or Username = '".$_POST["username_input"]."') 
                        and Password = '".$_POST["password_input"]."' ";
        $check_staff = mysqli_query($connect, $check_query_staff);

        if(mysqli_num_rows($check_staff) == 1)
        {
            $data['login'] = true;
            $data['user_type'] = "staff";
            while($row_staff = mysqli_fetch_array($check_staff))
            {
                $data['user_id'] = $row_staff['Staff_ID'];
                $data['user_name'] = $row_staff['Username'];
            }
        }
        else
        {
            $data['login'] = false;
            $data['user_type'] = "none";
            $data['user_id'] = "none";
            $data['user_name'] = "none";
        }
        }
        
        echo json_encode($data);
    }

?>