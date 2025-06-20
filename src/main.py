import sys
from pathlib import Path

root_path = Path(__file__).resolve().parent
sys.path.append(str(root_path))

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from _config import APP_PORT, UVICORN_MODE_DEBUG, root_path
from routes import routes_router

app = FastAPI()

app.mount("/static", StaticFiles(directory=root_path / "static"), name="static")
app.include_router(routes_router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=APP_PORT, reload=UVICORN_MODE_DEBUG)
