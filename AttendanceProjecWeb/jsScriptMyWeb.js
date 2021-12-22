
const F_signUpButton = document.getElementById('Facilitator');
const S_signUpButton = document.getElementById('Student');
const BTNLogIn = document.getElementById('btn_logIn');
const BTN_signUp = document.getElementById('btn_signUp');

const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
  }

//when click button for facilitator sign up
F_signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
	S_Role = "Facilitator";	
});

//when already to register/signUp
BTN_signUp.addEventListener('click', () => {
	
	var S_Fullname = document.getElementById('s_fullname').value;
	var S_Email = document.getElementById('s_email').value;
	var S_Username = document.getElementById('s_username').value;
	var S_Password = document.getElementById('s_password').value;
	var S_ConfirmPassword = document.getElementById('s_confirmpassword').value;
	
	if(S_Fullname ==""|| S_Email ==""|| S_Username ==""|| S_Password =="" ||S_ConfirmPassword =="")
	{
		swal("The requirements is incomplete!", "Please input the requirements completely", "warning");
	}
	else if(!validateEmail(S_Email))
	{
		swal("The Email is invalid!", "Please input the email properly", "warning");
	}
	else if(S_ConfirmPassword != S_Password)
	{
		//alert("Passwords Don't Match");
		swal("Please input passwords again!", "The passwords didn't matched", "warning");
	}else{
		$.ajax({
			type : "POST",
			url: "https://developers.aris-gail.com/21221ST_CS3101_G3/public_html/WebApi/v1/?op=addfaciStu",
			dataType: 'json',
			data: {
				Username:S_Username,
				Fullname:S_Fullname,
				Passwords:S_Password,
				Email:S_Email,
				Roles:S_Role
			},
			success: function(data){
				//alert(data.message);
				if(data.message == 'Could not sign up')
				{
					swal("Please try again", "Sign up is unsuccesful", "error");
				}
				else if(data.message == 'The Email is already taken')
				{
					swal("Please input email again!", "The Email is already taken", "warning");
				}
				else if(data.message == 'The Username is already taken')
				{
					swal("Please input username again!", "The username is already taken", "warning");
				}
				else if(data.message == 'Required parameter missing')
				{
					swal("The requirements is incomplete!", " ", "warning");
				}
				else
				{
					swal("The sign up is successfully!", " ", "success");
				}
			}
		});
		
	}
});	

//when click button for student sign up
S_signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
	S_Role = "Student";	

});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

BTNLogIn.addEventListener('click', () =>{
	var User = document.getElementById('user').value;
	var Pass = document.getElementById('pass').value;

	$.ajax({
		type : "POST",
		url: "https://developers.aris-gail.com/21221ST_CS3101_G3/public_html/WebApi/v1/?op=checklogIn",
		dataType: 'json',
		data: {
			Username:User,
			Passwords:Pass
		},
		success: function(data){
			//alert(data.message);
			if(data.message == 'Required parameter missing')
			{
				swal("Logged Failed!", "Input username and password!", "warning");
			}
			else if(data.message == 'Username or Password is incorrect')
			{
				swal("Logged Failed!", "Input username and password incorrect", "error");
			}
			else
			{
				swal("Log In!", "You successfully log in!", "success").then(function(){
					location.href = "https://developers.aris-gail.com/21221ST_CS3101_G3/public_html/Student%20Dashboard/Student%20Dashboard.html"
				});
				
			}
		}
	});

	//swal("Logged In!", "You successfully log in!", "success");
	
});


