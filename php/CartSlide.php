<section class="cart__slide">
    <div class="arrival__slide container">
        <div class="glide" id="glide1">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <?php
                    $table = 'product';
                    $query = "SELECT * FROM $table ORDER BY Product_ID DESC LIMIT 4 ";
                    $result = mysqli_query($connect,$query);

                    while ($data = $result->fetch_assoc()) 
                    {
                        echo
                        "
                    <li class='glide__slide'>
                        <div class='arrival'>
                           <div class='cart__like'>

                                    <div class='image__holder'>
                                        <img src='{$data['Product_img_dir']}' alt=''>
                                    </div>

                                    <div class='cart__details'>
                                        <h1>{$data['Product_Name']}</h1>
                                        <p>
                                            {$data['Product_Description']}
                                        </p>

                                        <div class='rating'>";
                                        $star = 5;
                                        $rate = $data['Product_Rate'];
                                        while ($star != 0) {
                                            if ($rate != 0) 
                                            {
                                            echo
                                            "
                                            <span>
                                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                                                <path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'/>
                                                </svg>
                                            </span>
                                            ";
                                            $rate -= 1;
                                            } 
                                            else 
                                            {
                                            echo
                                            "
                                            <span>
                                                <svg>
                                                    <use xlink:href='./images/icons.svg#icon-star-empty'></use>
                                                </svg>
                                            </span>
                                            ";
                                            }
                                            $star -= 1;
                                        }   
                                        echo
                                        "
                                        </div>

                                        <!--
                                        <div class='colors'>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        -->
                                        <div class='btn__group'>
                                            <button class = 'add__cart' id = {$data['Product_ID']}>Add To Cart</button>
                                            <button>{$data['Product_Price']} ฿</button>
                                        </div>

                                    </div>
                            </div>
                        </div>
                    </li>";
                    }
                    ?>
                </ul>
            </div>
            
             <!---- Arrows ---->
            <div class="glide__arrows" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
                    prev
                </button>

                <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
                    next
                </button>
            </div>

            <!---- Thumbnails ---->
            <div class="glide__bullets" data-glide-el="controls[nav]">
                    
            <?php
                $query = "SELECT * FROM $table ORDER BY Product_ID DESC LIMIT 4 ";
                $result = mysqli_query($connect,$query);
                $count = 0;
                while ($data = $result->fetch_assoc()) 
                {
                    echo "
                    <button class='glide__bullet' data-glide-dir='={$count}'>
                        <div class='thumbnail'>
                            <img src='{$data['Product_img_dir']}' alt=''>
                        </div>
                    </button>";

                    $count += 1;
                }
            ?>
            </div>
        </div>
    </div>
</section>