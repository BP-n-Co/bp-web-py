import requests
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from _config import BACKEND_URL_V1, base_logger, templates_path

router = APIRouter(prefix="/repositories")
templates = Jinja2Templates(directory=templates_path / "repositories")


@router.get("", response_class=HTMLResponse)
async def main_page(request: Request):
    return templates.TemplateResponse(request=request, name="mainpage.html")


@router.get("/get_repos", response_class=HTMLResponse)
async def get_repositories(request: Request) -> HTMLResponse:
    fetch_url = BACKEND_URL_V1 + "repositories"
    base_logger.info(f"fetching {fetch_url}")
    resp = requests.get(url=fetch_url).json()
    base_logger.info(f"got {resp=}")
    resp_data = resp["data"]
    base_logger.info(f"loading html with {resp_data=}")
    return templates.TemplateResponse(
        request=request,
        name="repositories.html",
        context=dict(repositories=resp_data),
    )


@router.get("/get_commits", response_class=HTMLResponse)
async def get_commits(request: Request, repo_to_display_id: str) -> HTMLResponse:
    fetch_url = BACKEND_URL_V1 + "repositories/commits"
    resp = requests.get(url=fetch_url, params=dict(repo_id=repo_to_display_id)).json()
    resp_data = resp["data"]
    return templates.TemplateResponse(
        request=request,
        name="commits.html",
        context=dict(commits=resp_data),
    )
