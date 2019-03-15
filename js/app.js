var Calculadora = {
  init: function(){
    this.cambiarTecla()
    this.presionarNumeros()
    this.borrarNumeros()
   },
  cambiarTecla: function(){
    var teclas = document.getElementsByClassName('tecla')
    for(var i = 0; i < teclas.length; i++){
        var numero = getComputedStyle(teclas[i]).width
        var numero = numero.replace('px','')
        var anchoI = Number(numero)
        var anchoP = anchoI - 3
        teclas[i].addEventListener('mousedown', function(e){
          e.preventDefault()
          this.style.width=anchoP+'px'
        })
        teclas[i].addEventListener('mouseup', function(e){
          e.preventDefault()
          this.style.width=anchoI+'px'
        })
    }
  },
  presionarNumeros: function(){
    var teclas = document.getElementsByClassName('tecla')
    for(var i = 0; i < teclas.length; i++){
      var numero = Number(teclas[i].id)
      if(!isNaN(numero)){
        teclas[i].onclick= this.agregarNumPantalla
      }
    }
  },
  agregarNumPantalla: function(e){
    var pantalla = document.getElementById('display')
    var numero = e.currentTarget.id
    switch(pantalla.innerHTML){
      case('0'):
        pantalla.innerHTML = numero
        break
      default:
        if(pantalla.innerHTML.length <= 7){
          pantalla.innerHTML += numero
        }else{
          alert('No se puede introducir un número mayor a 8 dígitos')
        }
        break
    }
  },
  borrarNumeros: function(){
    var btnOn = document.getElementById('on')
    var pantalla = document.getElementById('display')
    btnOn.addEventListener('click', function(e){
      e.preventDefault()
      pantalla.innerHTML = '0'
    })
  }
}

Calculadora.init()
