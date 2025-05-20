from fastapi import APIRouter

from .repositories import repositories_router

router = APIRouter()

router.include_router(repositories_router)
