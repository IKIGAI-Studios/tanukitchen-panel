from .module import Module

class Scale(Module):
    def __init__(self, id, serial):
        # Definir puerto y velocidad
        super().__init__(id, serial)
    
    def readValue(self):
        if self.active:
            # * CÓDIGO DE LECTURA DESDE ARDUINO
            # Leer la línea de datos del puerto serie
            self.getValueFromArduino('HX711')
        else:
            self.value = 0
        
        # Introducir en la BD
        print('Insercion en BD de: '+ str(self.value))
        self.insertValue("values", self.value)