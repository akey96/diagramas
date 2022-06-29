/*
class Diagrama {
    listaClases=new Array();
    listaLineas=new Array();
}

class Rectangulo{
    puntoX=0;
    puntoY=0;
    ancho;
    altura;
    constructor(ancho,altura){
        this.ancho=ancho;
        this.altura=altura;
    }

}
class Clase{
    titulo;
    atributos;
    metodos;
    rectangulo;
}
//canvas
const canvas= document.getElementById('canvas');
const contexto = canvas.getContext("2d");
let xp=0;
let yp=0;
let objetoActual=null;
let diagrama=new Diagrama();
var objetos;
var inicioX = 0, inicioY = 0;
let bandLinea=false;
let posicion=0;
//dibujando clases
const FUENTE_GRANDE = 30,
	  FUENTE_NORMAL = 20,
	  GRUESO_LINEA = 2,
	  SEPARACION_VERTICAL = 5;

function crearClase(){
    let titulo = document.getElementById("txtTitulo").value;
    //let atributos = document.getElementById("txtPropiedades").value;
    //let metodos = document.getElementById("txtMetodos").value;
    //let atributosA = atributos.split("\n"), metodosA = metodos.split("\n");
    //this.generarImagen(titulo, atributosA, metodosA);
    this.generarImagen(titulo, listaAtributos, listaMetodos);
    
}
function generarImagen(titulo, atributos, metodos) {
    let clase=new Clase();
    let nRec=calcularTamRectangulo(titulo, atributos,metodos);
    let valorX=getRandomInt();
    let valorY=getRandomInt();
    nRec.puntoX=valorX;
    nRec.puntoY=valorY;
    clase.titulo=titulo;
    clase.atributos=atributos;
    clase.metodos=metodos;
    clase.rectangulo=nRec;
    lineasRectangulo(valorX, valorY, nRec.ancho, nRec.altura);

    xp = valorX, yp = valorY+FUENTE_GRANDE;
    yp += SEPARACION_VERTICAL + GRUESO_LINEA;
    contexto.lineWidth = GRUESO_LINEA;
    cargarTitulo(titulo, xp, yp);
    dibujarLinea(xp, yp, (clase.rectangulo.ancho+xp), yp);
    cargarDatos(clase.atributos, xp+4,yp);
    contexto.lineWidth = GRUESO_LINEA;
    yp += SEPARACION_VERTICAL + GRUESO_LINEA;
    dibujarLinea(xp, yp, (clase.rectangulo.ancho+xp), yp);
    cargarDatos(clase.metodos, xp+4, yp);
    contexto.stroke();
    diagrama.listaClases.push(clase);
    console.log(diagrama);
    xp=0;
    yp=0;
    //actualizar();
}

function getRandomInt() {
    return Math.floor(Math.random() * (500 - 10)) + 10;
}

function dibujarLinea(x0,y0, x1,y1){
    contexto.moveTo(x0, y0);
    contexto.lineTo(x1, y1);
}

function lineasRectangulo(x,y, ancho, alto){
    contexto.lineWidth = GRUESO_LINEA * 2;
    contexto.setLineDash([]); //linea sin segmentos
    contexto.strokeRect(x, y, ancho, alto);
    contexto.closePath();
}

function cargarTitulo(titulo, x,y){
    contexto.font = `${FUENTE_GRANDE}px Century Gothic`;
    contexto.fillText(titulo, x+6, y);
}

function cargarDatos(datos, x,y){
    contexto.font = `${FUENTE_NORMAL}px Century Gothic`;
    datos.forEach(dato => {
        y += FUENTE_NORMAL;
        contexto.moveTo(0, y);
        contexto.fillText(dato, x, y);
    });
    yp=y;
}

function calcularTamRectangulo(titulo, propiedades,metodos){
    let masLarga="";
    propiedades.forEach(propiedad => {
        if (propiedad.length >= masLarga.length) {
            masLarga = propiedad;
        }
    });
    metodos.forEach(metodo => {
        if (metodo.length >= masLarga.length) {
            masLarga = metodo;
        }
    });
    let longitudDeTitulo = titulo.length * FUENTE_GRANDE;
    let longitudMayor = masLarga.length * FUENTE_NORMAL;
    let altura = (
        (metodos.length + propiedades.length) * FUENTE_NORMAL)
        + FUENTE_GRANDE // Lo que ocupa el título
        + (SEPARACION_VERTICAL * 2) // Separamos 2 veces
        + (GRUESO_LINEA * 2)// Y dibujamos 2 líneas
        + FUENTE_NORMAL + SEPARACION_VERTICAL // Lo agregué porque ni así calculaba el ancho :v
        ,ancho = longitudDeTitulo > longitudMayor ? longitudDeTitulo : longitudMayor;
    let rectangulo=new Rectangulo(ancho,altura);
    return rectangulo;
}


function actualizar() {
    
      //contexto.lineWidth = GRUESO_LINEA;
      for (var i = 0; i < diagrama.listaClases.length; i++) {
        contexto.strokeRect(0, 0, 800, 600);
        let clase=diagrama.listaClases[i];
        contexto.strokeRect(clase.rectangulo.puntoX, clase.rectangulo.puntoY, clase.rectangulo.ancho, clase.rectangulo.altura);

        xp = clase.rectangulo.puntoX, yp = clase.rectangulo.puntoY+FUENTE_GRANDE;
        yp += SEPARACION_VERTICAL + GRUESO_LINEA;
        cargarTitulo(clase.titulo, xp, yp);
        dibujarLinea(xp, yp, (clase.rectangulo.ancho+xp), yp);
        cargarDatos(clase.atributos, xp+4,yp);
        yp += SEPARACION_VERTICAL + GRUESO_LINEA;
        dibujarLinea(xp, yp, (clase.rectangulo.ancho+xp), yp);
        cargarDatos(clase.metodos, xp+4, yp);
        contexto.stroke();
      }
}




document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas(){

    canvas.addEventListener("mousedown", ReactToMouseDown);
    canvas.addEventListener("mousemove", ReactToMouseMove);
    canvas.addEventListener("mouseup", ReactToMouseUp);
}
function ReactToMouseDown(event){
    for (var i = 0; i < diagrama.listaClases.length; i++) {
        let clase=diagrama.listaClases[i];
        if (clase.rectangulo.puntoX < event.clientX
          || (clase.rectangulo.ancho + clase.rectangulo.puntoX > event.clientX)
          || clase.rectangulo.puntoY < event.clientY
          || (clase.rectangulo.altura + clase.rectangulo.puntoY > event.clientY)
        ) {
          objetoActual = clase;
          posicion=i;
          console.log(posicion,"lasllaslsl");
          inicioY = event.clientY - clase.rectangulo.puntoY;
          inicioX = event.clientX - clase.rectangulo.puntoX;
          break;
        }
        else{
            
        }
      }
};

function ReactToMouseMove(event){
    if (objetoActual != null) {
        objetoActual.rectangulo.puntoX = event.clientX - inicioX;
        objetoActual.rectangulo.puntoY = event.clientY - inicioY;
      }
    actualizar();
};
 
function ReactToMouseUp(e){
    console.log(objetoActual,"copia");
    diagrama.listaClases[posicion]=objetoActual;
    console.log(diagrama,"sss");
    objetoActual = null;
};
*/




