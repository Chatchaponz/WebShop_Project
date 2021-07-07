<?php 
    $connect = mysqli_connect('localhost', 'root', '', 'myshop');

    // ทำการ check connection ว่าถูกต้องหรือไม่
    if ($connect->connect_error) {
        die("Something wrong.: " . $connect->connect_error);
    }

    if(isset($_POST['submit']))
    {
      
      $paragraph_text = $_POST['paragraph_text'];
      $paragraph_text = str_replace(array("'","\"") ," ", $paragraph_text);
      $id = $_POST['case_id'];
      $text= "UPDATE support SET Problem_Replied = '$paragraph_text' , Problem_Status = 1 , Problem_Fixed_Datetime = CURRENT_TIMESTAMP WHERE Case_ID = '$id' ;" ;

      $update = mysqli_query($connect, $text);
      
      if($update)
      {
          echo "<script>location.href='../sidebar.html';</script>";
      }
      else
      {
          echo mysqli_error($connect);
      }

    }

    if(isset($_POST['id']))
    {
        $staff_id = $_POST['id'];
        $query = "SELECT *
                  FROM shopuser a INNER JOIN Support b ON a.User_ID = b.User_ID
                  WHERE Problem_Status = 0 AND Staff_ID = $staff_id;";
        
        $result = mysqli_query($connect,$query);
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $data[$i]['Problem_Topic'] = $row['Problem_Topic'];
            $data[$i]['Problem_Description'] = $row['Problem_Description'];
            $data[$i]['Problem_Issue_Datetime'] = $row['Problem_Issue_Datetime'];
            $data[$i]['Username'] = $row['Username'];
            $data[$i]['Case_ID'] = $row['Case_ID'];
            $i++;
        }
        echo json_encode($data);
    }

?>