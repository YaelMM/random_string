//variables
const toggle = document.querySelector('.toggle');
const modal = document.querySelector(".modal");
const modalDeact = document.querySelector(".modal-deact");
const disable = document.querySelector(".disable");
const popup = document.querySelector(".copy-popup");
const psswrd = document.querySelector(".psswrd");
const overlay = document.getElementById("overlay");
const user = document.querySelector('.user');
const closeModal = document.querySelectorAll(".close-btn");

const nameUser = document.getElementById('name-user');
const nameEmail = document.getElementById('email-user');
const socialIcons =  document.getElementsByClassName("social-buttons")[0];
const nameButton = document.getElementById("submit-btn-name");
const textFieldName = document.getElementById("title-modal");
const error = document.getElementById("error-popup");
const errorBtn = document.getElementById("submit-btn-error");
const deleteCancelBtn = document.getElementsByClassName("btn cancel")[0];
const deleteAcceptBtn = document.getElementsByClassName("btn accept")[0];
const bodyDesactivate = document.getElementById("body-desactivate");
const textDesactivate = document.getElementById("text-desactivate");

let wasUser=false

//Function that allows you to load the name, email and linked social networks 
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        let socials = [];
        firebase.database().ref().child('users/' + user.uid + '/name').once('value',function(data) {
            nameUser.innerText= data.val();
            nameEmail.innerText=user.email;
        })
        user.providerData.forEach(function (profile) {
            socials.unshift(profile.providerId);
        });
        selecSocialIcons(socials);
    }
})


// navbar listener
toggle.addEventListener('click', (e) => {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
});

//Closes the pop up with the button, it only modifies the DOM
closeModal.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        modalDeact.classList.remove("active");
        overlay.classList.remove("active");
    });
})


//Closes the pop up by ckicking the shaded part, it only modifies the DOM
overlay.addEventListener("click", () => {
    modal.classList.remove("active");
    modalDeact.classList.remove("active");
    error.classList.remove("active");
    overlay.classList.remove("active");
});

//event listener for opening the modal to chenge username
user.addEventListener("click", () => {
    modal.classList.add("active");
    overlay.classList.add("active");
})

//event listener for opening the modal to deactivate account
disable.addEventListener("click", () => {
    modalDeact.classList.add("active");
    overlay.classList.add("active");
})

//event listener for opening the modal and send email for change password
psswrd.addEventListener("click", () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let socials = [];
            
            user.providerData.forEach(function (profile) {
                socials.push(profile.providerId);
            });
            let aux= socials.pop();
            if(aux == "password"){
                firebase.auth().sendPasswordResetEmail(user.email)
                .then(() => {
                    popup.classList.add("active");
                    setTimeout(() => { popup.classList.remove("active"); }, 3000);
                })
                .catch(error => {
                    console.error(error);
                })
            }else if(socials.pop()!=undefined){
                firebase.auth().sendPasswordResetEmail(user.email)
                .then(() => {
                    popup.classList.add("active");
                    setTimeout(() => { popup.classList.remove("active"); }, 3000);
                })
                .catch(error => {
                    console.error(error);
                })
            }else{
                error.classList.add("active");
                overlay.classList.add("active");
                
            }
        }
    })
})

//Change name listener
nameButton.addEventListener('click', (e) => {
    changeName(textFieldName.value);
});

//Closes the pop up by ckicking the button
errorBtn.addEventListener('click', (e) => {
    error.classList.remove("active");
    overlay.classList.remove("active");
});
//Closes the pop up by ckicking the button
deleteCancelBtn.addEventListener("click", () => {
    modalDeact.classList.remove("active");
    overlay.classList.remove("active");
})

