let login_status = localStorage.getItem('loginStatus');
login_status = JSON.parse(login_status);

if(login_status != null && login_status.login)
{
    $(document).ready(function(){
        $.ajax({
          url:"./php/fetch_user.php",
          method:"POST",
          data:{id: login_status.user_id},
          dataType: "JSON",
          success: function(data)
          {
              onload_profile(data);
          }
        });
    });
}

function onload_profile(user_data)
{
    let username = document.querySelector(".name__profile");
    let img = document.querySelector(".profile_img");
    let warn = document.querySelector(".Warn");

    username.innerHTML = '<h3>' + user_data.Username + '</h3>';

    img.setAttribute('src', 'images/'+ user_data.Gender + '.jpg' );

    if(putData(user_data.Re_pen) != 'NA')
    {
      warn.textContent = " (" + user_data.Re_pen.length + ")";
    }

    myInformation(user_data);

    adjust_ProfilePage(user_data);
}

function adjust_ProfilePage(user_data)
{
    let my_info = document.querySelector(".my__info");
    let my_product = document.querySelector(".my__product");
    let add_product = document.querySelector('.add__product');
    let review_pending = document.querySelector(".review__pending");
    let statistic = document.querySelector('.statistic');
    let logout_btn = document.querySelector(".logout__btn");

    my_info.addEventListener('click', function(){
        myInformation(user_data);
    });

    my_product.addEventListener('click', function(){
        myProduct(user_data);
    });

    add_product.addEventListener('click', function(e){
        location.href = "addProduct.html";   
    });

    statistic.addEventListener('click', function(){
        statistic_user(user_data);
    });

    review_pending.addEventListener('click', function(){
        product_review_pending(user_data);
    });

    logout_btn.addEventListener('click', function(e){
    e.preventDefault();
      $(document).ready(function(){
        $.ajax({
          url:"./php/logout.php",
          method:"POST",
          data:{id: 1,
                userID: login_status.user_id},
          dataType: "JSON",
          success: function(data)
          {
            login_status.login = false;
            login_status.user_id = "none";
            login_status.user_name = "none";
            login_status.user_type = "none";

              localStorage.setItem("loginStatus",JSON.stringify(login_status));

              location.href = "index.html";
          }
        });
      });
    });
}

