from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.execution_engine import run_code_in_docker

class CodeExecutionRequest(BaseModel):
    code: str
    language: str = "python"

class CodeExecutionResponse(BaseModel):
    output: str
    error: str

router = APIRouter()

@router.post("/api/execute", response_model=CodeExecutionResponse)
async def execute_code_endpoint(request: CodeExecutionRequest):
    try:
        result = run_code_in_docker(request.code, request.language)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")