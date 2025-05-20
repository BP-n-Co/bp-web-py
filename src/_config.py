import json
import logging
import os
import sys
from pathlib import Path

from dotenv import load_dotenv

root_path = Path(__file__).resolve().parent
sys.path.append(str(root_path))

templates_path = root_path / "templates"

load_dotenv(override=False)

ENV = os.getenv("ENV", "local")

APP_PORT = int(os.getenv("APP_PORT", 8000))
UVICORN_MODE_DEBUG = bool(os.getenv("UVICORN_MODE_DEBUG", False))


class ServiceEnv:
    local = "local"
    production = "production"


BACKEND_IP = os.getenv("BACKEND_IP", "127.0.0.1")
BACKEND_PORT = os.getenv("BACKEND_PORT", "8080")
BACKEND_URL_V1 = (
    f"http{'s' if ENV == ServiceEnv.production else ''}://"
    + BACKEND_IP
    + ":"
    + BACKEND_PORT
    + "/api/v1/"
)


class DateTimeFormat:
    github = "%Y-%m-%dT%H:%M:%SZ"
    bp_co_long = "%Y-%m-%d %H:%M:%S"


class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "timestamp": self.formatTime(record, "%Y-%m-%d %H:%M:%S"),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        return json.dumps(log_record)


class LocalFormatter(logging.Formatter):
    def format(self, record):
        LOG_COlORS = {
            "DEBUG": "\033[94m",  # Blue
            "INFO": "\033[92m",  # Green
            "WARNING": "\033[93m",  # Yellow
            "ERROR": "\033[91m",  # Red
            "CRITICAL": "\033[41;97m",  # White on red
        }
        RESET_COLOR = "\033[0m"

        timestamp = self.formatTime(record, "%Y-%m-%d %H:%M:%S")
        level = record.levelname
        color = LOG_COlORS.get(level, "")
        logger = record.name
        message = record.getMessage()

        log_record = (
            f"\n{color}{timestamp}\n{level} from {logger}\n{message}{RESET_COLOR}"
        )

        return log_record


def get_logger(name="BP_logger", env: str = ENV):
    logger = logging.getLogger(name)
    if env == ServiceEnv.production:
        logger.setLevel(logging.INFO)
    else:
        logger.setLevel(logging.DEBUG)

    if not logger.hasHandlers():
        handler = logging.StreamHandler(sys.stdout)
        if env == ServiceEnv.production:
            handler.setFormatter(JsonFormatter())
        else:
            handler.setFormatter(LocalFormatter())
        logger.addHandler(handler)

    return logger


base_logger = get_logger()
