from pydantic import *

class person(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    email: str