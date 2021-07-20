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
  total = 0

  for x in PersonasDB.find({"dia": dia},{"_id": 0, 'personas': 1, "hora": 1, 'dia': 1}).sort("hora"):
    personasLista.append(x.get('personas'))
    total += x.get('personas')
    hora.append(x.get('hora'))

  print(total)
  return {
    'userId': 1,
    'totalPersonas': total,
    'listaPersonas': personasLista,
    'hora': hora
  }

@app.route('/apis/incidencias/<string:dia>')
def api_incidencias_chart(dia):

  incidenciasLista.clear()
  total = 0
  for x in IncidenciasDB.find({"dia": dia},{"_id": 0, 'incidencias': 1}):
    incidenciasLista.append(x.get('incidencias'))
    total += x.get('incidencias')

  print(total)
  return {
    'userId': 2,
    'totalIncidencias': total,
    'listaIncidencias': incidenciasLista
  }

@app.route('/apis/mascarillas/<string:dia>')
def api_mascarillas_chart(dia):

  mascarillasLista.clear()
  total = 0
  for x in MascarillasDB.find({"dia": dia},{"_id": 0, 'mascarillas': 1}):
    mascarillasLista.append(x.get('mascarillas'))
    total += x.get('mascarillas')

  print(total)
  return {
    'userId': 3,
    'totalMascarillas': total,
    'listaMascarillas': mascarillasLista
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

  agregacion = PersonasDB.aggregate([
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

