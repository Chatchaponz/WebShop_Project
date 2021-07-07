<?php 
  $connect = mysqli_connect('localhost', 'root', '', 'myshop');
  if(mysqli_connect_errno())
  {
      mysqli_close($connect);
      exit();
  }

  if(isset($_POST["id"]))
  {
    $email_query = "SELECT * FROM shopuser WHERE Email = '".$_POST["email"]."' ";
    $email_check = mysqli_query($connect, $email_query);
    if(mysqli_num_rows($email_check) > 0)
    {
      $data['email_exist'] = true;
    }
    else
    {
      $data['email_exist'] = false;
    }

    $phone_query = "SELECT * FROM shopuser WHERE Phone = '".$_POST["phone"]."' ";
    $phone_check = mysqli_query($connect, $phone_query);
    if(mysqli_num_rows($phone_check) > 0)
    {
      $data['phone_exist'] = true;
    }
    else
    {
      $data['phone_exist'] = false;
    }

    $user_query = "SELECT * FROM shopuser WHERE Username = '".$_POST["user"]."' ";
    $user_check = mysqli_query($connect, $user_query);
    if(mysqli_num_rows($user_check) > 0)
    {
      $data['user_exist'] = true;
    }
    else
    {
      $data['user_exist'] = false;
    }

    echo json_encode($data);
  }


  if(isset($_POST['username']))
  {
      $username = $_POST['username'];
      $email = $_POST['email'];
      $password = $_POST['password'];
      $gender = $_POST['gender'];
      $birthdate = $_POST['birthdate'];
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

      $insert_user_sql = "INSERT INTO shopuser (`Email`, `Password`, `Username`, `Address_1`, `Address_2`, `Country`, `City`, `PostCode`, `Phone`, `BirthDate`, `Gender`) 
      VALUES ('$email', '$password', '$username', '$address1','$address2','$country', '$city', '$postcode', '$phone', '$birthdate', '$gender')";
      $insert_user = mysqli_query($connect, $insert_user_sql);

      if($insert_user)
      {

            $insert_delivary_sql = "INSERT INTO delivery_address (`User_ID`, `FirstName`, `MiddleName`, `LastName`, `Address_1`, `Address_2`, `Country`, `City`, `PostCode`, `Phone`)
            VALUES ( (SELECT User_ID FROM shopuser WHERE Username = '$username' ) , '$firstname', '$midname', '$lastname', '$address1', '$address2', '$country', '$city', '$postcode', '$phone')";
            $insert_delivary = mysqli_query($connect, $insert_delivary_sql);

            if($insert_delivary)
            {
              echo "<script>location.href = '../regisSuccess.html';</script>";
            }
            else
            {
              echo "Error" . $insert_delivary_sql . "<br>" . mysqli_error($connect);
            }
      }
      else
      {
        echo "Error: " . $insert_user_sql . "<br>" . mysqli_error($connect) ;
      }
  }

?>