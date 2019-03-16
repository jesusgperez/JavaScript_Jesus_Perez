var operacionAnterior = ''


function operarAnterior(){
  switch(operacionAnterior){
    case('+'):
      var info = recuperarInfo()
      info[0] += info[1]
      sessionStorage.setItem('resultado', JSON.stringify(info[0]))
      break
    case('-'):
      var info = recuperarInfo()
      info[0] -= info[1]
      sessionStorage.setItem('resultado', JSON.stringify(info[0]))
      break
    case('*'):
      var info = recuperarInfo()
      if(info[1]==''){
        info[1] = 1
      }
      info[0] *= info[1]
      sessionStorage.setItem('resultado', JSON.stringify(info[0]))
      break
    default:
  }
}
function recuperarInfo(){
  var pantalla = document.getElementById('display')
  var numero = Number(pantalla.innerHTML)
  pantalla.innerHTML=''
  var res = Number(JSON.parse(sessionStorage.getItem('resultado')))
  var respuesta = [res, numero]
  return respuesta
}

var Calculadora = {
  init: function(){
    this.cambiarTecla()
    this.presionarNumeros()
    this.borrarNumeros()
    this.agregarPunto()
    this.masMenos()
    this.sumar()
    this.restar()
    this.multiplicar()
    sessionStorage.setItem('resultado', JSON.stringify(0))
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
  },
  agregarPunto: function(){
    var btnPunto = document.getElementById('punto')
    btnPunto.addEventListener('click', function(e){
      e.preventDefault()
      var pantalla = document.getElementById('display')
      var cadena = pantalla.innerHTML.split('')
      var verif = false
      for(var i = 0; i < cadena.length; i++){
        if(cadena[i]=='.'){
          verif = true
        }
      }
      if(verif){
        alert('Ya hay un punto en la expresión')
      }else{  
        pantalla.innerHTML += '.'
      }
    })
  },
  masMenos: function(){
    var signo = document.getElementById('sign')
    signo.addEventListener('click',function(e){
      e.preventDefault()
      var pantalla = document.getElementById('display')
      var cadena = pantalla.innerHTML.split('')
      if(cadena[0]=='-'){
        pantalla.innerHTML = pantalla.innerHTML.replace('-','')
      }else{
        pantalla.innerHTML = '-' + pantalla.innerHTML
      }
    })
  },
  sumar: function(){
    var btnSumar = document.getElementById('mas')
    btnSumar.addEventListener('click', function(e){
      if(operacionAnterior == ''){
        var info = recuperarInfo()
        info[0] = info[1]
        sessionStorage.setItem('resultado', JSON.stringify(info[0]))
        operacionAnterior="+"
      }else{
        operarAnterior()
        operacionAnterior="+"
      }      
    })
  },
  restar: function(){
    var btnRestar = document.getElementById('menos')
    btnRestar.addEventListener('click', function(e){
      if(operacionAnterior == ''){
        var info = recuperarInfo()
        info[0] = info[1]
        sessionStorage.setItem('resultado',JSON.stringify(info[0]))
        operacionAnterior='-'
      }else{
        operarAnterior()
        operacionAnterior='-'
      }
    })
  },
  multiplicar: function(){
    var btnMult = document.getElementById('por')
    btnMult.addEventListener('click', function(e){
      if(operacionAnterior == ''){
        var info = recuperarInfo()
        info[0] = info[1]
        sessionStorage.setItem('resultado', JSON.stringify(info[0]))
        operacionAnterior = '*'
      }else{
        operarAnterior()
        operacionAnterior = '*'
      }
    })
  }
}

Calculadora.init()
