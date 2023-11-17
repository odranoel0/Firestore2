

function loginWithEmail() {
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      
      const user = userCredential.user;
      console.log('Usuário autenticado:', user.uid);
      window.location.replace('docs.html');
    })
    .catch(error => {
     
      console.error('Erro na autenticação:', error.message);
    });
}


function loginWithGoogle() {

  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
     
      const user = result.user;
      console.log('Usuário autenticado com o Google:', user.uid);
      window.location.replace('docs.html'); 
    })
    .catch(error => {
      
      console.error('Erro na autenticação com o Google:', error.message);
    });
}


function cadastrar() {

  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {

      const user = userCredential.user;
      console.log('Usuário criado com sucesso:', user.uid);
      window.location.href = "docs.html"; 
    })
    .catch(error => {
   
      console.error('Erro na criação de usuário:', error.message);
      alert(error.message);
    });
}