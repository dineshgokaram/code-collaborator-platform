from pydantic import BaseModel

# Pydantic models define the shape of your data.
# They are used for validation and serialization.

class Message(BaseModel):
    content: str
    user_id: str

class User(BaseModel):
    username: str
    role: str # e.g., 'owner', 'editor', 'viewer'

# (Add these classes to the existing file)
class CodeExecutionRequest(BaseModel):
    code: str
    language: str = "python"

class CodeExecutionResponse(BaseModel):
    output: str
    error: str