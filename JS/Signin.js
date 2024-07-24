const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");
const user_signup = document.querySelector(".user-signup");
const email_signup= document.querySelector(".email-signup");
const password_signup= document.querySelector(".password-signup");
const email_signin= document.querySelector(".email-signin");
const password_signin= document.querySelector(".password-signin");

signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());

//JS to have database

const firebaseConfig = {
	apiKey: "AIzaSyAZMFRpHxCY6THKY8oL--o17J-vkPmtG7Q",
	authDomain: "demandintel-ai.firebaseapp.com",
	projectId: "demandintel-ai",
	storageBucket: "demandintel-ai.appspot.com",
	messagingSenderId: "405515129428",
	appId: "1:405515129428:web:98e28c85159da0445553c1"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);   
  const db = firebase.firestore();
  const storage = firebase.storage();
  let timer;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



  
  today  = new Date();
  var date = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear() ; //gives the  current date to the system


document.getElementById("user-signup").addEventListener("keyup", (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        globalThis.userNameReg = document.getElementById("user-signup").value.toLowerCase();
        isUser(userNameReg);
    
        }, 500);
        
        document.getElementById("user-signup").value.length == 0 ? document.querySelector(".registerForm > .name-container > .validUserName").style.opacity = "0" : null;
})


document.getElementById("signup_button").addEventListener("click", () => {
    console.log("clicked")
    const regName = document.getElementById("user-signup").value;
    const regEmail = document.getElementById("email-signup").value;
    const regPass = document.getElementById("password-signup").value;
    
        if(isEmail(regEmail))
        {
                // document.querySelector(".loaderMask").style.zIndex = "100";
                // document.querySelector(".loaderMask").style.opacity = "1";
                //create account of the user
                firebase.auth().createUserWithEmailAndPassword(regEmail, regPass)
                .then((userCredential) => {
                    var user = userCredential.user //contains the user credentials
                    db.collection('users').doc(regName.toLowerCase().trim()).set({
                        username : regName.toLowerCase().trim(),
                        password : regPass,
                        email : regEmail,
                        uid : user.uid,
                        displayName : regName,
                        dateCreated: date,
                        region : "null",
                    })
                    .then(() => {
                        //do the needful to bring up the login page
                        
                        document.getElementById("user-signup").value = "";
                        document.getElementById("email-signup").value = "";
                        document.getElementById("password-signup").value = "";
                        // document.getElementById("confirmpassword-signup").value = "";


                        // document.querySelector(".loaderMask").style.zIndex = "-1";
                        // document.querySelector(".loaderMask").style.opacity = "0";
                        // document.querySelector(".registerForm").style.top = "150%";
                        // document.querySelector(".loginForm").style.top = "50%";

                    })
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage)
                    // errorMessage == "The email address is already in use by another account." ? typeWriterErrorHTML("errorMessage","The email address is already in use"): typeWriterErrorHTML("errorMessage", errorMessage);
                    
                  });
        }
        else if(isEmail(regEmail) == false)
        {
            // typeWriterErrorHTML("errorMessage", "Invalid EMail Address");
        }
    
})


document.getElementById("signin_btn").addEventListener("click", () =>{
    const loginName = document.getElementById("signinNameinp").value.toLowerCase().trim();
    const loginPass = document.getElementById("signinPasswordInp").value;
    document.querySelector(".loaderMask").style.zIndex = "100";
    document.querySelector(".loaderMask").style.opacity = "1";
    if(loginName != "")
    {
        db.collection("users").doc(loginName).get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data());
                if(doc.data().password != loginPass)
                {
                    // typeWriterErrorHTML("errorMessageLogin", "Wrong Password");
                    document.querySelector(".loaderMask").style.zIndex = "-1";
                    document.querySelector(".loaderMask").style.opacity = "0";
                }
                else
                {   localStorage.setItem("farmerPodUser",loginName);
                    location.replace("inermediate.html");
                }
            }
            else
            {
                // typeWriterErrorHTML("errorMessageLogin", "Account Doesn't Exist, Sign Up")
                document.querySelector(".loaderMask").style.zIndex = "-1";
                document.querySelector(".loaderMask").style.opacity = "0";
            }
        })
        
    }
    else 
    {
        // typeWriterErrorHTML("errorMessageLogin", "Insufficient Information")
    }
    
})

function isUser(userName)
{
    if(userName.trim() != "")
    {
        var usrFind = db.collection("users").doc(userName);
        usrFind.get().then((doc) => {
            if(doc.exists)
            {
                document.querySelector(".registerForm > .name-container > .validUserName").style.opacity = "0"
                document.getElementById("user-signup").style.color = "red";
                // typeWriterErrorHTML("errorMessage", "This Username Exists");
                return false;
            }
            else
            {
                document.getElementById("user-signup").style.color = "#3b3b3b";
                document.querySelector(".registerForm > .name-container > .validUserName").style.opacity = "1"
                return true;
            }
        });
    }
    else
    {
        return false;
    }
    if(userName.length < 5)
    {
        return false;
    }
}

function isEmail(emailAdress){

    emailAdress = document.getElementById("email-signup").value;
    if (emailAdress.match(regex)) 
    return true;
    else 
    {
        return false; 
    }
    
    }
    
    document.getElementById("email-signup").addEventListener("input", () => {
        var emailReg = document.getElementById("email-signup").value;
        if(isEmail(emailReg) == true)
        {
        document.getElementById("validEmail").style.opacity = "1";
        }
        else
        {
            document.getElementById("validEmail").style.opacity = "0";
    
        }
        emailReg.length == 0 ? document.getElementById("validEmail").style.opacity = "0" : null;
    })

    //the next starting point to start coding
// function isPassword(pass)
// {
//     regconfPass = document.getElementById("confirmpassword-signup").value;
//     console.log(pass.length)
//     if((pass.length >= 6) && (pass == regconfPass))
//     {   
//         return true;
//     }
//     else 
//     {
//         return false;
//     }

// }

document.getElementById("password-signup").addEventListener("input", () => {
    regPass = document.getElementById("password-signup").value;
    regconfPass = document.getElementById("confirmpassword-signup").value;
    if(isPassword(regPass))
    {
        document.getElementById("validPassword").style.opacity = "0";
        document.getElementById("validPasswordConf").style.opacity = "0";
    }
    else
    {
        document.getElementById("validPassword").style.opacity = "1";
        document.getElementById("validPasswordConf").style.opacity = "1";
    }


})






// function typeWriterErrorHTML(idOfTextHolder, textToType, speed) {
//     var i = 0;
//     var speed = speed || 25; // Default speed if not provided
//     document.getElementById(idOfTextHolder).innerHTML = "";
//     function type() {
//         if (i < textToType.length) {
//             document.getElementById(idOfTextHolder).innerHTML += textToType.charAt(i);
//             i++;
//             setTimeout(type, speed);
//         }
//          if(i == textToType.length )
//          {
//             setTimeout(() => {
//                 document.getElementById(idOfTextHolder).innerHTML = "";
//             }, 1500);
//          }
//     }
//     type(); // Call the function to start the typing effect
// }

function checkUserOnLogin()
{

        if(localStorage.getItem("farmerPodUser") != null)
        {

            location.replace("User.html");
        }
    
}

window.onload = e => {
    checkUserOnLogin();
}


// setInterval(() => {
//     togglePasswordvisibility();
// }, 500);