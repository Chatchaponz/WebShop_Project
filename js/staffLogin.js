// Staff login

let staff_login = localStorage.getItem('loginStatus');
staff_login = JSON.parse(staff_login);

if(staff_login != null && staff_login.login)
{
    $(document).ready(function(){
        $.ajax({
            url:"./php/fetch_staff.php",
            method: "POST",
            data:{id: staff_login.user_id},
            dataType: "JSON",
            success: function(data)
            {
                change_staff(data);
                get_problem();
                logout_check();
            }
        });
    });
}

function change_staff(data)
{
    let staff_profile = document.querySelector('.user-logo');

    staff_profile.innerHTML = `
        <div class="img" style="background-image: url(images/${data.Gender}.jpg);"></div>
        <h3>${data.Username}</h3>
    `;
}


function get_problem()
{
    $(document).ready(function(){
        $.ajax({
            url:"./php/process.php",
            method: "POST",
            data:{id: staff_login.user_id},
            dataType: "JSON",
            success: function(data)
            {
                show_problem(data);
            }
        });
    });
}

function show_problem(data)
{
    let problem = document.querySelector('#content');

    for(let i = 0; i < data.length; i++)
    {
        problem.innerHTML += `
        <div class="box_container">
        <div id = "poor_box" class="box">
            <h3 id = "shit_box" style="color:rgb(255, 255, 255);"><u>${data[i].Problem_Topic}</u></h3> 
            <div id="kai" class="hide">
                  
                  <p class="username" style="color:rgb(255, 255, 255)">Username: ${data[i].Username} 
                   </p>     
                  <p style="color:rgb(255, 255, 255);">${data[i].Problem_Description} 
                  </p>
                  
                  <form action="./php/process.php" method="POST">
                    <div class="input-container">
                      <textarea name="paragraph_text"  cols="40" rows="2" required></textarea>
                    </div>
                    <input type="text" name="case_id" value= ${data[i].Case_ID} hidden >
                    <div class="submitContainer">
                      <input type="submit" class="btn_submit" value="submit" name= "submit">
                    </div>
                  </form>
                </div>
            </div>
              
        </div>
        `;
    }

    var op_box = document.querySelectorAll("#shit_box");
    var allpoor_box = document.querySelectorAll("#poor_box");
    var elem=document.querySelectorAll("#kai");
    const x = Array(op_box.length).fill(0);

    for (let i = 0; i < op_box.length; i++){
        op_box[i].addEventListener("click",()=>{
            console.log('a');
        
           $('#sidebar').addClass('active');
           $(allpoor_box[i]).toggleClass('big');
             if(x[i]==0){
                
                 setTimeout(function(){$(elem[i]).toggleClass('show');},500)
                 x[i]=1;
             }else{$(elem[i]).toggleClass('show');x[i]=0;}
        
        console.log(elem[i]);
        
    });
    }

    
}

function logout_check()
{
    let staff_logout = document.querySelector(".staff_logout");

    if(staff_login != null)
    {
        staff_logout.addEventListener('click',function(){
            
            staff_login.login = false;
            staff_login.user_id = "none";
            staff_login.user_name = "none";
            staff_login.user_type = "none";

            localStorage.setItem("loginStatus",JSON.stringify(staff_login));

            location.href = "login.html";

        });
    }
}