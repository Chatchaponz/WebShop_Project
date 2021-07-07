let check_staff = localStorage.getItem('loginStatus');
check_staff = JSON.parse(check_staff);

if(check_staff != null && check_staff.login)
{
    $(document).ready(function(){
        $.ajax({
            url:"./php/fetch_staff.php",
            method: "POST",
            data:{id: check_staff.user_id},
            dataType: "JSON",
            success: function(data)
            {
                onload_staff(data);
            }
        });
    });
}

function onload_staff(data)
{
    let staff_image = document.querySelector('.left');

    staff_image.innerHTML = `
        <img src='./images/${data.Gender}.jpg' alt='user' width='300'>
    
        <h3>${data.FirstName} ${data.LastName}</h3>
        <p>${data.Position}</p>
    `;

    let staff_info = document.querySelector('.info');

    staff_info.innerHTML += `
        <div class="data">
        <h4>Staff ID</h4>
        <p>${data.Staff_ID}</p>
        </div>

        <div class="data">
            <h4>Username</h4>
            <p>${data.Username}</p>
        </div>

        <div class="data">
            <h4>Birth Date</h4>
            <p>${data.BirthDate}</p>
        </div>

        <div class="data">
            <h4>Gender</h4>
            <p>${data.Gender}</p>
        </div>

        <div class="data">
            <h4>Email</h4>
            <p>${data.Email}</p>
        </div>

        <div class="data">
            <h4>Phone</h4>
            <p>${data.Phone}</p>
        </div>

        <div class="data">
            <h4>Address</h4>
            <p>${data.Address1} ${data.Address2} ${data.Country} ${data.City} ${data.PostCode}</p>
        </div>
    `;
}