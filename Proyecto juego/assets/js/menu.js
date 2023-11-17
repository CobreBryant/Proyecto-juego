let btnopc = document.getElementById("btnopciones");
let opc = document.getElementById("Opciones");
function Opciones(){
  if(opc.style.display == "flex"){
    opc.style.display = "none";
    console.log("flex");
  }
  else if(opc.style.display = "none"){
    opc.style.display = "flex";
    console.log("none");
  }
}
 

btnopc.onclick = (e) =>{
  e.preventDefault();
  Opciones();
}

let btntro = document.getElementById("btntrofeo");
let trofeo = document.getElementById("Trofeos");
function Trofeos(){
  if(trofeo.style.display == "flex"){
    trofeo.style.display = "none";
    console.log("flex");
  }
  else if(trofeo.style.display = "none"){
    trofeo.style.display = "flex";
    console.log("none");
  }
}
 

btntro.onclick = (e) =>{
  e.preventDefault();
  Trofeos();
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; 

slider.oninput = function() {
  output.innerHTML = this.value;
}