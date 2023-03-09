window.onload=readDB();
window.onload=init();
var recipe = {}; // obj de la receta
var stepNum = 0; // contador pasos
var instNum = 1; // contador instrucciones  
var finished = false; // status receta
var scale_weight = 0;
var scale_goal_exist = false;
var peso_correcto = false;
var stove_temp = 0;
var stove_goal_exist = false;
var temp_correcta = false;

/* Primero creamos los objetos para poder grabar nuestra voz con el microfono */
const recVoz = window.SpeechRecognition || window.webkitSpeechRecognition
const rec = new recVoz()

/* metodo que se ejecuta al empezar a granar */
rec.onstart = ()=>{
    console.log('Recording...')
}
/* Metodo que se ejecuta al terminar la grabación */
rec.onresult = event =>{
    let mensaje = event.results[0][0].transcript
    console.info(mensaje)
    readCommand(mensaje)
}
/* Función que condiciona la respuesta dependiendo de el contenido de la grabación */
const readCommand = (mensaje)=>{
    const voz = new SpeechSynthesisUtterance()
    // Agregar comandos aqui
    if(mensaje.includes('instruction ready') || mensaje.includes('instrucción completa')){
        $('#btn_inst_ready').click()
        voz.text = 'ok, instruction marked as complete'
    } else {
        voz.text = mensaje + ' isnt a tanuki command'
    }
    window.speechSynthesis.speak(voz)
}
function speech2text() {
    rec.start()
}

function setValues() {
    // Establecer metas
    setGoal();
    // Vaciar lista de instrucciones
    $('#instructions_list').html('');
    $('#ingredients_list').html('');
    // Ocultar modulos anteriores
    $('#div_stove').css('display', 'none'); 
    $('#div_fire').css('display', 'none');
    $('#div_extractor').css('display', 'none');
    $('#div_scale').css('display', 'none');
    // Insertar paso actual
    $('#current_step').html((stepNum + 1) + ' /');
    $('#verb_step').html(recipe.steps[stepNum].verb + ':');

    let listTag = '', ingTag = '';
    
    // Recorrer las instrucciones del paso actual e insertarlo en la lista con el id inst_(#num de la instruccion)
    recipe.steps[stepNum].instructions.map((instruc, i) => {
        listTag += '<li id="inst_' + (i + 1) + '">' + instruc.do + '</li>';
    });

    // Recorrer las instrucciones del paso actual e insertarlo en la lista con el id inst_(#num de la instruccion)
    recipe.steps[stepNum].ingredients.map((ing) => {
        let j = 0;
        while (ing != recipe.ingredients[j].id_ingr) j++;
        ingTag += '<li id="ing_' + (j + 1) + '">' + recipe.ingredients[j].name + '</li>';
    });
    
    // Append -> Se agrega al html sin remplazar
    $('#instructions_list').append(listTag);
    $('#ingredients_list').append(ingTag);

    // Mostrar solo los modulos que se ocupan
    recipe.steps[stepNum].module.map((module) => {
        switch(module) {
            case 'scale': 
                    $('#div_scale').css('display', 'block'); 
                break;
            case 'stove': 
                    $('#div_stove').css('display', 'block'); 
                    $('#div_fire').css('display', 'block');
                    $('#div_extractor').css('display', 'block');
                break;
        }
    });
}

function setGoal() {
    $('#scale_goal').text('');
    $('#stove_goal').text('');
    scale_goal_exist = false;
    stove_goal_exist = false;
    // Verificar el modulo que se va a utilizar en esa isntruccion
    switch(recipe.steps[stepNum].instructions[instNum-1].module) {
        case 'scale':
                if (!$('#toScale').prop('checked')) alert('Asegurate de prender la báscula');
                $('#scale_goal').text('Goal: ' + recipe.steps[stepNum].instructions[instNum-1].goal + ' gr');
                scale_goal_exist = true, peso_correcto = false;
                $('#btn_inst_ready').attr('disabled', true);
            break;
        case 'stove':
            if (!$('#toStove').prop('checked')) alert('Asegurate de prender la estufa');
            $('#stove_goal').text('Goal: ' + recipe.steps[stepNum].instructions[instNum-1].goal + ' C°');
                stove_goal_exist = true, temp_correcta = false;
                $('#btn_inst_ready').attr('disabled', true);
            break;
    }
}

