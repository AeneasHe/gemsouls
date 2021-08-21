export PYTHONPATH=$PWD/srv
echo $PYTHONPATH
uvicorn main:app --reload --app-dir srv/server --root-path srv --reload-dir srv