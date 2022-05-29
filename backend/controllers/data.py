from models.conn import MongoDB
def save_data(collectiton_name,data):
    db = MongoDB()
    db.insert_data(collectiton_name,data)

def get_all_data(collectiton_name):
    db = MongoDB()
    data = db.get_all_data(collectiton_name)
    temp =list()
    for d in data:
        del d['_id']
        temp.append(d)
    return temp