class Diagrama {
    nombre;
    listaClases=new Array();
    //listaLineas=new Array();
}

class Rectangulo{
    puntoX=0;
    puntoY=0;
    ancho;
    altura;
    constructor(ancho,altura){
        this.ancho=ancho;
        this.altura=altura;
    }

}
class Clase{
    titulo;
    atributos;
    metodos;
    rectangulo;
}


class MouseDownPos{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}

//listaDiagramas ----------------------

let listaDiagramas = [];


//canvas
const canvas= document.getElementById('canvas');
const contexto = canvas.getContext("2d");
let xp=0;
let yp=0;
let objetoActual=null;
let diagrama=new Diagrama();
let mousedown = new MouseDownPos(0,0);
let bandUsa=false;
var objetos;
var inicioX = 0, inicioY = 0;
let bandLinea=false;
let posicion=0;
let posicionCanvas = 0;
//dibujando clases
const FUENTE_GRANDE = 30,
	  FUENTE_NORMAL = 20,
	  GRUESO_LINEA = 2,
	  SEPARACION_VERTICAL = 5;

function crearClase(){
    let titulo = document.getElementById("txtTitulo").value;
    //let atributos = document.getElementById("txtPropiedades").value;
    //let metodos = document.getElementById("txtMetodos").value;
    //let atributosA = atributos.split("\n"), metodosA = metodos.split("\n");
    document.getElementById("txtTitulo").value="";
    //document.getElementById("txtPropiedades").value="";
    //document.getElementById("txtMetodos").value="";
    //this.generarImagen(titulo, atributosA, metodosA);
    this.generarImagen(titulo, listaAtributos, listaMetodos);
    listaAtributos= [];
    listaMetodos= [];
}

