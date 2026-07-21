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

// Código para abrir a foto grande
var modal = document.getElementById("modal");
var modalImg = document.getElementById("img01");
var legenda = document.getElementById("legenda");

// Quando clicar em qualquer foto com class="zoom-img"
document.querySelectorAll('.zoom-img').forEach(img => {
img.onclick = function(){
modal.style.display = "block";
modalImg.src = this.src;
legenda.innerHTML = this.alt;
}
})

// Quando clicar no X pra fechar
document.querySelector(".fechar").onclick = function() { 
modal.style.display = "none";
}
 
// Fechar clicando fora da imagem também
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
});
