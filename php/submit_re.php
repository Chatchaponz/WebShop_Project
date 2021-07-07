<?php
    $connect = mysqli_connect('localhost', 'root', '', 'myshop');
    if(mysqli_connect_errno())
    {
        mysqli_close($connect);
        exit();
    }

    if(isset($_POST['review']))
    {   
        $comment = $_POST['input_re'];
        $rate = $_POST['rate'];
        $sub_id = $_POST['hid'];
        $update_info_sql = "UPDATE suborderdetail SET Comment_Message = '$comment',  User_Rate = $rate 
                            WHERE SubOrderDetail_ID = $sub_id";

        $update_info = mysqli_query($connect,$update_info_sql);

        if($update_info)
        {
            echo "<script>location.href = '../profile.html';</script>";
        }
    }
?>