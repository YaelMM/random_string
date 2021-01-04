//variable declaration
const d = document
const c = console.log
const f = firebase


const auth = f.auth(),
    user = auth.currentUser,
    formSignin = d.getElementById('signin'),
    formLogin = d.getElementById('login')

function createUserInDB(uid, name, email) {
    let usersRef = f.database().ref().child('users')

    usersRef.child(uid).set({
        name,
        email
    }).then(() => {
        window.location.replace("dashboard.html");
    }).catch((err) => {
        console.log(err);
    })
}


//event listeners
formSignin.addEventListener('submit', e => {
    e.preventDefault()
    alert('Registrando..')


    auth.createUserWithEmailAndPassword(
        e.target.email.value,
        e.target.password.value
    )
        .then(res => {
            c(res)
            c(res.user)
            //Insert in DB
            createUserInDB(
                res.user.uid,
                e.target.name.value,
                e.target.email.value
            )

        })
        .catch(err => {
            console.error(err)
            switch (err.code) {
                case 'auth/invalid-email':
                    alert('La dirección de correo electrónico esta vacia.');
                    break;
                case 'auth/weak-password':
                    alert('La contraseña debe tener al menos 6 caracteres.');
                    break;
                case 'auth/email-already-in-use':
                    alert('La cuenta de correo ' + e.target.email.value + ' ya existe. Intenta con otra.');
                    break;
                default:
            }

            e.target.name.focus()
        })
})

formLogin.addEventListener('submit', e => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(
        e.target.email.value,
        e.target.password.value
    )
        .then(user => {
            c(user)
            alert('Usuario logueado con el correo ' + e.target.email.value)
            window.location.replace("dashboard.html");
            e.target.reset()
        })
        .catch(err => {
            console.error(err)
            alert('Correo electrónico o password no son válidos. Verifica nuevamente tus datos.')
            e.target.password.focus()
        })
})