function myInformation(user_data)
{
    let result = document.querySelector(".result__option");

    result.innerHTML = `

    <div class="card shadow-sm">
      <div class="card-header bg-transparent border-0">
        <h3 class="mb-0"><i class="far fa-clone pr-1"></i>My Information</h3>
      </div>
      <div class="card-body pt-0">
        <table class="table table-bordered">
          <tr>
            <th width="30%">Username</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Username)}</td>
          </tr>
          <tr>
            <th width="30%">Gender</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Gender)}</td>
          </tr>
          <tr>
            <th width="30%">BirthDate</th>
            <td width="2%">:</td>
            <td>${putData(user_data.BirthDate)}</td>
          </tr>
          <tr>
            <th width="30%">Address	line 1</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Address_1)}</td>
          </tr>
          <tr>
            <th width="30%">Address	line 2</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Address_2)}</td>
          </tr>
          <tr>
            <th width="30%">Country</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Country)}</td>
          </tr>
          <tr>
            <th width="30%">City</th>
            <td width="2%">:</td>
            <td>${putData(user_data.City)}</td>
          </tr>
          <tr>
            <th width="30%">PostCode</th>
            <td width="2%">:</td>
            <td>${putData(user_data.PostCode)}</td>
          </tr>
          <tr>
            <th width="30%">Phone Number</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Phone)}</td>
          </tr>
          <tr>
            <th width="30%">Last Login</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Last_login)}</td>
          </tr>
          <tr>
            <th width="30%">Last Logout</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Last_logout)}</td>
          </tr>
          <tr>
            <th width="30%">Account Creation Date</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Created)}</td>
          </tr>
        </table>
      </div>
    </div>

    <div style="height: 26px"></div>

    <div class="card shadow-sm delivery_address">
      <div class="card-header bg-transparent border-0">
        <h3 class="mb-0"><i class="far fa-clone pr-1"></i>My Delivery Address</h3>
      </div>
      <div class="card-body pt-0">
        <table class="table table-bordered">
          <tr>
            <th width="30%">First Name</th>
            <td width="2%">:</td>
            <td>${putData(user_data.FirstName)}</td>
          </tr>
          <tr>
            <th width="30%">Middle Name</th>
            <td width="2%">:</td>
            <td>${putData(user_data.MiddleName)}</td>
          </tr>
          <tr>
            <th width="30%">Last Name</th>
            <td width="2%">:</td>
            <td>${putData(user_data.LastName)}</td>
          </tr>
          <tr>
            <th width="30%">Address	line 1</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Address_1)}</td>
          </tr>
          <tr>
            <th width="30%">Address	line 2</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Address_2)}</td>
          </tr>
          <tr>
            <th width="30%">Country</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Country)}</td>
          </tr>
          <tr>
            <th width="30%">City</th>
            <td width="2%">:</td>
            <td>${putData(user_data.City)}</td>
          </tr>
          <tr>
            <th width="30%">PostCode</th>
            <td width="2%">:</td>
            <td>${putData(user_data.PostCode)}</td>
          </tr>
          <tr>
            <th width="30%">Phone Number</th>
            <td width="2%">:</td>
            <td>${putData(user_data.Phone)}</td>
          </tr>
        </table>
        <button class="btn btn-primary btn-lg edit_address" style="margin-left: 93%">Edit</button>
      </div>
    </div>
    `;

    let edit_address = document.querySelector('.edit_address');
    let delivery_card = document.querySelector('.delivery_address');

    if(edit_address != null)
    {
      edit_address.addEventListener('click',()=>{
        edit_address.disabled = true;
        delivery_card.innerHTML += `
        <div class="card-body pt-0">
          <table class="table table-bordered">
            <tr>
            <td>
              <form method ="POST" action="./php/edit_delivery.php" class="deli_edit_form">

                <input type="text" name="user_id" value="${user_data.User_ID}" hidden>
                <div class="form-group">
                  <label>First Name*</label>
                  <input type="text" class="form-control" name="first_name" required
                   pattern="[A-Za-z]{1,50}" value="${putData(user_data.FirstName)}">
                </div>
                
                <div class="form-group">
                  <label>Middle Name</label>
                  <input type="text" class="form-control" name="mid_name"
                  pattern="[A-Za-z]{1,50}" value="${putData(user_data.MiddleName)}">
                </div>

                <div class="form-group">
                  <label>Last Name*</label>
                  <input type="text" class="form-control" name="last_name" required
                  pattern="[A-Za-z]{1,50}" value="${putData(user_data.LastName)}">
                </div>

                <div class="form-group">
                  <label>Address line 1*</label>
                  <textarea class="form-control" name="address1" style="resize: none" required>${putData(user_data.Address_1)}</textarea>
                </div>

                <div class="form-group">
                  <label>Address line 2</label>
                  <textarea class="form-control" name="address2" style="resize: none">${putData(user_data.Address_2)}</textarea>
                </div>

                <div class="form-group">
                <label for="exampleFormControlSelect1">Country*</label>
                <select class="form-control" name="country" required>
                  <option value="${putData(user_data.Country)}">${putData(user_data.Country)}</option>
                  <option value="Thailand">Thailand</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States of America">United States of America</option>
                  <option value="China">China</option>
                  <option value="Italy">Italy</option>
                  <option value="Japan">Japan</option>
                </select>
                </div>

                <div class="form-group">
                  <label>City*</label>
                  <input type="text" class="form-control" name="city" required
                  pattern="[A-Za-z]{1,50}" value="${putData(user_data.City)}">
                </div>

                <div class="form-group">
                  <label>Postal Code*</label>
                  <input type="text" class="form-control" name="postcode" required
                  pattern="[A-Za-z0-9/ ]{1,10}" value="${putData(user_data.PostCode)}">
                </div>

                <div class="form-group">
                  <label>Phone Number*</label>
                  <input type="text" class="form-control" name="phone" id="phone" required
                  pattern="[A-Za-z0-9 +]{1,20}" value="${putData(user_data.Phone)}">
                </div>

                <input type="submit" class="btn btn-primary btn-lg submit_deli" name="submit" value="Submit">
                
              </form>
            </td>
            </tr>
          </table>
        </div>
        `;
      });

      $('.deli_edit_form').submit(function(e){
        console.log('a');
      });
    }

}

