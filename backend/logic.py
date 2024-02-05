from supabase import *
import os
from dotenv import load_dotenv


load_dotenv()

db_url: str = os.getenv('url')
db_key: str = os.getenv('key')

supabase: Client = create_client(db_url, db_key)


def retrieveAll():
    
    people = supabase.table('people').select('*').execute()

    if people.data:
        return people.data

def retrieveOne(id):
    person = supabase.table('people').select('*').eq('id', id).execute()

    if person.data:
        return person.data

def deleteItem(id):
    
    delete_response = supabase.table('people').delete().eq('id', id).execute()

    return delete_response

def createItem(data):

    person = supabase.table('people').insert(data).execute()

    return person.data