//Event listener that delete the account user
deleteAcceptBtn.addEventListener("click", () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let id=user.uid
            user.delete().then(function() {
                firebase.database().ref(`users/${id}`).child('groups').once('value', groups => {
                    groups.forEach(group => {
                        firebase.database().ref(`groups/${group.key}/admins/${id}`).remove();
                    });
                }).then(() => {
                    firebase.database().ref(`users/${id}`).remove().then(() => {
                        window.location.replace("index.html")
                    })
                    .catch(error => {
                        console.error(error);
                    })
                })
                .catch(error => {
                    console.error(error);
                });

              }).catch(function(error) {
                console.error(error);
                textDesactivate.innerText="¿Eres tu? Verificalo."
                
                
            
                    let socials = []
                    user.providerData.forEach(function (profile) {
                        socials.push(profile.providerId)
                    });
                    let aux= socials.pop();
                    if(aux == "password"){
                        textDesactivate.innerText="Introduce tu contraseña para eliminar tu cuenta"
                        if( document.getElementById("passwrd-text")==null){
                            bodyDesactivate.innerHTML='<form onsubmit="return false"><input type="password" name="input-modal" id="passwrd-text" required></form><div class="modal-body" id="body-desactivate">'
                        }
                        
                        
                        let credential = firebase.auth.EmailAuthProvider.credential(
                            user.email, 
                            document.getElementById("passwrd-text").value
                        );
                        user.reauthenticateWithCredential(credential).then(() => {
                            textDesactivate.innerText="¿Seguro que desea eliminar su cuenta?";
                            bodyDesactivate.innerHTML="";
                        })
                        .catch(error => {
                            if( error.code=="auth/wrong-password" && document.getElementById("passwrd-text").value != ""){
                                textDesactivate.innerText="Contraseña incorrecta. Intentalo de nuevo.";
                                document.getElementById("passwrd-text").value="";
                            }
                            if(error.code =="auth/too-many-requests"){
                                textDesactivate.innerText="Alcanzaste el limite de intentos. Regresa mas tarde.";
                                bodyDesactivate.innerHTML="";
                            }
                            console.log(document.getElementById("passwrd-text").value)
                            console.error(error.code);
                        });
                    }else{
                        let provider;
                        switch (aux) {
                            case 'google.com':
                                textDesactivate.innerText="Se abrira una ventana emergente para comprobar tu cuenta";
                                provider = new firebase.auth.GoogleAuthProvider();
                                break;
                            case 'facebook.com':
                                textDesactivate.innerText="Se abrira una ventana emergente para comprobar tu cuenta";
                                provider = new firebase.auth.FacebookAuthProvider();
                                break;
                            case 'twitter.com':
                                textDesactivate.innerText="Se abrira una ventana emergente para comprobar tu cuenta";
                                provider = new firebase.auth.TwitterAuthProvider();
                                break;
                        }
                        user.reauthenticateWithPopup(provider).then(() => {
                            textDesactivate.innerText="¿Seguro que desea eliminar su cuenta?";
                        })
                        .catch(error => {
                          console.error(error);
                        });
                    }
              });
              
            
        }
    })
})



//function that selects icons from social network 
function selecSocialIcons(socials){
    let aux=socials.shift();
    if(aux=="password"){
        aux=socials.shift();
        switch(aux){
            case "google.com":
                socialIcons.innerHTML = "<div id='google' class='social-button'><i class='fab fa-google'></i></div><div id='email' class='social-button'><i class='fas fa-envelope'></i></div>";
                break;
            case "facebook.com":
                socialIcons.innerHTML = "<div id='facebook' class='social-button'><i class='fab fa-facebook'></i></div><div id='email' class='social-button'><i class='fas fa-envelope'></i></div>";
                break;			
            case "twitter.com":
                socialIcons.innerHTML = "<div id='twitter' class='social-button'><i class='fab fa-twitter'></i></div><div id='email' class='social-button'><i class='fas fa-envelope'></i></div>";
                break;
            case undefined:
                socialIcons.innerHTML = "<div id='email' class='social-button'><i class='fas fa-envelope'></i></div>";
                break;						
        }
    }else{
        switch(aux){
            case "google.com":
                socialIcons.innerHTML = "<div id='google' class='social-button'><i class='fab fa-google'></i></div>";
                break;
            case "facebook.com":
                socialIcons.innerHTML = "<div id='facebook' class='social-button'><i class='fab fa-facebook'></i></div>";
                break;			
            case "twitter.com":
                socialIcons.innerHTML = "<div id='twitter' class='social-button'><i class='fab fa-twitter'></i></div>";
                break;					
        }
    }
}

//Function that updates the name in the database 
function changeName(name){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.database().ref(`users/${user.uid}/name`).set(name).then(function() {
                user.updateProfile({
                    displayName: name
                }).then(function() {
                    nameUser.innerText= user.displayName
                    modal.classList.remove("active");
                    overlay.classList.remove("active");
                    textFieldName.value=""
                }).catch(function(error) {
                    console.log(error);
                });
              }).catch(function(error) {
                    console.log(error);
              });

        }
    })
}

//Functin detected log user
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        wasUser=true
    } else if(!wasUser) {
        window.location.replace("index.html")
    }
})