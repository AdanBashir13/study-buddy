## To get started:

1. Clone the repository:
```
git clone https://github.com/AdanBashir13/study-buddy --depth 1 &&  cd study-buddy
```

2. Install the dependencies:
```
pipenv install && pipenv shell
```
```
npm install --prefix client
```

3. Update the configuration && DB:
```
flask db init
flask db migrate
flask db upgrade head
python server/seed.py
```

4. Run the app now:
```
gunicorn -b 127.0.0.1:5555 --chdir ./server manage:app
or
flask run
```

**Endpoints:**

http://localhost:5555/test => tests if server is running

Endpoint                   Methods  Rule                                           
-------------------------  -------  -----------------------------------------------
api.create_progress        POST     /api/study-schedules/<int:schedule_id>/progress
api.create_study_schedule  POST     /api/study-schedules                           
api.delete_study_schedule  DELETE   /api/study-schedules/<int:schedule_id>         
api.get_study_schedule     GET      /api/study-schedules/<int:schedule_id>         
api.get_study_schedules    GET      /api/study-schedules                           
api.index                  GET      /api/test                                      
api.login                  POST     /api/login                                     
api.register               POST     /api/register                                  
api.update_study_schedule  PUT      /api/study-schedules/<int:schedule_id>         
static                     GET      /static/<path:filename>  