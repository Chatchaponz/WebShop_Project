<?php
    $connect = mysqli_connect('localhost', 'root', '', 'myshop');
    if(mysqli_connect_errno())
    {
        mysqli_close($connect);
        exit();
    }

    if(isset($_POST['submit']))
    {
        $productname = $_POST['productname'];
        $description = $_POST['description'];
        $instock = $_POST['instock'];
        $price = $_POST['price'];
        $subcategory = $_POST['subcategory'];
        $seller = $_POST['seller'];

        $description = str_replace(array("'","\"") ," ", $description);
        
        //echo print_r($_POST);

        $name = $_FILES["img"]['name'];
        $target_dir = "../web_img/";
        $target_file = $target_dir . basename($_FILES["img"]['name']);

        // Select file type
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        // Valid file extensions
        $extensions_arr = array("jpg","jpeg","png","gif");

        // Check extension
        if( in_array($imageFileType,$extensions_arr))
        {
            // Upload file
            if(move_uploaded_file($_FILES["img"]['tmp_name'],$target_file))
            {
                $upload_file = "web_img/" . basename($_FILES["img"]['name']);
                $product_upload = "INSERT INTO product (`Seller`, `SubCategory_ID`, `Product_Name`, `Product_Description`, `Product_Instock`, `Product_Price`, `Product_img_dir`)
                VALUES ( $seller, '$subcategory' , '$productname', '$description', $instock,  $price , '$upload_file')";
                $upload = mysqli_query($connect, $product_upload);

                if($upload)
                {
                    echo "<script>location.href = '../profile.html';</script>";
                }
                else
                {
                    echo "Error" . $product_upload . "<br>" . mysqli_error($connect);
                }
            }
            else
            {
                echo "<script>alert('Cannot upload your image');
                            window.history.go(-1);
                      </script>";
            }
        }

    }
?>