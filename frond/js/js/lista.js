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
  
  
  
  
  //*********************************poner en mayuscula**********************************/
  function mayus(e) {
      e.value = e.value.toUpperCase();
    }
    //*********************************poner en mayuscula**********************************/
    
    const getAllCategories = async () => {
      try {
        // Verificar si el token está presente en el localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
          window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
          return; // Detener la ejecución del código
        }
        const response = await fetch("http://localhost:3009/ADB/miembro",{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        if (result.error) {
          console.error("Error:", result.message);
          return [];
        } else {
          return result.data;
        }
      } catch (error) {
        console.error("Error:", error.message);
        return [];
      }
    };
    
    const getAllMeasures = async () => {
      try {
        // Verificar si el token está presente en el localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
          window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
          return; // Detener la ejecución del código
        }
        const response = await fetch("http://localhost:3009/ADB/ministerio",{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        //console.log(result.data)
        if (result.error) {
          console.error("Error:", result.message);
          return [];
        } else {
          return result.data;
        }
      } catch (error) {
        console.error("Error:", error.message);
        return [];
      }
    };
    
  
    const populateSelect = (selectElement, options, valueFieldName, textFieldName) => {
      selectElement.innerHTML = '<option value="">Seleccione una opción</option>';
      options.forEach(option => {
          const optionElement = document.createElement("option");
          optionElement.value = option[valueFieldName];
          optionElement.textContent = option[textFieldName];
          selectElement.appendChild(optionElement);
      });
    };
  
    const populateFormSelects = async () => {
        const miembroSelect = document.getElementById("miembro");
        const ministerioSelect = document.getElementById("ministerio");
     /*    const miembroSelect = document.getElementById("miembro"); */
  
  
        const miembros = await getAllCategories();
        const ministerios = await getAllMeasures();
       /*  const miembro = await getAllMiasures(); */
  
  
        populateSelect(miembroSelect, miembros, "id_miembro", "nombres");
        populateSelect(ministerioSelect, ministerios, "id_ministerio", "nombre");
       /*  populateSelect(miembroSelect, miembro, "id_miembro", "nombres") */;
  
  
        // Inicializa Select2 en los selectores después de haber poblado las opciones
        $(document).ready(function() {
            $('#miembro').select2();
            $('#ministerio').select2();
           /*  $('#miembro').select2(); */
        });
    };
  
    // Llama a esta función para poblar los select cuando la página se carga
    populateFormSelects();
    //***********************************crear usuario*************************************/
    const formAgregarUsuario = document.getElementById("form");
    
    formAgregarUsuario.addEventListener("submit", async function (event) {
      event.preventDefault(); // Evitars que se recargue la página al enviar el formulario
  
      // Obtener los valores del formulario, incluida la foto
      const descripcion = document.getElementById("descripcion").value;
      const fecha_lista = document.getElementById("fecha_lista").value;
      const miembro = document.getElementById("miembro").value;
      const ministerio = document.getElementById("ministerio").value;
    /*   const miembro = document.getElementById("miembro").value; */
  
      console.log(descripcion, fecha_lista, miembro, ministerio)
  
      try {
        // Verificar si el token está presente en el localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
          window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
          return; // Detener la ejecución del código
        }
        // Enviar los datos al servidor para crear el nuevo usuario
        const response = await fetch(
          "http://localhost:3009/ADB/create_lista",
          {
            method: "POST",
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
            },
            //body: formData, // Usar el FormData que contiene la foto
            body: JSON.stringify({
              descripcion,
              fecha_lista,
              miembro,
              ministerio
          
             })
          }
        );
    
        if (response.ok) {
          const create = await response.json();
          // Destruir DataTable antes de eliminar la fila
          if ($.fn.DataTable.isDataTable("#myTable")) {
            $('#myTable').DataTable().destroy();
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
            title: create.message,
          });
          
          getAll();
        } else {
          const errorData = await response.json();
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: "error",
            title: errorData.error,
          });
          getAll();
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Error al enviar la solicitud");
      }
    });
    //***********************************crear usuario*************************************/
  
  
  
  
  
    const getAllCategorie = async () => {
      try {
          const token = localStorage.getItem("token");
          if (!token) {
              window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
              return {};
          }
          const response = await fetch("http://localhost:3009/ADB/miembro", {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });
          if (!response.ok) {
              throw new Error("Error en la solicitud");
          }
          const result = await response.json();
          if (result.error) {
              console.error("Error:", result.message);
              return {};
          } else {
              return result.data.reduce((acc, category) => {
                  acc[category.id_miembro] = category.nombres;
                  return acc;
              }, {});
          }
      } catch (error) {
          console.error("Error:", error.message);
          return {};
      }
  };
  
  const getAllMeasure = async () => {
      try {
          const token = localStorage.getItem("token");
          if (!token) {
              window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
              return {};
          }
          const response = await fetch("http://localhost:3009/ADB/ministerio", {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });
          if (!response.ok) {
              throw new Error("Error en la solicitud");
          }
          const result = await response.json();
          if (result.error) {
              console.error("Error:", result.message);
              return {};
          } else {
              return result.data.reduce((acc, measure) => {
                  acc[measure.id_ministerio] = measure.nombre;
                  return acc;
              }, {});
          }
      } catch (error) {
          console.error("Error:", error.message);
          return {};
      }
  };
  
  const getAllCategoriesPromise = getAllCategorie();
  const getAllMeasuresPromise = getAllMeasure();
  /* const getAllMiasuresPromise = getAllMiasure(); */
  
  
  
    //*************renderizado de tabla usuarios y mostrar tabla usuario*******************/
    const producto = document;
    
    const paginaProductos = producto.querySelector("#lista");
    
    const Productos = async (product) => {
      const {
          id_lista,
          descripcion,
          fecha_lista,
          id_miembro,
          id_ministerio,
          fecha_registro,
          estado
      } = product;
  
      const formattedDate = new Date(fecha_registro).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
      });
      const format_ela = new Date(fecha_lista).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
      });
     
  
      const buttonColor = estado === true ? "btn btn-outline-success" : "btn btn-outline-danger";
      const buttontxt = estado === true ? "SI" : "NO";
    
  
      // Esperar a que se resuelvan las promesas de getAllCategories y getAllMeasures
      const miembros = await getAllCategoriesPromise;
      const ministerios = await getAllMeasuresPromise;
     
  
  
      const miembroNombre = miembros[id_miembro] || "Desconocida";
      const ministerioNombre = ministerios[id_ministerio] || "Desconocida";
  
      return `
          <tr id="producto-row-${id_lista}">
              <td>${id_lista}</td>
              <td>${descripcion}</td>
              <td>${format_ela}</td>
              <td>${miembroNombre}</td>
              <td>${ministerioNombre}</td>
              <td>${formattedDate}</td>
              <td>
                  <div class="container-btn-state">
                      <button style="cursor: inherit;" class="${buttonColor}">${buttontxt}</button>
                  </div>
              </td>
              <td>
                  <div class="btn-group">
                      <button type="button" class="btn btn btn-outline-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          Acciones
                      </button>
                      <ul class="dropdown-menu ">
                          <li><a id="actualizar" class="dropdown-item" onclick="toggleEditMode(${id_lista})" class="dropdown-item" href="#">Actualizar</a></li>
                          <li><a onclick="deleteUser(${id_lista})" class="dropdown-item" href="#">Eliminar</a></li>
                          <li><a onclick="changeState(${id_lista}, ${estado})" class="dropdown-item" href="#" id="change-state-${id_lista}">${estado ? "Inhabilitar" : "Habilitar"}</a></li>
                      </ul>
                  </div>
              </td>
          </tr>
      `;
  };
      
      const render = async (data) => {
        try {
            const miembro = await getAllCategoriesPromise;
            const ministerio = await getAllMeasuresPromise;
           /*  const miembro = await getAllMiasuresPromise; */
  
    
            if (miembro && ministerio ) {
                const sortedProductos = data.sort((a, b) => {
                    if (a.estado && !b.estado) {
                        return -1;
                    }
                    if (!a.estado && b.estado) {
                        return 1;
                    }
                    return a.id_lista - b.id_lista;
                });
    
                if (Array.isArray(sortedProductos) && sortedProductos.length > 0) {
                    const cardsHTML = await Promise.all(sortedProductos.map((item) => Productos({ ...item, miembro, ministerio })));
                    paginaProductos.innerHTML = cardsHTML.join("");
    
                    if (!$.fn.DataTable.isDataTable("#myTable")) {
                        $("#myTable").DataTable({
                            language: {
                                decimal: "",
                                emptyTable: "No hay información",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
                                infoFiltered: "(Filtrado de _MAX_ total entradas)",
                                infoPostFix: "",
                                thousands: ",",
                                lengthMenu: "Mostrar _MENU_ Entradas",
                                loadingRecords: "Cargando...",
                                processing: "Procesando...",
                                search: "Buscar:",
                                zeroRecords: "Sin resultados encontrados",
                                paginate: {
                                    first: "Primero",
                                    last: "Ultimo",
                                    next: ">",
                                    previous: "<",
                                },
                            },
                            lengthMenu: [
                                [5, 10, 25, 50, -1],
                                [5, 10, 25, 50, "Todos"],
                            ],
                            pageLength: 5,
                            rowCallback: function (row, data) {
                                if (data[5] < 10) {
                                    $('td:eq(5)', row).css('color', 'red');
                                }
                            },
                            autoWidth: true,
                            order: [], // No ordenar ninguna columna al inicio
                            //order: [[0, 'desc']], // Ordenar la primera columna (columna del ID) de forma descendente al inicio
                        });
                    }
                } else {
                    paginaProductos.innerHTML = '<tr><td colspan="8">NO SE ENCONTRARON INGRESOS.</td></tr>';
                }
            } else {
                console.error("Error: No se resolvieron correctamente las promesas de tipos de ingreso , miembro.");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };
    
    const getAll = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
                return;
            }
            const response = await fetch("http://localhost:3009/ADB/lista", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            const result = await response.json();
            if (result.error) {
                console.error("Error:", result.message);
                alert(result.message);
            } else {
                render(result.data);
            }
        } catch (error) {
            console.error("Error:", error.message);
            const errorMessage = document.createElement("div");
            errorMessage.innerHTML = `
                <div class="row vh-100  rounded align-items-center justify-content-center mx-0">
                    <div class="col-md-6 text-center p-4">
                        <i class="bi bi-exclamation-triangle display-1 text-primary"></i>
                        <h1 class="display-1 fw-bold mb-4">Error 403</h1>
                        <h1 class="mb-4">Page Not Found</h1>
                        <p class="mb-4">${error.message}</p>
                        <a class="btn btn-primary rounded-pill py-3 px-5" href="">Go Back To Home</a>
                    </div>
                </div>
            `;
            document.getElementById("chart").innerHTML = errorMessage.innerHTML;
        }
    };
    
   
    //*************renderizado de tabla usuarios y mostrar tabla usuario*******************/
  
    let isEditMode = false;
    
    const toggleEditMode = (id_lista) => {
      const row = document.getElementById(`producto-row-${id_lista}`);
      const editButton = row.querySelector("#actualizar");
      const cells = row.getElementsByTagName("td");
    
      // Guardar los valores originales de todas las celdas
      const valoresOriginales = [];
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        valoresOriginales.push(cell.innerHTML);
      }
    
      if (!isEditMode) {
        // Modo de edición
        editproducto(id_lista);
        editButton.innerHTML = "Guardar";
        editButton.setAttribute(
          "onclick",
          `toggleEditMode(${id_lista}, ${JSON.stringify(valoresOriginales)})`
        );
        isEditMode = true;
      } else {
        // Modo de guardar cambios
        saveChanges(id_lista, valoresOriginales);
        editButton.innerHTML = "Actualizar";
        editButton.setAttribute("onclick", `toggleEditMode(${id_lista})`);
        isEditMode = false;
      }
    };
    
    //*****************************editar usuario y guardar********************************/
    const editproducto = (id_lista) => {
      const row = document.getElementById(`producto-row-${id_lista}`);
      const cells = row.getElementsByTagName("td");
    
      // Guardar los valores originales de todas las celdas
      const valoresOriginales = [];
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        valoresOriginales.push(cell.innerHTML);
      }
    
      // Iterar sobre las celdas de la fila, excepto la primera y las últimas tres
      for (let i = 1; i < cells.length - 6; i++) {
        const cell = cells[i];
        const oldValue = cell.innerText.trim();
        cell.innerHTML = `<input class="tab" type="text" value="${oldValue}" style="width: 100%; ">`;
      }
    
      // Dejar la primera celda (id_producto) y las últimas tres celdas sin modificar
      for (let i = 0; i < 1; i++) {
        const cell = cells[i];
        // Aquí puedes dejar el contenido de la celda como está
      }
      for (let i = cells.length - 6; i < cells.length; i++) {
        const cell = cells[i];
        // Aquí puedes dejar el contenido de la celda como está
      }
    
      const editButton = cells[cells.length - 1].querySelector("#actualizar");
      editButton.setAttribute(
        "onclick",
        `toggleEditMode(${id_lista}, ${JSON.stringify(valoresOriginales)}, this)`
      );
    };
    
    // Función para guardar los cambios realizados en la fila
    const saveChanges = async (id_lista, valoresOriginales) => {
      const row = document.getElementById(`producto-row-${id_lista}`);
      const cells = row.getElementsByTagName("td");
      const newValues = [];
    
      for (let i = 1; i < cells.length - 6; i++) {
        const cell = cells[i];
        const newValue = cell.getElementsByTagName("input")[0].value;
        newValues.push(newValue);
      }
    
      // Restaurar los valores de la primera celda (id_producto) y las últimas tres celdas
      for (let i = 0; i < 1; i++) {
        const cell = cells[i];
        cell.innerHTML = valoresOriginales[i];
      }
      for (let i = cells.length - 6; i < cells.length; i++) {
        const cell = cells[i];
        cell.innerHTML = valoresOriginales[i];
      }
    
      try {
        // Mostrar el SweetAlert2 antes de guardar los cambios
        const { isConfirmed } = await Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Quieres guardar los cambios realizados?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, guardar",
        });
        if (isConfirmed) {
          // Verificar si el token está presente en el localStorage
          const token = localStorage.getItem("token");
          if (!token) {
            // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return; // Detener la ejecución del código
          }
          const response = await fetch(
            `http://localhost:3009/ADB/lista/${id_lista}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                descripcion: newValues[0],
              }),
            }
          );
    
          if (response.ok) {
            const update = await response.json();
            // Destruir DataTable antes de eliminar la fila
            if ($.fn.DataTable.isDataTable("#myTable")) {
              $('#myTable').DataTable().destroy();
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
              title: update.message,
            });
            getAll();
          } else {
            const update = await response.json();
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
              title: "Error al actualizar el usuario",
            });
            getAll();
          }
        } else {
          // Si el usuario cancela, ejecutar la función getAll()
          getAll();
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        // Eliminar la clase 'active' del botón
        getAll();
      }
    };
    //*****************************editar usuario y guardar********************************/
    
    //*******************************inavilitar, habilitar*********************************/
    const changeState = async (userId, currentState) => {
      try {
        let newState = true;
        let buttonText = "Habilitar";
        if (currentState == true) {
          newState = false;
          buttonText = "Inhabilitar";
        }
        // Mostrar el SweetAlert2 antes de cambiar el estado
        const { isConfirmed } = await Swal.fire({
          title: "¿Estás seguro?",
          text: `¿Deseas ${buttonText.toLowerCase()} el ingreso ${userId}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Sí, ${buttonText.toLowerCase()}`,
          background: "rgba(255, 255, 255,)",
        });
    
        if (isConfirmed) {
          // Verificar si el token está presente en el localStorage
          const token = localStorage.getItem("token");
          if (!token) {
            // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return; // Detener la ejecución del código
          }
          const response = await fetch(
            `http://localhost:3009/ADB/lista/${userId}/state`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ state: newState }), // Cambiar el estado a 0
            }
          );
    
          if (response.ok) {
            const messageData = await response.json();
            // Destruir DataTable antes de eliminar la fila
            if ($.fn.DataTable.isDataTable("#myTable")) {
              $('#myTable').DataTable().destroy();
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
              title: messageData.message,
            });
            getAll();
          } else {
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
              title: "Error al cambiar el estado del ingreso",
            });
            getAll();
          }
        }
      } catch (error) {
        alert("Error " + error);
        getAll();
      }
    };
    
    //*******************************inavilitar, habilitar*********************************/
    
    //*************************************eliminar**************************************/
    const deleteUser = async (userId) => {
      try {
        // Mostrar el SweetAlert2 antes de eliminar el usuario
        const { isConfirmed } = await Swal.fire({
          title: "¿Estás seguro?",
          text: `¿Deseas eliminar el ingreso ${userId}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          background: "rgba(255, 255, 255,)",
        });
    
        if (isConfirmed) {
          // Verificar si el token está presente en el localStorage
          const token = localStorage.getItem("token");
          if (!token) {
            // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return; // Detener la ejecución del código
          }
          const response = await fetch(
            `http://localhost:3009/ADB/lista_delete/${userId}`,
            {
              method: "DELETE",
              headers:{
                Authorization: `Bearer ${token}`,
              }
            }
          );
    
          if (response.ok) {
            const eliminado = await response.json();
            // Destruir DataTable antes de eliminar la fila
            if ($.fn.DataTable.isDataTable("#myTable")) {
              $('#myTable').DataTable().destroy();
            }
            // Actualizar la tabla después de eliminar el usuario
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
    
            Toast.fire({
              icon: "success",
              title: eliminado.message,
            });
    
            getAll(); // Función para actualizar la tabla
          } else {
            // Actualizar la tabla después de un error
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
    
            Toast.fire({
              icon: "error",
              title: "Error al eliminar miembro",
            });
    
            getAll(); // Función para actualizar la tabla
          }
        }
      } catch (error) {
        alert("Error " + error);
        getAll(); // Función para actualizar la tabla
      }
    };
    //*************************************eliminar**************************************/
    
    getAll();
    