import serial
import time


# ser = serial.Serial('COM4', 9600)

value = 0

line = 'HUMEDAD:12413|ASDA:124324|HX711:123'

while True:

    
    # line = ser.readline().decode('utf-8').rstrip()

    # Dividir la línea de datos en las partes correspondientes
    parts = line.split('|')

    for part in parts:
        if part.find('HX711') != -1:
            var = part.split(':')

            # Recuperar valor de la báscula
            value = int(var[1])

            
    # Introducir en la BD
    print('Insercion en BD de: '+ str(value))

    time.sleep(1)
