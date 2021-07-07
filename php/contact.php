<?php
    $connect = mysqli_connect('localhost', 'root', '', 'myshop');
    if(mysqli_connect_errno())
    {
        mysqli_close($connect);
        exit();
    }

    if(isset($_POST['submit']))
    {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $topic = $_POST['topic'];
        $problem = $_POST['problem'];

        $problem = str_replace(array("'","\"") ," ", $problem);

        $select_staff = 
        "SELECT a.Staff_ID
        FROM Staff a INNER JOIN support b ON a.Staff_ID = b.Staff_ID 
        WHERE b.Problem_Status = 1
        GROUP BY b.Staff_ID
        ORDER BY  count(b.Staff_ID) LIMIT 1";

        $find_user = "SELECT User_ID FROM Shopuser WHERE Email = '$email'";
        $result = mysqli_query($connect,$find_user);
        if( mysqli_num_rows($result) == 0)
        {
            echo "<script>alert('Email does not exist!');
                        window.history.go(-1);</script>";
        }
        else if(mysqli_num_rows($result) > 0)
        {
            $problem_sql = "INSERT INTO support (`User_ID`, `Staff_ID`, `Problem_Issue_Datetime`, `Problem_Topic`, `Problem_Description`, `Problem_Status`)
            VALUES ( (SELECT User_ID FROM Shopuser WHERE Email = '$email' ), ($select_staff), CURRENT_TIMESTAMP, '$topic', '$problem', 0)";

            $problem = mysqli_query($connect,$problem_sql);

            if($problem)
            {
                echo "<script>alert('Problem Successfully Send');
                          location.href = '../contact.html';</script>";
            }
            else
            {
            echo "Error: " . $problem_sql. "<br>" . mysqli_error($connect);
            }
        }
        else
        {
            echo "Error: " . $find_user. "<br>" . mysqli_error($connect);
        }
    }

?>