<?php 
  $connect = mysqli_connect('localhost', 'root', '', 'myshop');
  if(mysqli_connect_errno())
  {
      mysqli_close($connect);
      exit();
  }

  $userInfo_query = "SELECT * FROM";

  echo
    '<div class="col-lg-8">

        <div class="card shadow-sm">
          <div class="card-header bg-transparent border-0">
            <h3 class="mb-0"><i class="far fa-clone pr-1"></i>My Information</h3>
          </div>
          <div class="card-body pt-0">
            <table class="table table-bordered">
              <tr>
                <th width="30%">Username</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">Gender</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">BirthDate</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">Address	line 1</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">Address	line 2</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">Country</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">City</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">PostCode</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">Phone Number</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">Last Login</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">Last Logout</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
              <tr>
                <th width="30%">Account Creation Date</th>
                <td width="2%">:</td>
                <td>dummytext</td>
              </tr>
            </table>
          </div>
        </div>
        
        <div style="height: 26px"></div>
        
        <div class="card shadow-sm">
          <div class="card-header bg-transparent border-0">
            <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Other Information</h3>
          </div>
          <div class="card-body pt-0">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>

      </div>';

?>