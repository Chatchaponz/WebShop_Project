
let username = document.getElementById('username');
let password = document.getElementById('password');

jQuery("form").submit(function(e){
    e.preventDefault();
    $(document).ready(function(){
        $.ajax({
            url:"./php/login.php",
            method:"POST",
            data:{id: 1,
                  username_input: username.value,
                  password_input: password.value },
            dataType: "JSON",
            success: function(data)
            {
                check_login(data);
            }
        });
    });
});

function check_login(current_status)
{
    let login_status = localStorage.getItem("loginStatus");
    login_status = JSON.parse(login_status);

    if(login_status != null)
    {
        login_status.login = current_status.login;
        login_status.user_type = current_status.user_type;
        login_status.user_id = current_status.user_id;
        login_status.user_name = current_status.user_name;
        localStorage.setItem("loginStatus",JSON.stringify(login_status));
    }
    else
    {
        login_status = current_status;
        localStorage.setItem("loginStatus",JSON.stringify(login_status));
    }
    do_login(login_status);
}

function do_login(login_status)
{

    let warning = document.querySelector(".warning");
    

    if(login_status.login)
    {
        if(login_status.user_type == "user")
        {
            location.href = 'index.html';
        }
        else if(login_status.user_type == "staff")
        {
            location.href = 'sidebar.html';
        }
        else
        {
            warning.textContent = "Invalid Username, Email or Password";
        }
    }
    else
        warning.textContent = "Invalid Username, Email or Password";
}