function statistic_user(data)
{
  let result = document.querySelector(".result__option");
  result.innerHTML = `
  <div class="card shadow-sm">

    <div class="card-header bg-transparent border-0">
      <h3 class="mb-0"><i class="bi bi-bar-chart"></i> Statistic Analysis</h3>
    </div>

    <div class="card-body pt-0">
        <table class="table table-bordered stat_ana">

          <tr>
            <th width="15%">Your Income and Outcome</th>
            <th width="20%">Overall <i class="bi bi-bullseye"></i></th>
            <th width="20%">This Month <i class="bi bi-calendar-event"></i></th>
          </tr>

          <tr>
            <th>Total Spend <i class="bi bi-cash-coin"></i></th>
            <td>${putData(data.TotalSpent)} ฿</td>
            <td>${putData(data.TotalSpent_month)} ฿</td>
          </tr>

          <tr>
            <th>Total Income <i class="bi bi-cart-check"></i></th>
            <td>${putData(data.TotalSoldIncome)} ฿</td>
            <td>${putData(data.TotalSoldIncome_month)} ฿</td>
          </tr>

          </table>

     </div>

  </div>

  <div style="height: 26px"></div>
  <div class="card shadow-sm">
  
    <div class="card-header bg-transparent border-0">
      <h3 class="mb-0"><i class="bi bi-bar-chart"></i> Global Statistic Analysis</h3>
    </div>

    <h2 class="table_head">Amount of users in each country</h2>
    <div class="card-body pt-0">
        <table class="table table-bordered stat_ana2">

          <tr>
            <th width="50%">Country</th>
            <th width="50%">Amount of User</th>
          </tr>

          </table>

     </div>

     <h2 class="table_head">Most spend money User</h2>
     <div class="card-body pt-0">
        <table class="table table-bordered stat_ana3">

          <tr>
            <td>Name</td>
            <td>${putData(data.MostSpent.FirstName)} ${putData(data.MostSpent.LastName)}</td>
          </tr>

          <tr>
            <td>Total</td>
            <td>${putData(data.MostSpent.TotalSpent)} ฿</td>
          </tr>

          </table>
     </div>
     
     <h2 class="table_head">Best selling product</h2>
     <div class="card-body pt-0">
        <table class="table table-bordered stat_ana4">

          <tr>
            <td width="30%">
              <img src='${putData(data.BestSale.Product_img_dir)}'>
            </td>

            <td>
              <h1>${putData(data.BestSale.Product_Name)}</h1>
              <h4>Price: ${putData(data.BestSale.Product_Price)} ฿</h4>
              <h2>Already sold ${putData(data.BestSale.totalQuantity)} pieces!!!</h2>
            </td>
          </tr>

          </table>
     </div>
  </div>
  
  `;
  let country = document.querySelector('.stat_ana2');
  for(let i = 0; i< data.UserAmount.length; i++)
  {
    country.innerHTML += `
    <tr>
    <td>${putData(data.UserAmount[i].Country_a)}</td>
    <td>${putData(data.UserAmount[i].Number)} Users</td>
    </tr>
    `;
  }
}

