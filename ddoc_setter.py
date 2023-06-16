import os
import logging
import json

from ibm_cloud_sdk_core import ApiException
from ibmcloudant.cloudant_v1 import CloudantV1, Document

logging.basicConfig(level=logging.CRITICAL)

def viewAttendingGuests():
    client = CloudantV1.new_instance(service_name='CLOUDANT')
    db = "test_wedding"

    try:
        put_database_result = client.put_database(db=db).get_result()
        if put_database_result['ok']:
            print(f"{db} database successfully created")
    except ApiException as ae:
        if ae.code == 412:
            print(f"Cannot create database {db}; it already exists")

    ddoc = client.get_design_document(db=db, ddoc="test1").get_result()
    ddoc["views"]["my_filter"]["map"] = "function(doc) {if(doc.guest_group != 'NOT ATTENDING') { emit(doc.guest_code, {name:doc.name, guest_count:doc.guest_count, sub_list:doc.sub_list, guest_group:doc.guest_group, seating_zone:doc.seating_zone});}}"
    client.post_document(db=db, document=ddoc)

    return json.dumps(ddoc, indent=2)

# next comes making a set of classes/functions that serve API calls.
# One call for a specific ddoc. Perhaps we can even pass in arguments to the ddoc

if __name__ == "__main__":
    print(viewAttendingGuests())