function crearUsa(){
    if(bandUsa){
        bandUsa=false;
        document.getElementById("usa").value="crear Usa";
        console.log("iola");
    }
    else{
        document.getElementById("usa").value="Activo Usa";
        bandUsa=true;
        console.log("chau");
    }
    
}

function generarImagen(titulo, atributos, metodos) {
    let clase=new Clase();
    let nRec=calcularTamRectangulo(titulo, atributos,metodos);
    let valorX=getRandomInt();
    let valorY=getRandomInt();
    nRec.puntoX=valorX;
    nRec.puntoY=valorY;
    clase.titulo=titulo;
    clase.atributos=atributos;
    clase.metodos=metodos;
    clase.rectangulo=nRec;
    diagrama.listaClases.push(clase);
    
    actualizar();
    //console.log(diagrama);
    //xp=0;
    //yp=0;

}

function getRandomInt() {
    return Math.floor(Math.random() * (500 - 10)) + 10;
}

function dibujarLinea(x0,y0, x1,y1){
    contexto.moveTo(x0, y0);
    contexto.lineTo(x1, y1);
    contexto.stroke();
}

function lineasRectangulo(x,y, ancho, alto){
    contexto.lineWidth = GRUESO_LINEA * 2;
    contexto.setLineDash([]); //linea sin segmentos
    contexto.strokeRect(x, y, ancho, alto);
    contexto.closePath();
}

function cargarTitulo(titulo, x,y){
    contexto.font = `${FUENTE_GRANDE}px Century Gothic`;
    contexto.fillText(titulo, x+6, y);
}

function cargarDatos(datos, x,y){
    contexto.font = `${FUENTE_NORMAL}px Century Gothic`;
    datos.forEach(dato => {
        y += FUENTE_NORMAL;
        contexto.moveTo(0, y);
        contexto.fillText(dato, x, y);
    });
    yp=y;
}


function dibujarLineaSegmentada(x0,y0,x1,y1){
    contexto.setLineDash([4, 14]);
    contexto.beginPath();
    contexto.moveTo(x0, y0);
    contexto.lineTo(x1, y1);
    contexto.stroke();
}

function calcularTamRectangulo(titulo, propiedades,metodos){
    let masLarga="";
    propiedades.forEach(propiedad => {
        if (propiedad.length >= masLarga.length) {
            masLarga = propiedad;
        }
    });
    metodos.forEach(metodo => {
        if (metodo.length >= masLarga.length) {
            masLarga = metodo;
        }
    });
    let longitudDeTitulo = titulo.length * FUENTE_GRANDE;
    let longitudMayor = masLarga.length * FUENTE_NORMAL;
    let altura = (
        (metodos.length + propiedades.length) * FUENTE_NORMAL)
        + FUENTE_GRANDE // Lo que ocupa el título
        + (SEPARACION_VERTICAL * 2) // Separamos 2 veces
        + (GRUESO_LINEA * 2)// Y dibujamos 2 líneas
        + FUENTE_NORMAL + SEPARACION_VERTICAL // Lo agregué porque ni así calculaba el ancho :v
        ,ancho = longitudDeTitulo > longitudMayor ? longitudDeTitulo : longitudMayor;
    let rectangulo=new Rectangulo(ancho,altura);
    return rectangulo;
}


