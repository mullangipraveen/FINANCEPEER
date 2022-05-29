from tkinter import SEL_FIRST
from config.constants import MONGO_CONN_STRING,MONDO_DB
import pymongo
class MongoDB:
    def __init__(self):
        self.client = pymongo.MongoClient(MONGO_CONN_STRING)
        self.db = MONDO_DB
    
    def insert_data(self, colletion_name,data):
        self.client[MONDO_DB][colletion_name].insert_one(data)

    def get_data(self, colletion_name, find={}):
        return self.client[MONDO_DB][colletion_name].find_one(find)
    def get_all_data(self, colletion_name):
        return self.client[MONDO_DB][colletion_name].find({})


