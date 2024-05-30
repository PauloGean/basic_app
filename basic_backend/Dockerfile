# pull official base image
FROM python:3.9
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1


# set work directory
WORKDIR /usr/src/app

COPY ./requirements.txt .
RUN pip install -r requirements.txt
# copy project
COPY . .

RUN python manage.py collectstatic
