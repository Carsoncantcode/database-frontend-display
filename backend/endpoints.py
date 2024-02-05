from fastapi import APIRouter, Query
from typing import List
from .logic import *
from .models import *




router = APIRouter()

@router.get('/retrieve_all')
def pull_data():
    data = retrieveAll()
    return data

@router.get('/retrieve/{id}')
def pull_data(id: str):
    data =  retrieveOne(id)
    return data

@router.delete('/delete/{id}')
def delete_data(id: str):
    data = deleteItem(id)
    return data

@router.post('/create')
def create_data(personData: person):
    data =  createItem(personData.dict())
    return data