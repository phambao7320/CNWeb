from flask import Flask, json
from flask import jsonify
from flask import request
from flask import send_file,Response
from time import time

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import decode_token
from flask_jwt_extended import JWTManager



b = get_jwt_identity("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNDk3MjM1NCwianRpIjoiNzQzZGNmM2ItZWFmMi00NDU5LTk5ZGMtNmNiNDRkNzYyYzU5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MSwidXNfTmFtZSI6InBoYW1iYW83MzIwIiwidXNfUG9zaXRpb24iOiJBZG1pbiJ9LCJuYmYiOjE2MjQ5NzIzNTQsImV4cCI6MTYyNDk3MzI1NH0.041GgQ2eEYp7e6pq72DGw6evkI6FYzZROEmZeMUTzQM") ;
print(b)