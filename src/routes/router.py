from fastapi import APIRouter

from .healthcheck import healthcheck_router
from .repositories import repositories_router

router = APIRouter()

router.include_router(healthcheck_router)
router.include_router(repositories_router)
