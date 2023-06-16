# we're making a REST API. Perhaps gRPC is better. We'll see.

from flask import Flask
from flask_cors import CORS
import os
import logging

from ibm_cloud_sdk_core import ApiException
from ibmcloudant.cloudant_v1 import CloudantV1, Document

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET','POST'])
def welcome():
    return "Hello World";

@app.route('/api/attending_guests', methods=['GET', 'POST'])
def getAttending():
    """Gets all attending guests by querying the relevant view (here it's my_filter)
    """
    client = CloudantV1.new_instance(service_name='CLOUDANT')
    try:
        db = "test_wedding"
        return client.post_view(db=db, ddoc="test1", view="my_filter").get_result()
        
    except Exception as e:
        return f"Error with db script: {e}"

@app.route(f'/api/attending_guests/<code>', methods=['GET', 'POST'])
def getAttendingGuestInfo(code: str):
    """Gets attending guest info.
    """
    client = CloudantV1.new_instance(service_name='CLOUDANT')
    try:
        db = "test_wedding"
        print(code)
        print(type(code))
        res = client.post_view(db=db, ddoc="test1", view="my_filter", key=f"{code}").get_result()
        return res

    except Exception as e:
        return f"Error with db script: {e}"

# next comes making a set of classes/functions that serve API calls.
# One call for a specific ddoc. Perhaps we can even pass in arguments to the ddoc

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8005)