

let userId = null; // Variable global para almacenar el ID del usuario

// Función para obtener el token del servidor
const obtenerToken = async () => {
  try {
    // Hacer una solicitud HTTP al servidor para obtener el token
    const token = localStorage.getItem("token");
    if (!token) {
      // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
      window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
      return; // Detener la ejecución del código
    }
    const respuesta = await fetch('http://localhost:3009/ADB/usuario_aut', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include' // Incluir cookies en la solicitud
    });

    // Verificar si la respuesta fue exitosa (código de estado 200)
    if (respuesta.ok) {
      const datosUsuario = await respuesta.json();
      //console.log(datosUsuario)
      // Guardar el ID del usuario en la variable global
      userId = datosUsuario.id; 
      // Mostrar los datos en un formulario
      mostrarDatosEnFormulario(datosUsuario);
    } else {
      console.error('Error al obtener el token:', respuesta.statusText);
    }
  } catch (error) {
    console.error('Error al obtener el token:', error.message);
  }
};

// Función para mostrar los datos en un formulario HTML
const mostrarDatosEnFormulario = (datosUsuario) => {
    // Obtener referencias a los campos del formulario
    const nombreInput = document.getElementById('nombres');
    const apellidosInput = document.getElementById('apellidos');
    const usuarioInput = document.getElementById('usuario');
    const perfilInput = document.getElementById('perfil');
    const fechaInput = document.getElementById('fecha');
    const userNavTop = document.getElementById('usernavtop');
    const userNav = document.getElementById('usernav');
    const perfi = document.getElementById('perfi');

    // Obtener los datos del usuario
    let { nombres, apellidos, usuario, perfil, fecha_registro } = datosUsuario;

    // Establecer los valores de los campos del formulario con los datos del usuario
    nombreInput.value = nombres;
    apellidosInput.value = apellidos;
    usuarioInput.value = usuario;
    perfilInput.value = perfil;

    // Convertir la primera letra de cada palabra a mayúscula y el resto a minúscula
    nombres = nombres.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    apellidos = apellidos.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    perfill = perfil.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());


    // Obtener el primer nombre y el primer apellido
    const primerNombre = nombres.split(' ')[0];
    const primerApellido = apellidos.split(' ')[0];


    // Convertir la fecha de registro a un formato de año-mes-día compatible con el campo de entrada de fecha
    //const fechaFormateada = new Date(fecha_registro).toISOString().slice(0, 10);
    const fechaFormateada = new Date(fecha_registro).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        /* timeZoneName: 'short' */
      });
    // Establecer el valor del campo de fecha con el formato adecuado
    fechaInput.value = fechaFormateada;

    // Establecer el valor del span con el nombre del usuario
    userNavTop.textContent = `${primerNombre} ${primerApellido}`;

    // Establecer el valor del h6 con el nombre del usuario
    userNav.textContent = `${primerNombre} ${primerApellido}`;

    perfi.textContent = `${perfill}`;
};


// Llamar a la función para obtener el token
obtenerToken();



//*****************************editar contraseña y guardar********************************/
const formcanbiarcontra = document.getElementById("change-password-form");

formcanbiarcontra.addEventListener("submit", async function (event) {
  event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
  const contraseñaActual = document.getElementById("contraseña_actual").value;
  const nuevaContraseña = document.getElementById("nueva_contraseña").value;
  const confirmarContraseña = document.getElementById("confirmar_contraseña").value;

  console.log(contraseñaActual)
  console.log(nuevaContraseña)
  console.log(confirmarContraseña)

  // Verificar si las contraseñas nuevas coinciden
  if (nuevaContraseña !== confirmarContraseña) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden',
      });
      return; // Detener la ejecución del código
  }

  try {
      // Mostrar el SweetAlert2 antes de guardar los cambios
      const { isConfirmed } = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres guardar los cambios realizados?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar',
      });

      if (isConfirmed) {
        // Hacer una solicitud HTTP al servidor para obtener el token
        const token = localStorage.getItem("token");
        if (!token) {
          // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
          window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
          return; // Detener la ejecución del código
        }
        const response = await fetch(
            'http://localhost:3009/ADB/cambiar_contrasena',
            {
                method: 'PUT',
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId, //`${userId}`, // Incluir el ID del usuario en el cuerpo de la solicitud 
                    contraseñaActual,
                    nuevaContraseña,
                }),
            }
        );

        const result = await response.json();

        if (response.status !== 200) {
            // Actualizar la tabla después de cambiar el estado
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            Toast.fire({
              icon: "error",
              title: result.error || 'Error al actualizar la contraseña',
            });
            return;
        }
        // Actualizar la tabla después de cambiar el estado
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "success",
          title: 'Contraseña actualizada correctamente',
        });
        document.getElementById("change-password-form").reset();

      } else {
        // Si el usuario cancela y limpia el formulario
        document.getElementById("change-password-form").reset();
      }
  } catch (error) {
      /* Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar la contraseña',
      }); */
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        title: 'Ocurrió un error al actualizar la contraseña',
      });
  }
});

  

//*****************************editar contraseña y guardar********************************/
