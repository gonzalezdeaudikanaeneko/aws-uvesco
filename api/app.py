import random
from flask import Flask, jsonify
app = Flask(__name__)
import pymongo

AtlasClient = pymongo.MongoClient("mongodb+srv://admin:admin@lasai.44fec.mongodb.net/<dbname>?retryWrites=true&w=majority")
DB = AtlasClient["Datos"]
PersonasDB = DB["Personas"]
IncidenciasDB = DB["Incidencias"]
MascarillasDB = DB["Mascarillas"]
MQTTDB = DB["MQTT"]

personasLista = []
incidenciasLista = []
mascarillasLista = []
hora = []
horai = []
horam = []

personasListaHistorico = []
personasListaHistoricoFecha = []
incidenciasListaHistorico = []
incidenciasListaHistoricoFecha = []
mascarillasListaHistorico = []
mascarillasListaHistoricoFecha = []


@app.route('/apis/personas/<string:dia>')
def api_personas_chart(dia):

  personasLista.clear()
  hora.clear()
  tot = 0

  agregacion = PersonasDB.aggregate([
    {
      "$match": { "dia": dia } 
    },
    {
      "$group": 
        {
          "_id" : "$hora", 
          "total" : {"$sum" : "$personas"}
        }
    },
    { 
      "$sort": { "_id": 1 }
    }
  ])

  for i in agregacion:
    personasLista.append(i.get("total"))
    hora.append(i.get('_id'))
    tot = tot + i.get("total")
    
  return {
    'userId': 1,
    'totalPersonas': tot,
    'listaPersonas': personasLista,
    'hora': hora
  }

@app.route('/apis/incidencias/<string:dia>')
def api_incidencias_chart(dia):

  incidenciasLista.clear()
  horai.clear()
  tot = 0

  agregacion = IncidenciasDB.aggregate([
    {
      "$match": { "dia": dia } 
    },
    {
      "$group": 
        {
          "_id" : "$hora", 
          "total" : {"$sum" : "$incidencias"}
        }
    },
    { 
      "$sort": { "_id": 1 }
    }
  ])

  for i in agregacion:
    incidenciasLista.append(i.get("total"))
    horai.append(i.get('_id'))
    tot = tot + i.get("total")

  return {
    'userId': 2,
    'totalIncidencias': tot,
    'listaIncidencias': incidenciasLista,
    'hora': horai
  }

@app.route('/apis/mascarillas/<string:dia>')
def api_mascarillas_chart(dia):

  mascarillasLista.clear()
  horam.clear()
  tot = 0
  
  agregacion = MascarillasDB.aggregate([
    {
      "$match": { "dia": dia } 
    },
    {
      "$group": 
        {
          "_id" : "$hora", 
          "total" : {"$sum" : "$mascarillas"}
        }
    },
    { 
      "$sort": { "_id": 1 }
    }
  ])

  for i in agregacion:
    mascarillasLista.append(i.get("total"))
    horam.append(i.get('_id'))
    tot = tot + i.get("total")
  print("horam:")
  print(horam)
  return {
    'userId': 3,
    'totalMascarillas': tot,
    'listaMascarillas': mascarillasLista,
    'hora': horam
  }

@app.route('/apis/personas/historic/<int:semana>')
def api_personas_historico(semana):

  personasListaHistorico.clear()
  personasListaHistoricoFecha.clear()
  incidenciasListaHistorico.clear()
  mascarillasListaHistorico.clear()

  agregacion = PersonasDB.aggregate([
    {
      "$match": { "semana": semana } 
    },
    {
      "$group": 
        {
          "_id" : "$dia", 
          "total" : {"$sum" : "$personas"}
        }
    },
    { 
      "$sort": { "_id": 1 }
    }
  ])

  for i in agregacion:
    personasListaHistorico.append(i.get("total"))
    personasListaHistoricoFecha.append(i.get('_id'))

  agregacion = IncidenciasDB.aggregate([
    {
      "$match": { "semana": semana } 
    },
    {
      "$group": 
        {
          "_id" : "$dia", 
          "total" : {"$sum" : "$incidencias"}
        }
    },
    { 
      "$sort": { "_id": 1 }
    }
  ])

  for i in agregacion:
    incidenciasListaHistorico.append(i.get("total"))

  agregacion = MascarillasDB.aggregate([
    {
      "$match": { "semana": semana } 
    },
    {
      "$group": 
        {
          "_id" : "$dia", 
          "total" : {"$sum" : "$mascarillas"}
        }
    },
    { 
      "$sort": { "_id": 1 }
    }
  ])

  for i in agregacion:
    mascarillasListaHistorico.append(i.get("total"))

  return {
    'userId': 4,
    'listaPersonas': personasListaHistorico,
    'listaIncidencias': incidenciasListaHistorico,
    'listaMascarillas': mascarillasListaHistorico,
    'listaPersonasFecha': personasListaHistoricoFecha
  }

