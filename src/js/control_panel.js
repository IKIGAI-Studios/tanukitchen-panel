var items = document.querySelectorAll('.nav-item a');
items[0].setAttribute('aria-current', "page");

jsonRead = {};

function readJson() {
    fetch('http://localhost:3000/api/bin/modules')
    .then((response) => response.json())
    .then((json) => {
        $('#toScale').prop('checked', json.modules[0].state);
        $('#scale_turn').html(json.modules[0].state ? 'Turn Off' : 'Turn On');
        $('#scale_weight').html(json.modules[0].value + ' gr');

        $('#toStove').prop('checked', json.modules[1].state);
        $('#stove_turn').html(json.modules[1].state ? 'Turn Off' : 'Turn On');
        $('#stove_temp').html(json.modules[1].value + ' C°');
        
        msj = 'Everything seems normal';
        if (json.modules[2].value >= 30 && json.modules[2].value <= 60) {
            msj = 'Warning, please open all windows';
        } else if (json.modules[2].value >= 60) {
            msj = 'Alert, FIRE';
        }
        $('#fire_percent').html(json.modules[2].value + ' %');
        $('#fire_message').html(msj);
        
        $('#toSmoke').prop('checked', json.modules[3].state);
        $('#smoke_turn').html(json.modules[3].state ? 'Turn Off' : 'Turn On');
        $('#smoke_message').html(json.modules[3].state ? 'On' : 'Off');

        $('#toGas').prop('checked', json.modules[4].state);
        $('#gas_turn').html(json.modules[4].state ? 'Close' : 'Open');
        $('#gas_message').html(json.modules[4].state ? 'Open' : 'Close');

        $('#toOven').prop('checked', json.modules[5].state);
        $('#oven_turn').html(json.modules[5].state ? 'Turn Off' : 'Turn On');
        $('#oven_temp').html(json.modules[5].value + ' C°');
    });
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
                        $('#scale_weight').html(module.values[0].value + ' gr');
                    break;
                case 'stove': 
                        $('#toStove').prop('checked', module.active);
                        $('#stove_turn').html(module.active ? 'Turn Off' : 'Turn On');
                        $('#stove_temp').html(module.values[0].value + ' C°');
                    break;
                case 'oven': 
                        $('#toOven').prop('checked', module.active);
                        $('#oven_turn').html(module.active ? 'Turn Off' : 'Turn On');
                        $('#oven_temp').html(module.values[0].value + ' C°');
                        break;
                case 'gas': 
                        $('#toGas').prop('checked', module.active);
                        $('#gas_turn').html(module.active ? 'Close' : 'Open');
                        $('#gas_message').html(module.active ? 'Open' : 'Close');
                    break;
            }
        });
    });
}

// setInterval('readJson()', 2000);
setInterval('readDB()', 2000);

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