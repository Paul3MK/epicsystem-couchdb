# this worker is responsible for loading data into CouchDB/Cloudant

from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

import pycouchdb

from dotenv import load_dotenv
load_dotenv()
import os

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# The ID and range of our spreadsheet.
SPREADSHEET_ID = '1YVoURw84AkP_G0VUtRA3vQqB-8MJX9acGtEgCANgDlU'
RANGE_NAME = 'TM Master Guest Data!b6:s882'


def main():
    """Grabs all entries from the master guest list.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('sheets', 'v4', credentials=creds)

        # Call the Sheets API
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=SPREADSHEET_ID,range=RANGE_NAME).execute()
        values = result.get('values', [])

        if not values:
            print('No data found.')
            return

        print('Guest Code, Name, Guest Count, Sub_List, Guest Group, Seating Zone')
        for row in values:
            # Print columns B, C, J, M, N, S which correspond to indices 0, 1, 8, 11, 12, 17.
            print('%s, %s, %s, %s, %s, %s' % (row[0], row[1], row[8], row[11], row[12], row[17]))
        return values
    except HttpError as err:
        print(err)

def dbLoader(data):
    """this function loads the data into couchDB
    """
    user = os.getenv("LOCAL_COUCHDB_USERNAME")
    pw = os.getenv("LOCAL_COUCHDB_PASSWORD")
    # we first want to connect to the database
    server = pycouchdb.Server(f"http://{user}:{pw}@localhost:5984/")

    # create the right database
    try:
        server.create("test_wedding")
    except Exception as e:
        print("Database test_wedding not created; already exists.")
    # then try to insert all relevant data
    try:
        db = server.database("test_wedding")
        for row in data:
            db.save({
                "guest_code": str(row[0]),
                "name": str(row[1]),
                "guest_count":str(row[8]),
                "sub_list":str(row[11]),
                "guest_group":str(row[12]),
                "seating_zone":str(row[17])
            })
    except Exception as e:
        print(f"Error with db script: {e}")
    # figure upsert later. seems like searching before updating makes the most sense, due to revision numbers

if __name__ == '__main__':
    data = main()
    dbLoader(data)