const auth = firebase.auth();
let confirmationResult;

const sendCodeBtn = document.getElementById('send-code');
const verifyCodeBtn = document.getElementById('verify-code');
const phoneInput = document.getElementById('phone-number');
const codeInput = document.getElementById('code');

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible'
});

sendCodeBtn.addEventListener('click', () => {
  const phoneNumber = "+55" + phoneInput.value;
  auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then((result) => {
      confirmationResult = result;
      codeInput.style.display = 'block';
      verifyCodeBtn.style.display = 'block';
      alert("Código enviado! Olha o SMS");
    }).catch((error) => {
      alert("Erro: " + error.message);
    });
});

verifyCodeBtn.addEventListener('click', () => {
  const code = codeInput.value;
  confirmationResult.confirm(code).then(() => {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
  }).catch(() => {
    alert("Código inválido");
  });
 });

// LIGHTBOX NOVO - Abrir foto grande ao clicar
const lightbox = document.getElementById("lightbox");
const imgGrande = document.getElementById("imgGrande");

// Quando clicar em qualquer foto do produto
document.addEventListener('click', function(e){
  if(e.target.tagName === 'IMG' && e.target.closest('.card')){
    lightbox.style.display = "block";
    imgGrande.src = e.target.src;
  }
});

// Fechar quando clicar no X ou fora da foto
lightbox.addEventListener('click', function(e){
 if(e.target === lightbox || e.target.classList.contains('fechar')){
    lightbox.style.display = "none";
  }
});
});
