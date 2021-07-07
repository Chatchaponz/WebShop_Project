<?php
    $connect = mysqli_connect('localhost', 'root', '', 'myshop');
    if(mysqli_connect_errno())
    {
        mysqli_close($connect);
        exit();
    }

    if(isset($_POST["submit"]))
    {
        $user_id = $_POST['user_id'];
        $firstname = $_POST['first_name'];
        $midname = $_POST['mid_name'];
        $lastname = $_POST['last_name'];
        $phone = $_POST['phone'];
        $country = $_POST['country'];
        $city = $_POST['city'];
        $address1 = $_POST['address1'];
        $address2 = $_POST['address2'];
        $postcode = $_POST['postcode'];

        $address1 = str_replace(array("'","\"") ," ", $address1);
        $address2 = str_replace(array("'","\"") ," ", $address2);

        $update_del = "UPDATE delivery_address 
                       SET FirstName = '$firstname', MiddleName = '$midname', LastName = '$lastname',
                           Address_1 = '$address1', Address_2 = '$address2', Country = '$country',
                           City = '$city', PostCode = '$postcode', Phone = '$phone'
                       WHERE User_ID = '$user_id'; ";
        
        $update = mysqli_query($connect,$update_del);

        if($update)
        {
            echo "<script>location.href = '../profile.html'</script>";
        }
        else
        {
            echo $update_del . mysqli_error($connect);
        }
    }


?>