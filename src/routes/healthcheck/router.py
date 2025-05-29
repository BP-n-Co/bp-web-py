from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/")


class Pong(BaseModel):
    text: str


@router.get("", response_model=Pong)
async def ping():
    return Pong(text="pong")
