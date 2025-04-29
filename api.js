// api.js
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyMaCcO51HG00IYB_B8Dp4Zedm0iavnXlR5bZxZPn4KGTLe-xKCj-uSBTbvScx09zeR/exec';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-pagos');
  const mensaje = document.getElementById('mensaje-confirmacion');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value,
      fecha: form.fecha.value,
      monto: form.monto.value,
      metodo: form.metodo.value,
    };

    fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      if (result.status === 'success') {
        form.reset();
        mensaje.style.display = 'block';
        setTimeout(() => mensaje.style.display = 'none', 3000);
      } else {
        alert('Error: ' + result.message);
      }
    })
    .catch(error => {
      console.error('Error de conexión:', error);
      alert('Error de conexión. Inténtalo de nuevo.');
    });
  });
});