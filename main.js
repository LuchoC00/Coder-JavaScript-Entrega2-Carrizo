            /* OBJETOS Y FUNCIONES RELACIONADAS */

function darIva(){
    return 1.21;
}

function darNombresObjetos(array){
    let mostrar = "";
    for (let i = 0; i < array.length; i++) {
        mostar+= array[i].nombre + "\n";
    }
    return mostrar;
}

function capitalice(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

class Indumentaria{
    constructor(nombre,id,tipo,precio,stock){
        this.nombre = nombre.toLowerCase();
        this.id = id;
        this.tipo = tipo.toLowerCase();
        this.precio = precio;
        this.stock = stock;
        this.stockEnCarrito = 0;
    }


    detalles(){
        return `Los datos de ${this.tipo} son:        
        - nombre : ${this.nombre}
        - id : ${this.id}
        - tipo : ${this.tipo}
        - precio : $${this.precio}
        - stock : ${this.stock}`;
    }

    precioFinal(){
        return Math.round(this.precio * darIva()); 
    }

    reducirStock(cantidad){
        this.stock = this.stock>1 ? this.stock - Math.abs(cantidad) : "Sin Stock";
    }

    añadirCarrito(cantidad){
        this.stockEnCarrito += cantidad;
        this.stock -= cantidad;
    }

    quitarCarrito(cantidad){
        this.stockEnCarrito -= cantidad;
        this.stock += cantidad;
    }
}

class Carro{
    constructor(indumentarias){
        //Indumentarias es una lista de objetos
        this.indumentarias = indumentarias;
    }

    mostrarCarro(){
        let mostrar = "Su carrito contiene lo siguiente:\n";
        let sumaTotal = 0;
        this.indumentarias.forEach(objeto => {
            mostrar+= `  - ${objeto.stockEnCarrito} unidades de ${objeto.nombre.toUpperCase()} a un precio de $${objeto.precioFinal()} cada uno. $${objeto.precioFinal() * objeto.stockEnCarrito} total.\n`;
            sumaTotal+= objeto.precioFinal() * objeto.stockEnCarrito;
        });
        return mostrar + `\nEl total de su carrito es de: $${sumaTotal}\n`;
    }

    vaciarCarro(){
        this.indumentarias = [];
    }

    agregarIndumentaria(indumentaria){
        this.indumentarias.push(indumentaria);
    }

}
            /* ASIGNACION DE VARIABLES */

//Listas de indumentarias

const indumentarias = {
    "calzados" : [
        new Indumentaria("M47",10101001,"Calzado",109,11),
        new Indumentaria("L90",10101002,"Calzado",99,19),
        new Indumentaria("Ocean 2",10101003,"Calzado",121,2),
        new Indumentaria("Ocena",10101004,"Calzado",105,7),
        new Indumentaria("L81",10101005,"Calzado",94,19),
        new Indumentaria("L48",10101006,"Calzado",89,21),
        new Indumentaria("Furious Red",10101007,"Calzado",129,5),
        new Indumentaria("Tenis naek Rosa",10101008,"Calzado",167,1)
    ],

    "remeras" : [
        new Indumentaria("Liverpool naek",10201001,"remera",28,15),
        new Indumentaria("Paris is German",10201002,"remera",31,5),
        new Indumentaria("Boca Naek",10201003,"remera",20,25),
        new Indumentaria("Barcelona Fc Naek",10201004,"remera",18,23),
        new Indumentaria("Portugal Naek",10201005,"remera",43,3)
    ],

    "otras vestimentas" : [
        new Indumentaria("Camperas Naek",10202001,"vestimenta",49,4),
        new Indumentaria("Lotus 47",10202002,"vestimenta",37,11),
        new Indumentaria("Grenpeace",10202003,"vestimenta",34,15),
        new Indumentaria("linear rose",10202004,"vestimenta",29,21),
        new Indumentaria("nike",10202005,"vestimenta",39,18),
        new Indumentaria("just do it",10202006,"vestimenta",42,8)
    ]
}
//Lista de indumentaria modificable
let listaIndumentaria = ["calzados","remeras","otras vestimentas"]

            /* MAIN */

alert("Bienvenidos a la tienda Naek\nEspero que podamos ayudarlo");
if(confirm("¿Deseas comprar algun producto?")){
    //Se ejecuta el Main
    salir = false;
    let carrito = new Carro([])
    while(!salir){

        paraElCarrito = añadir();

        if(paraElCarrito != undefined){
            //Añade el objeto al carrito
            carrito.agregarIndumentaria(paraElCarrito);
        }
        salir = !confirm("¿Desea seguir comprando algun producto?");

        //Si decidio dejar de comprar se mostrara la ultima ventana para verificar su compra
        if(salir && carrito.indumentarias.length >0){
            let mensaje = carrito.mostrarCarro() + "¿Desea Confirmar su transaccion?";
            confirm(mensaje) ? alert("Gracias por contar con nosotros") : alert("No te preocupes, vuelve pronto");
        }
    }
}

            /* FUNCIONES RELACIONADAS AL MAIN */

function añadir(){
    //Pide seleccionar el tipo de indumentaria
    let tipoIndumentaria = pedirTipoIndumentaria();

    if(tipoIndumentaria == null){
        return;
    }

    //Pide seleccionar la indumentaria y devuelve el objeto al que pertenece
    let objetoParaAñadir = pedirClaseIndumentaria(tipoIndumentaria);

    if(objetoParaAñadir == null){
        return;
    }

    //Pide elejir la cantidad de indumentarias elejidas a comprar
    let cantidad = prompt(`El ${objetoParaAñadir.nombre.toUpperCase()} tiene un precio de $${objetoParaAñadir.precioFinal()} ¿Cuantos desea comprar?`);
    while(isNaN(cantidad) || objetoParaAñadir.stock < parseInt(cantidad)){
        isNaN(cantidad) ? alert("Elija una cantidad valida") : alert(`El ${objetoParaAñadir.nombre.toUpperCase()} no tiene la cantidad de stock seleccionada. Por favor, seleccione una cantidad menor o igual a ${objetoParaAñadir.stock}`)
        cantidad = prompt(`¿cuantos ${objetoParaAñadir.nombre} desea comprar?`);
    }

    //Pide una ultima verificacion antes de añadir al carrito
    if(confirm(`¿Desea confirmar la compra de ${cantidad} ${objetoParaAñadir.nombre.toUpperCase()} a $${objetoParaAñadir.precioFinal() * cantidad} total?`)){
        objetoParaAñadir.añadirCarrito(cantidad);
        alert(`El ${objetoParaAñadir.nombre.toUpperCase()} fue añadido al carrito`);
        return objetoParaAñadir;
    }
    return;
}

function mensaje1(){
    let mensaje = "Elija el tipo de indumentaria que quiere añadir al carrito. Por el momento solo tenemos los siguientes tipos de indumentaria:\n";
    for (let i = 0; i < listaIndumentaria.length; i++) {
        mensaje += "  - "+listaIndumentaria[i]+"\n";
    }
    mensaje += "\nO si no se decide puedes cancelar";
    return mensaje;
}

function pedirTipoIndumentaria(){
    //contructor del mensaje
    let mensaje = mensaje1()

    let tipoIndumentaria = prompt(mensaje);
    while(tipoIndumentaria!=null && !listaIndumentaria.includes(tipoIndumentaria.toLowerCase())){
        alert("Por favor, seleccione un valor de la lista");
        tipoIndumentaria = prompt(mensaje);
    }
    return tipoIndumentaria;
}

function mensajeIndumentaria(tipoIndumentaria){
    // Obtengo el array del tipo de indumentarias
    let arrayIndumentarias = indumentarias[tipoIndumentaria];

    let mensaje = `Elija la ${tipoIndumentaria} que quiere añadir al carrito. Por el momento solo tenemos las siguientes tipos de ${tipoIndumentaria}:\n`;
    arrayIndumentarias.forEach(objeto => {
        if(objeto.stock>0){
            mensaje+=  "  - "+ capitalice(objeto.nombre) + "\n";
        }
    });
    return mensaje;
}

function estaNombreObjetos(nombre,array){
    let salida = false;
    array.forEach(objeto => {
        if(objeto.nombre.toLowerCase() == nombre.toLowerCase()){
            salida = true;
        }
    });
    return salida;
}

function dameObjetoPorNombre(nombre,array){
    let salida = undefined;
    array.forEach(objeto => {
        if(objeto.nombre.toLowerCase() == nombre.toLowerCase()){
            salida = objeto;
        }
    });
    return salida;
}

function pedirClaseIndumentaria(tipoIndumentaria){
    // Obtengo el array del tipo de indumentarias
    let arrayIndumentarias = indumentarias[tipoIndumentaria];

    //Genero el mensaje a mostrar
    let mensaje = mensajeIndumentaria(tipoIndumentaria)
    let indumentaria = prompt(mensaje);
    //Obtengo la indumentaria elejida si el valor es valido
    while(indumentaria!=undefined && ( !estaNombreObjetos(indumentaria,arrayIndumentarias) ||( estaNombreObjetos(indumentaria,arrayIndumentarias) && !dameObjetoPorNombre(indumentaria,arrayIndumentarias).stock !=0) ) ){
        alert("Por favor, seleccione un valor de la lista");
        indumentaria = prompt(mensaje);
    }

    //Devuelve el objeto al que pertenece la indumentaria
    return indumentaria == undefined ? null : dameObjetoPorNombre(indumentaria,arrayIndumentarias);
}

