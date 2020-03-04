"use strict";
/*Es crea un cotxe fora de totes les funcions, per poguer fer referencia a ell en tot moment.
L'exercici nomès demana un cotxe, i crear les rodes en ell.
*/
var cars = [];
function createCar() {
    var plate = document.getElementById("plate").value;
    var brand = document.getElementById("brand").value;
    var color = document.getElementById("color").value;
    //Es comprova si passa el checking de Matrícula.
    if (checkPlate(plate)) {
        var car = new Car(plate, color, brand);
        cars.push(car);
        //Typescript necessita que les variables tinguin un tipo, i cars[0] no ho detecta com array. Així que s'ha de crear una
        // variable que tingui tipo i donar-li el valor de la posició de l'array que volem que tingui. En aquest cas 0.
        var x = cars[0];
        //car.addWheel(new Wheel(2,"SEAT"));
        //(<HTMLInputElement>document.getElementById("carTitle")).innerHTML = "Well done, you created a car. Here it is!!";
        document.getElementById("carDisplay").classList.remove("dNone");
        document.getElementById("formCar").classList.add("dNone");
        document.getElementById("tdBrand").innerHTML = x.brand;
        document.getElementById("tdPlate").innerHTML = x.plate;
        document.getElementById("tdColor").innerHTML = x.color;
    }
    else {
        alert("La matrícula no és correcte. El format és 1234HHH");
    }
}
function createWheels() {
    document.getElementById("formWheels").classList.remove("dNone");
    document.getElementById("carDisplay").classList.add("dNone");
}
function addWheels() {
    var i = 0;
    var x = cars[0];
    console.log("Cotxe sense rodes : " + x.brand);
    for (i = 1; i < 5; i++) {
        var wheelBrand = document.getElementById("wheelBrand" + i).value;
        var wheelDiameter = Number(document.getElementById("wheelDiameter" + i).value);
        if (checkDiameter(wheelDiameter)) {
            x.addWheel(new Wheel(wheelDiameter, wheelBrand));
            document.getElementById("showWheels").classList.remove("dNone");
            document.getElementById("formWheels").classList.add("dNone");
            document.getElementById("showCar").innerHTML = x.brand + " " + x.plate + " " + x.color;
            document.getElementById("wheel" + i).innerHTML = "Roda " + i;
            document.getElementById("wBrand" + i).innerHTML = wheelBrand;
            document.getElementById("wDiameter" + i).innerHTML = "" + wheelDiameter;
        }
        else {
            alert("El diametre de la roda " + i + " ha d'estar entre 0.4 i 2.");
        }
    }
}
// Fase 3. Check plate and wheels
function checkPlate(plate) {
    var num = plate.slice(0, 4);
    var letters = plate.slice(4);
    var checkLetters = /^[A-Z]+$/i;
    // comprovem si la matricula és diferent a 7
    if (plate.length != 7) {
        return false;
    }
    //comprovem si es númeric
    if (isNaN(num)) {
        return false;
    }
    //test busca coincidencies dins el que se li passa.
    if (!checkLetters.test(letters)) {
        return false;
    }
    return true;
}
function checkDiameter(diameter) {
    //El diàmetre de la roda serà menor que 0.4 i major que 2.
    if (diameter < 0.4 || diameter > 2) {
        return false;
    }
    return true;
}
