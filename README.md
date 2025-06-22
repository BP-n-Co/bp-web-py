# Frontend Application

This repository contains a FastAPI-HTMX-Alpine JS frontend application for Git Commit History Visualization.

## Running the Application

Before running the application, you need to have Docker Desktop installed:

1. Download Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Install Docker Desktop following the installation instructions for your operating system
3. Start Docker Desktop and ensure it's running

---

Copy paste `.env-example` to `.env` and fill it with your own environment requirements.

---

Then to run the application, use the following command:

```bash
docker-compose up -d app
```

---

To stop the application, use the following command:

```bash
docker-compose down
```

---

The application will be available at:

- http://localhost:${APP_PORT}

---

To connect with the backend, checkout this repository and follow the instructions:

https://github.com/AlixPa/git-history-visualization-server

---

Once everythiong is setup, you should be able to see the mock data

![](images/application_example.png)

## Working on the repository

### Python environment

Python version : 3.11.12

Create your local environment for this repo

```bash
python3.11 -m venv .venv
```

Activate it (bash/zsh)

```bash
source .venv/bin/activate
```

Install requirements

```bash
python -m pip install -r requirements.txt
```

### Formating

Make sure to install and activate the extensions

- black formatter
- isort

Note that you should make sure to have the same args in your isort and black formatter settings as in the `pre-commit-config.yaml` file
![](images/pre_commit_config.png)
![](images/isort_settings.png)

Then, once venv is activated, make sure to install pre-commit with

```bash
pre-commit install
```

And voilà. Now everytime you try to commit it will reformat the files if you are not respecting the formatting of blackformatter and isort. But as you have the extensions on, everything should be fine.
