import ssl, sys, time, random
from datetime import datetime
import paho.mqtt.client as mqtt

#Bloque conexión BBDD
import pymongo
myclient = pymongo.MongoClient("mongodb+srv://admin:admin@lasai.44fec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
mydb = myclient["Datos"]
Mascarillas = mydb["Mascarillas"]
Personas= mydb["Personas"]

#Método utilizado para ingestar un documento en MongoDB
def insert_data(datum): 
    
    document = datum.split(";")

    date_time_obj = datetime.strptime(document[2], '%Y-%m-%d %H:%M:%S.%f')
    date_time     = datetime.strptime(document[2], '%Y-%m-%d %H:%M:%S.%f').strftime("%d-%m-%Y")
    date_hour     = datetime.strptime(document[2], '%Y-%m-%d %H:%M:%S.%f').strftime("%H:%m")
        
    print(document[3])
    print(type(document[3]))
    
    if "10:00" < date_hour < "10:59":
        data = "10:00"
    if "11:00" < date_hour < "11:59":
        data = "11:00" 
    if "12:00" < date_hour < "12:59":
        data = "12:00"
    if "13:00" < date_hour < "13:59":
        data = "13:00"
    if "14:00" < date_hour < "14:59":
        data = "14:00"
    if "15:00" < date_hour < "15:59":
        data = "15:00"
    if "16:00" < date_hour < "16:59":
        data = "16:00"
    if "17:00" < date_hour < "17:59":
        data = "17:00"
    if "18:00" < date_hour < "18:59":
        data = "18:00"
    if "19:00" < date_hour < "19:59":
        data = "19:00"
    if "20:00" < date_hour < "20:59":
        data = "20:00"
    if "21:00" < date_hour < "21:59":
        data = "21:00"
        
    if document[3] == "0":
        post = {"mascarillas": 1,
                "dia": date_time,
                "hora": data,
                "semana": date_time_obj.isocalendar()[1],
                "fecha": date_time_obj}
        x = Mascarillas.insert_one(post)

    if document[3] == "1":
        post = {"personas": 1,
                "dia": date_time,
                "hora": data,
                "semana": date_time_obj.isocalendar()[1],
                "fecha": date_time_obj}
        x = Personas.insert_one(post)

def on_connect(client, userdata,flags,rc):
    print('Se ha conectado (%s)' % client._client_id) 
    client.subscribe(topic= 'mqtt/mascarillas', qos=2)

def on_message(client, userdata,message):
    message_DB = str(message.payload.decode("utf-8"))
    insert_data(message_DB)


def on_publish():
    time.sleep(3) 
    
def main():
    client = mqtt.Client(client_id='TEST', clean_session=True) #si no definimos el id, nos lo da aleatoriamente al conectarnos
    client.username_pw_set('TEST', 'mosquitto')
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(host= 'ec2-3-137-57-201.us-east-2.compute.amazonaws.com' , port=1883)
    client.loop_forever()

if __name__ == "__main__":
    main()
    
sys.exit(0)

