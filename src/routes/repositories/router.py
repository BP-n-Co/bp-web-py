import requests
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from _config import BACKEND_URL_V1, base_logger, templates_path

router = APIRouter(prefix="/repositories")
templates = Jinja2Templates(directory=templates_path / "repositories")


@router.get("", response_class=HTMLResponse)
async def load_mainpage(request: Request):
    return templates.TemplateResponse(request=request, name="mainpage.html")


@router.post("")
async def track_new_repo(request: Request):
    form_raw = await request.form()
    fetch_url = BACKEND_URL_V1 + "repositories"
    resp = requests.post(url=fetch_url, json=dict(form_raw))
    base_logger.info(resp.json())
    if resp.status_code == 201:
        return templates.TemplateResponse(request=request, name="track_success.html")
    else:
        return templates.TemplateResponse(request=request, name="track_fail.html")


@router.get("/get_repos", response_class=HTMLResponse)
async def get_repositories(request: Request) -> HTMLResponse:
    fetch_url = BACKEND_URL_V1 + "repositories"
    resp = requests.get(url=fetch_url).json()
    resp_data = resp["data"]
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
