import ssl, sys, time, random
from datetime import datetime
import paho.mqtt.client as mqtt

#Bloque conexión BBDD
import pymongo
myclient = pymongo.MongoClient("mongodb+srv://admin:admin@lasai.44fec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
mydb = myclient["Datos"]
mycol= mydb["MQTT"]

#Método utilizado para ingestar un documento en MongoDB
def insert_data(datum): 
    document = datum.split(";")
    # Elemento a insertar
    post = {"STATE": document[0],
        "ID": int(document[1]),
        "TIMESTAMP": document[2]}
    x = mycol.insert_one(post)
    print(post)




def on_connect(client, userdata,flags,rc):
    print('Se ha conectado (%s)' % client._client_id) 
    client.subscribe(topic= 'mqtt/mascarillas', qos=2)
    #client.publish("cosas/cosasdeprueba","Conexión realizada",qos=2,retain=True)

def on_message(client, userdata,message):
    now = datetime.now()
    print('--------------')
    print('topic: %s' %message.topic)
    print('payload: %s' %message.payload)
    print('qos: %s' %message.qos)
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

