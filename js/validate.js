let password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword()
{
  if(password.value != confirm_password.value) 
  {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } 
  else 
  {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


email = document.getElementById('email');
phone = document.getElementById('phone');
user = document.getElementById('username');


jQuery("form").submit(function(e){
  e.preventDefault();
  $(document).ready(function(){
    $.ajax({
      url:"./php/register.php",
      method:"POST",
      data:{id: 1,
            email: email.value,
            phone: phone.value,
            user: user.value }, // will be in $_POST["id"]
      dataType: "JSON",
      success: function(data)
      {
          if (data.user_exist)
          {
            text_warning('Username');
          }
          else if (data.email_exist)
          {
            text_warning('Email Address');
          }
          else if (data.phone_exist)
          {
            text_warning('Phone Number');
          }
          else
          {
            text_warning('none');
            submit_form();
          }
      }
    })
  });
});

function text_warning(type)
{
  let warning = document.querySelector('.warning');
  if(type != 'none')
    warning.textContent = type + " already exist";
  else
    warning.textContent = " ";
}

function submit_form()
{
  let form = document.getElementById('register__form');
  form.submit();
}