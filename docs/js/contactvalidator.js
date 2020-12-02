// Variables
const btnSend = document.querySelector('#send');
const formulario = document.querySelector('#contactForm');
// Campos
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
eventListeners();

function eventListeners() {

   document.addEventListener('DOMContentLoaded', iniciarApp);
   // Validar campos
   nombre.addEventListener('keydown', validarFormulario)
   email.addEventListener('keydown', validarFormulario)
   mensaje.addEventListener('keydown', validarFormulario)

   // Enviar email
   // formulario.addEventListener('submit', enviarMail)
}

// Functions

function iniciarApp() {
   btnSend.disabled = true
}

function validarFormulario(e) {
   if (e.target.value.length > 0) {
      //elimina errores
      const error = document.querySelector('p.error')
      if (error) {
         error.remove();
      }
      e.target.classList.remove('border-danger');
      e.target.classList.add('border', 'border-success');
   } else {
      e.target.classList.add('border', 'border-danger');
      e.target.classList.remove('border-success');
      mostrarError('Todos los campos son obligatorios')
   }


   if (e.target.type === 'email') {

      if (regex.test(e.target.value)) {
         const error = document.querySelector('p.error')
         if (error) {
            error.remove();
         }
         e.target.classList.remove('border-danger');
         e.target.classList.add('border', 'border-success');
      } else {
         e.target.classList.add('border', 'border-danger');
         e.target.classList.remove('border-success');
         mostrarError('Email no válido')

      }
   }
   if (regex.test(email.value) && nombre.value !== '' && mensaje.value !== '') {
       btnSend.disabled = false
   }
}

function mostrarError(mensaje) {
   const mensajeError = document.createElement('p');
   mensajeError.textContent = mensaje
   mensajeError.classList.add('text-danger', 'text-center', 'error')

   const errores = document.querySelectorAll('.error')
   if (errores.length === 0) {
      formulario.insertBefore(mensajeError, document.querySelector('.form-group'))
   }

}

function enviarMail(e) {
   e.preventDefault();
   // mostrar spinner
   const spiner = document.querySelector('.loader');
   spiner.style.display = 'block';
   setTimeout(() => {
      spiner.style.display = 'none'
      const exito = document.createElement('p')

      exito.textContent = 'El mensaje ha sido enviado correctamente';
      exito.classList.add('text-success', 'text-center')

      formulario.insertBefore(exito, spiner);
      setTimeout(() => {
         exito.remove();
         resetearForm();
      }, 1300);
   }, 1500);
}

function resetearForm() {
   formulario.reset()
   iniciarApp();

}