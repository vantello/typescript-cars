/*Es crea un cotxe fora de totes les funcions, per poguer fer referencia a ell en tot moment. 
L'exercici nomès demana un cotxe, i crear les rodes en ell. 
*/

var cars: Array<Object> = [];


function createCar(){
    var plate: string = (<HTMLInputElement>document.getElementById("plate")).value;
    var brand: string = (<HTMLInputElement>document.getElementById("brand")).value;
    var color: string = (<HTMLInputElement>document.getElementById("color")).value;
    
    //Es comprova si passa el checking de Matrícula.
    if(checkPlate(plate)){
        var car = new Car(plate,color,brand);
        cars.push(car);
        //Typescript necessita que les variables tinguin un tipo, i cars[0] no ho detecta com array. Així que s'ha de crear una
        // variable que tingui tipo i donar-li el valor de la posició de l'array que volem que tingui. En aquest cas 0.
        var x: any = cars[0];
        //car.addWheel(new Wheel(2,"SEAT"));
        //(<HTMLInputElement>document.getElementById("carTitle")).innerHTML = "Well done, you created a car. Here it is!!";
        (<HTMLInputElement>document.getElementById("carDisplay")).classList.remove("dNone");
        (<HTMLInputElement>document.getElementById("formCar")).classList.add("dNone");
        (<HTMLInputElement>document.getElementById("tdBrand")).innerHTML = x.brand;
        (<HTMLInputElement>document.getElementById("tdPlate")).innerHTML = x.plate;
        (<HTMLInputElement>document.getElementById("tdColor")).innerHTML = x.color;
    }else{
        alert("La matrícula no és correcte. El format és 1234HHH");
    }
    
}

function createWheels(){
    (<HTMLInputElement>document.getElementById("formWheels")).classList.remove("dNone");
    (<HTMLInputElement>document.getElementById("carDisplay")).classList.add("dNone");
}

function addWheels(){
    var i: number = 0;
    var x: any = cars[0];
    console.log("Cotxe sense rodes : " + x.brand);
    for (i=1;i<5;i++){
        var wheelBrand: string = (<HTMLInputElement>document.getElementById("wheelBrand" + i)).value;
        var wheelDiameter: number = Number((<HTMLInputElement>document.getElementById("wheelDiameter" + i)).value);
        if(checkDiameter(wheelDiameter)){
            x.addWheel(new Wheel(wheelDiameter, wheelBrand));
            (<HTMLInputElement>document.getElementById("showWheels")).classList.remove("dNone");
            (<HTMLInputElement>document.getElementById("formWheels")).classList.add("dNone");

            (<HTMLInputElement>document.getElementById("showCar")).innerHTML = x.brand + " " + x.plate + " " + x.color;

            (<HTMLInputElement>document.getElementById("wheel"+i)).innerHTML = "Roda " + i;
            (<HTMLInputElement>document.getElementById("wBrand"+i)).innerHTML = wheelBrand;
            (<HTMLInputElement>document.getElementById("wDiameter" + i)).innerHTML = "" + wheelDiameter;
        }else{
            alert("El diametre de la roda " + i + " ha d'estar entre 0.4 i 2.")
        }
        
    }
}

// Fase 3. Check plate and wheels

function checkPlate(plate: any){
    var num: number = plate.slice(0,4);
    var letters: string = plate.slice(4);
    var checkLetters: RegExp = /^[A-Z]+$/i;
    
    // comprovem si la matricula és diferent a 7
    if(plate.length != 7 ){
        return false;
    }
    //comprovem si es númeric
    if(isNaN(num)){
        return false;
    }
    //test busca coincidencies dins el que se li passa.
    if(!checkLetters.test(letters)){
        return false;
    }
    return true;
}

function checkDiameter(diameter: number){
    //El diàmetre de la roda serà menor que 0.4 i major que 2.
    if( diameter < 0.4 || diameter > 2 ){
        return false
    }
    return true;
}