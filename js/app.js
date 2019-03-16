var operacionAnterior = ''
var pressIgual = false
var pressAgain = false
var inicio = true
var ultimoNumOperado = '0'
/** Realiza la operación que se oprimió anteriormente, cuando se escribe un número y se oprime una operación,
 *  ésta debe terminar de hacer la operación que se escribió anteriormente
*/
function operarAnterior(){
  switch(operacionAnterior){
    case('+'):
      var info = recuperarInfo()
      ultimoNumOperado = info[1]
      info[0] += info[1]
      sessionStorage.setItem('resultado', JSON.stringify(info[0]))
      break
    case('-'):
      var info = recuperarInfo()
      ultimoNumOperado = info[1]
      info[0] -= info[1]
      sessionStorage.setItem('resultado', JSON.stringify(info[0]))
      break
    case('*'):
      var info = recuperarInfo()
      if(info[1]==''){
        info[1] = 1
      }
      ultimoNumOperado = info[1]
      info[0] *= info[1]
      sessionStorage.setItem('resultado', JSON.stringify(info[0]))
      break
    case('/'):
      var info = recuperarInfo()
      if(info[1] == ''){
        info[1] = 1
      }
      ultimoNumOperado = info[1]
      info[0] /= info[1]
      sessionStorage.setItem('resultado', JSON.stringify(info[0]))
    default:
  }
}
/** Recupera la información dependiendo si previamente se oprimió un = o no */
function recuperarInfo(){
  if(pressIgual){//Aquí entra cuando se oprimió el igual y se presiona otra tecla de operación
    if(pressAgain){//Aquí entra cuando se presionó dos o más veces el igual
      pressAgain = false
      var pantalla = document.getElementById('display')
      var numero = Number(pantalla.innerHTML)
      pantalla = ''
      var respuesta = [numero, ultimoNumOperado]
      return respuesta
    }else{ //Aquí entra cuando se presionó un igual y después se presiona una operación
      pressIgual = false
      var pantalla = document.getElementById('display')
      var numero = Number(pantalla.innerHTML)
      pantalla.innerHTML = ''
      var respuesta = [numero, 0]
      return respuesta
    }
  }else{//Aquí entra cuando no se ha oprimido el igual y se está operando o cuando se oprimió y se han presionado teclas de operación una o más veces
    pressAgain = false
    var pantalla = document.getElementById('display')
    var numero = Number(pantalla.innerHTML)
    pantalla.innerHTML=''
    var res = Number(JSON.parse(sessionStorage.getItem('resultado')))
    var respuesta = [res, numero]
    return respuesta
  }
}

/**Objeto calculadora posee los métodos funcionales de la calculadora*/
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
    this.dividir()
    this.igual()
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
    inicio = false
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
      sessionStorage.setItem('resultado', JSON.stringify(0))
      operacionAnterior=''
      pressIgual = false
      inicio = true
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
  /**Las operaciones deben contemplar el hecho de que no se hayan hecho operaciones anteriormente
   * esto para establecer el valor inicial del valor en el sessionStorage
   */
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
  },
  dividir: function(){
    var btnDiv = document.getElementById('dividido')
    btnDiv.addEventListener('click', function(e){
      if(operacionAnterior == ''){
        var info = recuperarInfo()
        info[0] = info[1]
        sessionStorage.setItem('resultado', JSON.stringify(info[0]))
        operacionAnterior='/'
      }else{
        operarAnterior()
        operacionAnterior='/'
      }
    })
  },
  /**El igual debe identificar cuando ha sido oprimido una vez y cuándo dos o más veces
   * Además debe diferenciar cuando un resultado es mayor a 8 caracteres
   */
  igual: function(){
    var btnIgual = document.getElementById('igual')
    btnIgual.addEventListener('click',function(e){
      if(pressIgual){
        pressAgain = true
      }
      operarAnterior()
      var pantalla = document.getElementById('display')
      var resultado = sessionStorage.getItem('resultado')
      if(resultado.length > 8){
        resultado=resultado.slice(0, 8)
      }
      pantalla.innerHTML = resultado
      if(!inicio){
        pressIgual=true
      }
    })
  }
}

Calculadora.init()
