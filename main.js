const appMoviles = new Vue({
    
    el:"#appMoviles",
    data:{
        moviles:[],
        marca:'',
        modelo:'',
        stock:'',
        total:0
    },
    methods:{
        //botones 
        btnAlta: async function(){
            const {value:formValues} = await Swal.fire({
                title:'NUEVO',
                html:"<div class='row'><label class='col-sm-3 col-form-label'>Marca</label><div class='col-sm-7'><input id='marca' type='text' class='form-control'></div></div><div class='row'><label class='col-sm-3 col-form-label'>Modelo</label><div class='col-sm-7'><input id='modelo' type='text' class='form-control'></div></div><div class='row'><label class='col-sm-3 col-form-label'>Stock</label><div class='col-sm-7'><input id='stock' type='number' min='0' class='form-control'></div></div>",
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText:'Guardar',
                confirmButtonColor:'#1cc88a',
                cancelButtonColor: '#3085d6',
                preConfirm:()=>{
                    return [
                        this.marca = document.getElementById('marca').value,
                        this.modelo = document.getElementById('modelo').value,
                        this.stock = dosument.getElementById('stock').value
                    ]
                }
            })
            if(this.marca == '' || this.modelo == '' || this.stock == ''){
                Swal.fire({
                    type:'info',
                    title:'Datos incompletos',
                })
            } else{
                this.altaMovil(); // llamamos a la funcion para dar de alta al movil 
                // mensaje para mostrar que fue agregado exitosamente un producto
                const Toast = Swal.mixin({
                    toast:true,
                    position:'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: '¡Producto Agregado!'
                })
            }
        },
        btnEditar: async function(id, marca, modelo, stock){
            //console.log("ID: " + id + " - Marca: " + marca + " - Modelo: " + modelo + " - Stock: " + stock);
            await Swal.fire({
                title:'EDITAR',
                html:"<div class='form-group'><div class='row'><label class='col-sm-3 col-form-label'>Marca</label><div class='col-sm-7'><input id='marca' value='"+marca+"' type='text' class='form-control'></div></div><div class='row'><label class='col-sm-3 col-form-label'>Modelo</label><div class='col-sm-7'><input id='modelo' value='"+modelo+"' type='text' class='form-control'></div></div><div class='row'><label class='col-sm-3 col-form-label'>Stock</label><div class='col-sm-7'><input id='stock' value='"+stock+"' type='numbre' min='0' class='form-control'></div></div></div>",
                focusConfirm:false,
                showCancelButton:true,
            }).then((result) => {
                if(result.value){
                    //capturo los nuevos datos si es que se modifican
                    marca = document.getElementById('marca').value,
                    modelo = document.getElementById('modelo').value,
                    stock = dosument.getElementById('stock').value,

                    this.editarMovil(id,marca,modelo,stock);
                    Swal.fire(
                        '¡Actualizado!',
                        'El registro ha sido actualizado.',
                        'success'
                    )
                }
            })
        },
        btnBorrar: function(id){
            Swal.fire({
                title:'¿Esta seguro de borrar el registro: ' + id + " ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Borrar'
            }).then((result) => {
                if(result.value){
                    this.borrarMovil(id);
                    //se muestra un msj sobre la eliminacion
                    Swal.fire(
                        '¡Eliminado!',
                        'El registro ha sido borrado.',
                        'success'
                    )
                }
            })
        }
    },
    created: function(){},
    computed:{}

});
