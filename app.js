
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCWPIRtq8aBecSZUP5VAfnCGpoC0Kbi7KI",
    authDomain: "crud-fa490.firebaseapp.com",
    databaseURL: "https://crud-fa490.firebaseio.com",
    projectId: "crud-fa490",
    storageBucket: "crud-fa490.appspot.com",
    messagingSenderId: "1025499013959",
    appId: "1:1025499013959:web:4c3243d7eaff4714496262"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  coleccionProductos = db.ref().child('productos');
  bodyProductos = $('#bodyProductos').val();
 
 
  // console.log(bodyProductos);
  $('form').submit(function(e){
      e.preventDefault();
      let id = $('#id').val();
      let codigo = $('#codigo').val();
      let descripcion = $('#descripcion').val();
      let cantidad = $('#cantidad').val();

    let idFirebase = id;
    if(idFirebase == ''){
        idFirebase = coleccionProductos.push().Key;
    };

    data = { codigo:codigo, descripcion:descripcion, cantidad:cantidad};

    actualizacionData = {};

    actualizacionData[`/${idFirebase}`] = data;
    
    coleccionProductos.update(actualizacionData);
    id = '';
    $('form').trigger('reset');
    $('#modalAltaEdicion').modal('hide');

  });

  const iconoEditar = '<svg class="bi bi-folder-plus" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293z"/><path fill-rule="evenodd" d="M13.5 10a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/><path fill-rule="evenodd" d="M13 12.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/></svg>';
  const iconoBorrar = '<svg class="bi bi-folder-minus" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293z"/><path fill-rule="evenodd" d="M11 11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/></svg>';

  function mostrarProductos({codigo, descripcion, cantidad}){
      return `
      <td>${codigo}</td>
      <td>${descripcion}</td>
      <td>${cantidad}</td>
      <td><button class="btnEditar btn btn-secondary" data-toggle="tooltip" title="Editar">${iconoEditar}</button><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar">${iconoBorrar}</button></td>
      `
  };

    //child_added
    coleccionProductos.on('child_added', data => {
        let tr = document.createElement('tr')
        tr.id = data.key
        tr.innerHTML = mostrarProductos(data.val())
        document.getElementById('bodyProductos').appendChild(tr)

    });
    //chill_changed
    coleccionProductos.on('child_changed', data =>{
        let nodoEditado = document.getElementById(data.key)
        nodoEditado.innerHTML = mostrarProductos(data.val())

    });    

    //chill_renoved
    coleccionProductos.on('child_removed', data =>{
        let nodoEditado = document.getElementById(data.key)
        document.getElementById('bodyProductos').removeChild(nodoEditado)
    });


    //programacion de los botones
    $('#btn-nuevo').click(function(){
        $('#id').val('');
        $('#codigo').val('');
        $('#descripcion').val('');
        $('#cantidad').val('');
        $('form').trigger('reset');
        $('#modalAltaEdicion').modal('show');
    });

    //editar
    $('#tablaProductos').on('click', '.btnEditar', function(){
    let id = $(this).closest('tr').attr('id');
    let codigo = $(this).closest('tr').find('td:eq(0)').text();
    let descripcion = $(this).closest('tr').find('td:eq(1)').text();
    let cantidad = $(this).closest('tr').find('td:eq(2)').text();

    $('#id').val('id');
    $('#codigo').val(codigo);
    $('#descripcion').val('descripcion');
    $('#cantidad').val('cantidad');
    $('#modalAltaEdicion').modal('show');

    });

    //borrar
    $('#tablaProductos').on('click', '.btnBorrar', function(){
        Swal.fire({
            title: '¿Está seguro de eliminar el producto?',
            text: "¡Está operación no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Borrar'
            }).then((result) => {
            if (result.value) {
                let id = $(this).closest('tr').attr('id'); //capturamos el atributo ID de la fila  
                db.ref(`productos/${id}`).remove() //eliminamos el producto de firebase      
                Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
            }
            })        
    });