function readyInstruction() {
    // Si se acabo la receta se redirecciona
    if (finished) {
        // Cambiar cuando existan sesiones
        window.location.replace('http://localhost:3000/login');
    } else {
        // Verificar que el numero de instruccion actual sea diferente del total de instrucciones
        if (instNum != recipe.steps[stepNum].instructions.length) {
            // Tachar la instruccion realizada
            $('#inst_' + instNum).html('<strike>' + $('#inst_' + instNum).text() + '</strike>');
            instNum++;
            // Cambiar texto btn
            $('#btn_inst_ready').text('Instruction ' + instNum + ' Ready');
        }
        else {
            // Tachar ultima instruccion
            $('#inst_' + instNum).html('<strike>' + $('#inst_' + instNum).text() + '</strike>');
            // Verificar que el numero de pasos actual sea diferente del total de pasos
            if (stepNum + 1 != recipe.steps.length) {
                stepNum++;
                instNum = 1;
                // Obtener instrucciones y insertar los valores
                setValues();
                // Cambiar texto btn
                $('#btn_inst_ready').text('Instruction ' + instNum + ' Ready');
            } else {
                // Indicar que se acabo la receta
                alert('se acabo la receta');
                // Actualizar el conteo de bd
                
                // Cambiar texto boton para ir a inicio
                $('#btn_inst_ready').text('Go to home');
                // Cambiar status de receta
                finished = true;
            }
        }
        setGoal();
    }
}

function readDB() {
fetch('http://localhost:3000/api/modules/getModules')
.then((response) => response.json())
    .then((json) => {
        json.map((module) => {
            switch (module.name) {
                case 'extractor': 
                        $('#toSmoke').prop('checked', module.active);
                        $('#smoke_turn').html(module.active ? 'Turn Off' : 'Turn On');
                        $('#smoke_message').html(module.active ? 'On' : 'Off');
                    break;
                case 'smoke_detector': 
                        msj = 'Everything seems normal';
                        if (module.values[0].value >= 30 && module.values[0].value <= 60) {
                            msj = 'Warning, please open all windows';
                        } else if (module.values[0].value >= 60) {
                            msj = 'Alert, FIRE';
                        }
                        $('#fire_percent').html(module.values[0].value + ' %');
                        $('#fire_message').html(msj);
                    break;
                case 'scale': 
                        $('#toScale').prop('checked', module.active);
                        $('#scale_turn').html(module.active ? 'Turn Off' : 'Turn On');
                        scale_weight = Math.round(module.values[0].value);
                        $('#scale_weight').html(scale_weight + ' gr');
                    break;
                case 'stove': 
                        $('#toStove').prop('checked', module.active);
                        $('#stove_turn').html(module.active ? 'Turn Off' : 'Turn On');
                        stove_temp = Math.round(module.values[0].value);
                        $('#stove_temp').html(stove_temp + ' C°');
                    break;
            }
        });
    });
    evaluateGoals();
}

function evaluateGoals() {
    if (!peso_correcto) {
        if (scale_goal_exist) {
            // Verificar con un margen de error de 4 gr
            if (scale_weight >= recipe.steps[stepNum].instructions[instNum-1].goal - 4 && scale_weight <= recipe.steps[stepNum].instructions[instNum-1].goal + 4)  {
                alert('Peso correcto')
                peso_correcto = true;
                $('#btn_inst_ready').attr('disabled', false);
            }
        }
    } else if (!temp_correcta) {
        if (stove_goal_exist) {
            // Verificar con un margen de error de 4 gr
            if (stove_temp >= recipe.steps[stepNum].instructions[instNum-1].goal - 10 && stove_temp <= recipe.steps[stepNum].instructions[instNum-1].goal + 4)  {
                alert('Temperatura correcta')
                temp_correcta = true;
                $('#btn_inst_ready').attr('disabled', false);
            }
        }
    }
}

function state_change(module, state) {
    url = 'http://localhost:3000/api/bin/';
    state ? url += 'start' : url += 'stop';
    url += '_' + module;
    fetch(url)
    .then((response) => response.json())
        .then((json) => {
            json ? alert(`${module}: ${state ? 'Turned On' : 'Turned Off'} Successfully`) : alert(json);
        });
}

var items = document.querySelectorAll('.nav-item a');
items[1].setAttribute('aria-current', "page");

setInterval('readDB()', 2000);