function actualizar() {
    //console.log("sty en actualizar");
    dibujarCanvas();
      for (var i = 0; i < diagrama.listaClases.length; i++) {

        let clase=diagrama.listaClases[i];
        contexto.fillStyle='#0a0a0a';
        lineasRectangulo(clase.rectangulo.puntoX, clase.rectangulo.puntoY, clase.rectangulo.ancho, clase.rectangulo.altura);
        xp = clase.rectangulo.puntoX, yp = clase.rectangulo.puntoY+FUENTE_GRANDE;
        yp += SEPARACION_VERTICAL + GRUESO_LINEA;
        //contexto.lineWidth = GRUESO_LINEA;
        cargarTitulo(clase.titulo, xp, yp);
        //dibujarLinea(xp, yp, (clase.rectangulo.ancho+xp), yp);
        cargarDatos(clase.atributos, xp+4,yp);
        yp += SEPARACION_VERTICAL + GRUESO_LINEA;
        //dibujarLinea(xp, yp, (clase.rectangulo.ancho+xp), yp);
        cargarDatos(clase.metodos, xp+4, yp);
        contexto.stroke();
      }
}
function dibujarCanvas(){
    contexto.fillStyle='#fafbfd';
    contexto.fillRect(0, 0, 1000, 800);
}


document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas(){
    posicionCanvas = canvas.getBoundingClientRect();
    //455 338
    canvas.addEventListener("mousedown", ReactToMouseDown);
    canvas.addEventListener("mousemove", ReactToMouseMove);
    canvas.addEventListener("mouseup", ReactToMouseUp);
}
function ReactToMouseDown(event){
    let anchoPantalla= window.innerWidth;
    let altoPantalla= window.innerHeight;
    //console.log("apretando")
    //console.log("ancho.- " + window.innerWidth + "alto.- " + window.innerHeight);
    for (var i = 0; i < diagrama.listaClases.length; i++) {
        let clase  =diagrama.listaClases[i];
        if((event.clientX - posicionCanvas.x) >= clase.rectangulo.puntoX && (event.clientX - posicionCanvas.x) <= (clase.rectangulo.puntoX + clase.rectangulo.ancho)
           && (event.clientY - posicionCanvas.y) >= clase.rectangulo.puntoY && (event.clientY - posicionCanvas.y) <= (clase.rectangulo.puntoY + clase.rectangulo.altura)) {
            //console.log("entra");
          objetoActual = clase;
          posicion=i;
          inicioY = event.clientY - clase.rectangulo.puntoY;
          inicioX = event.clientX - clase.rectangulo.puntoX;
          /*if(bandUsa){
              mousedown.x=inicioX;
              mousedown.y=inicioY;
          }*/
          break;
        }
        else{
            //actualizar();
            console.log("sty en el else");
        }
      }
};

function ReactToMouseMove(event){
    if (objetoActual != null) {
        objetoActual.rectangulo.puntoX = event.clientX - inicioX;
        objetoActual.rectangulo.puntoY = event.clientY - inicioY;
        actualizar();
      }
    //actualizar();
};
 
function ReactToMouseUp(e){
    console.log(objetoActual,"copia");
   // if(!bandUsa){
        if(objetoActual!=null){
            diagrama.listaClases[posicion]=objetoActual;
        }
    //}
 //   else{
   //     dibujarLineaSegmentada(0,0,mousedown.x, mousedown.y)
   // }
    
    actualizar();
    objetoActual = null;
};








// guardar diagrama -------------------------------------------------------------------------------------------

