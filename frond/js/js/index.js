
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
        console.log(datosUsuario)
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
  
      const userNavTop = document.getElementById('usernavtop');
      const userNav = document.getElementById('usernav');
      const perfi = document.getElementById('perfi');
  
      // Obtener los datos del usuario
      let { nombres, apellidos, perfil } = datosUsuario;
  
      // Convertir la primera letra de cada palabra a mayúscula y el resto a minúscula
      nombres = nombres.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
      apellidos = apellidos.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
      perfill = perfil.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  
  
      // Obtener el primer nombre y el primer apellido
      const primerNombre = nombres.split(' ')[0];
      const primerApellido = apellidos.split(' ')[0];
  
  
      // Establecer el valor del span con el nombre del usuario
      userNavTop.textContent = `${primerNombre} ${primerApellido}`;
  
      // Establecer el valor del h6 con el nombre del usuario
      userNav.textContent = `${primerNombre} ${primerApellido}`;
  
      perfi.textContent = `${perfill}`;
  };
  // Llamar a la función para obtener el token
  obtenerToken();
  



  const fetchData = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return;
        }
        
        // Hacer solicitudes para obtener los datos
        const [usuariosRes, miembroRes, ministerioRes, listaRes] = await Promise.all([
            fetch('http://localhost:3009/ADB/usuarios/count', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            fetch('http://localhost:3009/ADB/miembro/count', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }), 
             fetch('http://localhost:3009/ADB/ministerio/count', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            fetch('http://localhost:3009/ADB/lista/count', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            /*fetch('http://localhost:3009/ADB/ventas/count', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) */
        ]);

        // Verificar si todas las respuestas son exitosas
        if (usuariosRes.ok && miembroRes.ok && ministerioRes.ok && listaRes.ok) {
            const usuariosData = await usuariosRes.json();
            const miembroData = await miembroRes.json();
            const ministerioData = await ministerioRes.json();
            const listaData = await listaRes.json();


            // Actualizar los elementos HTML con los datos recibidos
            document.getElementById('usuarios').textContent = usuariosData.count;
            document.getElementById('miembro').textContent = miembroData.count;
            document.getElementById('ministerio').textContent = ministerioData.count;
            document.getElementById('lista').textContent = listaData.count;


        } else {
            throw new Error('Error al obtener los datos');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al obtener los datos'
        });
    }
};

// Llamar a la función fetchData cuando se cargue la página
window.onload = fetchData;