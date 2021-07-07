// login

let login_home = localStorage.getItem('loginStatus');
login_home = JSON.parse(login_home);

if(login_home != null && login_home.login)
{
  let login_btn = document.querySelector(".login__btn");
  let register_btn = document.querySelector(".register__btn");
  let person_icon = document.querySelector(".person__icon");

  login_btn.innerHTML = "<a href='index.html' class='nav__link'>Logout</a>";
  register_btn.innerHTML = "<a href='profile.html' class='nav__link'>"+ login_home.user_name +"</a>";
  person_icon.setAttribute('href','profile.html');

  login_btn.addEventListener('click', function(e){
    e.preventDefault();
      $(document).ready(function(){
        $.ajax({
          url:"./php/logout.php",
          method:"POST",
          data:{id: 1,
                userID: login_home.user_id},
          dataType: "JSON",
          success: function(data)
          {
              login_home.login = false;
              login_home.user_id = "none";
              login_home.user_name = "none";
              login_home.user_type = "none";

              localStorage.setItem("loginStatus",JSON.stringify(login_home));

              location.href = "index.html";
          }
        });
      });

  });
}