function guardarDiagrama(){
    let nombreDiagrama= document.getElementById('nombreDiagrama');
    diagrama.nombre= nombreDiagrama.value;

    listaDiagramas.push(diagrama);

    localStorage.setItem("listaDiagramas", listaDiagramas);
  
    let list = document.getElementById("myList");


    let listaDiagramasLocalStorage= [];
    listaDiagramasLocalStorage= localStorage.getItem("listaDiagramas");
    console.log(listaDiagramasLocalStorage.length);
  
    /*listaDiagramasLocalStorage.forEach((diagramaAux)=>{
        let li = document.createElement("li");
        li.innerText = diagramaAux.nombre;
        list.appendChild(li);
    });*/

    contexto.clearRect(0, 0, canvas.width, canvas.height);
    diagrama= new Diagrama();
    
}












// formularios dinamicos ----------------------------------------------------------------------------------

let listaAtributos= [];
let listaMetodos=[];


let parameters = []
function removeElement(event, position) {
    event.target.parentElement.remove()
    delete parameters[position]
}

const addJsonElement = json => {
    parameters.push(json)
    return parameters.length - 1
}

(function load(){
    //const $form = document.getElementById("frmUsers")
    const $frmAtributos= document.getElementById("frmAtributos");
    const $frmMetodos= document.getElementById("frmMetodos");
    const $divElements = document.getElementById("divElements")
    //const $btnSave = document.getElementById("btnSave")
    const $btnAdd = document.getElementById("btnAdd")

    const $btnAddMetodo= document.getElementById("btnAddMetodo");

    const templateElement = (data, position) => {
        return (`
            <button class="delete" onclick="removeElement(event, ${position})"></button>
            <strong>  </strong> ${data}
        `)
    }

    //agreagar atributo
    $btnAdd.addEventListener("click", (event) => {
        const aux= $frmAtributos.name.value;
        if(aux != ""){
            let index = addJsonElement({
                name: $frmAtributos.name.value,
                //lastName: $form.lastName.value
            })
            const $div = document.createElement("div")
            $div.classList.add("notification", "is-link", "is-light", "py-2", "my-1")
            //$div.innerHTML = templateElement(`${$form.name.value} ${$form.lastName.value}`, index)
            $div.innerHTML = templateElement(`${$frmAtributos.name.value}`, index)
            
            $divElements.insertBefore($div, $divElements.firstChild)

            listaAtributos.push(aux);
            console.log(listaAtributos);
            $frmAtributos.reset()
        }else{
            alert("Complete los campos")
        }
    })

    //agreagar metodo
    $btnAddMetodo.addEventListener("click", (event) => {
        const auxMetodos= $frmMetodos.name.value;
        if(auxMetodos != ""){
            let index = addJsonElement({
                name: $frmMetodos.name.value,
                //lastName: $form.lastName.value
            })
            const $div = document.createElement("div")
            $div.classList.add("notification", "is-link", "is-light", "py-2", "my-1")
            //$div.innerHTML = templateElement(`${$form.name.value} ${$form.lastName.value}`, index)
            $div.innerHTML = templateElement(`${$frmMetodos.name.value} ( )`, index)

            $divElements.insertBefore($div, $divElements.firstChild)

            listaMetodos.push(auxMetodos + " ( )");
            console.log(listaMetodos);
            $frmMetodos.reset()
        }else{
            alert("Complete los campos")
        }
    })

    /*
    $btnSave.addEventListener("click", (event) =>{
        parameters = parameters.filter(el => el != null)
        const $jsonDiv = document.getElementById("jsonDiv")
        $jsonDiv.innerHTML = `JSON: ${JSON.stringify(parameters)}`
        $divElements.innerHTML = ""
        parameters = []
    })
    */
})()

//------------------------------------------------------------------------------------------------------------------------------














//dibujar relacion USA  ----------------------------------------------------