function product_review_pending(data)
{
  let result = document.querySelector(".result__option");
  result.innerHTML = `
  <div class="card shadow-sm">

    <div class="card-header bg-transparent border-0">
      <h3 class="mb-0"><i class="bi bi-bar-chart"></i> Review Pending </h3>
    </div>

    <div class="card-body pt-0">
        <table class="table table-bordered review__pen">

        </table>

     </div>

  </div>`

  let rev_pen = document.querySelector('.review__pen');

  if(putData(data.Re_pen) != 'NA')
  {
  for(let i = 0; i< data.Re_pen.length; i++)
  {
    if(i==0)
    {
       rev_pen.innerHTML += `
       <tr><h4>Order ID : ${putData(data.Re_pen[i].Order_ID)}<br>Total : ${putData(data.Re_pen[i].Total)} ฿</h4></tr>` ;
    }
    else if(data.Re_pen[i-1].Order_ID != data.Re_pen[i].Order_ID)
    {
      rev_pen.innerHTML += `
      <tr><h4>Order ID : ${putData(data.Re_pen[i].Order_ID)} <br>Total : ${putData(data.Re_pen[i].Total)} ฿</h4></tr>` ;
    }

    rev_pen.innerHTML += `
      <tr>
        <td width="30%">
          <img src='${putData(data.Re_pen[i].Product_img_dir)}'>
        </td>

        <td>
          <h1>${putData(data.Re_pen[i].Product_Name)}</h1>
          <h2>${putData(data.Re_pen[i].Product_Description)}</h2>
          <h4>Price: ${putData(data.Re_pen[i].Product_Price)} ฿</h4>
          <h3>Quantity: ${putData(data.Re_pen[i].Quantity)} pieces</h3>
          <h3>Subtotal: ${putData(data.Re_pen[i].Subtotal)} ฿</h3>
          <form class= "re_pen_submit_div" method = "POST" action = "./php/submit_re.php">
            <input type="text" class="input_re" name="hid" value='${putData(data.Re_pen[i].SubOrderDetail_ID)}' hidden>
            <input type="text" class="input_re" name="input_re" 
            placeholder="Enter Short Review" pattern="[A-Za-z0-9 ]{1,100}" required>
            <label>Rate</label>
            <input type="number" class="rate" name="rate" min="0" max="5" required>
            <input type="submit" class="re_pen_submit" name="review" value ="Review">
          </form>
        </td>
      </tr>
      `;
  }
  }
}

function myProduct(data)
{
  let result = document.querySelector(".result__option");
  result.innerHTML = `
  <div class="card shadow-sm">

    <div class="card-header bg-transparent border-0">
      <h3 class="mb-0"><i class="bi bi-bar-chart"></i> My Product </h3>
    </div>

    <div class="card-body pt-0">
        <table class="table table-bordered my_product_table">

        </table>

     </div>

  </div>`

  let my_pro = document.querySelector('.my_product_table');

  for(let i = 0; i< data.myProduct.length; i++)
  {
    my_pro.innerHTML += `
      <tr>
        <td width="30%">
          <img src='${putData(data.myProduct[i].Product_img_dir)}'>
        </td>

        <td>
          <h1>${putData(data.myProduct[i].Product_Name)}</h1>
          <h4>${putData(data.myProduct[i].Product_Description)}</h4>
          <h5>Price: ${putData(data.myProduct[i].Product_Price)} ฿</h5>
          <h4>Rate: ${putData(data.myProduct[i].Product_Rate)}</h4>
          <h4>Current product in stock: ${putData(data.myProduct[i].Product_InStock)}</h4>
          <form class= "update_product_form" method = "POST" action = "./php/update_product.php">
            <input type="text" class="input_re" name="hid" value='${putData(data.myProduct[i].Product_ID)}' hidden>
            <label>Add product to Stock</label><br>
            <input type="number" class="add_stock" name="add_stock" min="0" max="9999" required>
            <input type="submit" class="updateProduct" name="updateProduct" value ="Update">
          </form>
          <h5 style = "margin-top: 5px">*Update product in stock also update rate</h5>
        </td>
      </tr>
      `;
  }
}

function putData(data)
{
   if(data == undefined || data == null)
      data = "NA";
   return data;
}