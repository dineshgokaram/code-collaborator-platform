from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import authentication
from .api import collaboration, execution

app = FastAPI(title="Real-Time Code Collaboration Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authentication.router)
app.include_router(collaboration.router)
app.include_router(execution.router)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the Code Collaboration API!"}