/*

let savedImageData;
let dragging = false;
let strokeColor = 'black';
let fillColor = 'black';
let line_Width = 2;
let currentTool = 'brush';
let canvasWidth = 600;
let canvasHeight = 600;
 
let usingBrush = false;
let brushXPoints = new Array();
let brushYPoints = new Array();
let brushDownPos = new Array();
 

class ShapeBoundingBox{
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}
 

class MouseDownPos{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}

 
class Location{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}
 
let shapeBoundingBox = new ShapeBoundingBox(0,0,0,0);
//let mousedown = new MouseDownPos(0,0);
let loc = new Location(0,0);
 
document.addEventListener('DOMContentLoaded', setupCanvas);
 
function setupCanvas(){
    contexto.strokeStyle = strokeColor;
    contexto.lineWidth = line_Width;
    canvas.addEventListener("mousedown", ReactToMouseDown);
    canvas.addEventListener("mousemove", ReactToMouseMove);
    canvas.addEventListener("mouseup", ReactToMouseUp);
}
 
function crearLinea(toolClicked){
    document.getElementById("usa").className = "";
    document.getElementById("clase").className = "";
    document.getElementById(toolClicked).className = "selected";
    currentTool = toolClicked;
}
function GetMousePosition(x,y){
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
        y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
      };
}
 
function SaveCanvasImage(){
    savedImageData = contexto.getImageData(0,0,canvas.width,canvas.height);
}
 
function RedrawCanvasImage(){
    contexto.putImageData(savedImageData,0,0);
}
 
function UpdateRubberbandSizeData(loc){
    shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
    shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);
 
    if(loc.x > mousedown.x){
        shapeBoundingBox.left = mousedown.x;
    } else {
        shapeBoundingBox.left = loc.x;
    }
 
    if(loc.y > mousedown.y){
        shapeBoundingBox.top = mousedown.y;
    } else {
        shapeBoundingBox.top = loc.y;
    }
}

function drawRubberbandShape(loc){
    contexto.strokeStyle = strokeColor;
    contexto.fillStyle = fillColor;
    
        contexto.setLineDash([4, 14]);
        contexto.beginPath();
        contexto.moveTo(mousedown.x, mousedown.y);
        contexto.lineTo(loc.x, loc.y);
        contexto.stroke();
    
}
 
function UpdateRubberbandOnMove(loc){
    UpdateRubberbandSizeData(loc);
 
    drawRubberbandShape(loc);
}
 
function AddBrushPoint(x, y, mouseDown){
    brushXPoints.push(x);
    brushYPoints.push(y);
    brushDownPos.push(mouseDown);
}
 

 
function ReactToMouseDown(e){
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);
    SaveCanvasImage();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
 
    if(currentTool === 'brush'){
        usingBrush = true;
        AddBrushPoint(loc.x, loc.y);
    }
};
 
function ReactToMouseMove(e){
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);
 
    if(currentTool === 'brush' && dragging && usingBrush){
        if(loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight){
            AddBrushPoint(loc.x, loc.y, true);
        }
        RedrawCanvasImage();
    } else {
        if(dragging){
            RedrawCanvasImage();
            UpdateRubberbandOnMove(loc);
        }
    }
};
 
function ReactToMouseUp(e){
    canvas.style.cursor = "default";
    loc = GetMousePosition(e.clientX, e.clientY);
    RedrawCanvasImage();
    UpdateRubberbandOnMove(loc);
    dragging = false;
    usingBrush = false;
}

function  addText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var nr_w = words.length
    var addtxt = '';
  

    for(var n = 0; n < nr_w; n  ) {
      var txtLine = addtxt +  words[n] +  ' ';
      var metrics = contexto.measureText(txtLine);
      var txtWidth = metrics.width;
      if (txtWidth > maxWidth && n > 0) {
        contexto.fillText(addtxt, x, y);
        addtxt = words[n] +  ' ';
        y  = lineHeight;
      }
      else addtxt = txtLine;
    }
  
    contexto.fillStyle = '#0001be';
    contexto.font = 'bold 17px sans-serif';
    contexto.fillText(addtxt, x, y);
  }

  
  document.getElementById('text_cnv').onkeyup = function() {
    clearCanvas(cnv1);
    addText(ctx1, this.value, x_pos, y_pos, maxWidth, lineHeight);
  }
  
  */