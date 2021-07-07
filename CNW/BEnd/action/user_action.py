import sqlite3
from hashlib import md5

from ..models import user_model

class UserAction:

    def __init__(self, db_connection):
        self.db_connection = db_connection

    
    def get_all(self):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = "SELECT * FROM User "
        cursor.execute(sql)
        rows = list(cursor.fetchall())
        if len(rows) == 0:
            return 'Users is empty', 404
        result = []
        for row in rows:
            user = user_model.User(
                user_id  =  row[0],
                username =  row[1],
                password =  row[2],
                position =  row[3],
                email    =  row[4]
            )
            result.append(user.serialize())
        return result

    def get_by_id(self, id):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            SELECT * FROM User WHERE user_Id = ?
        """
        cursor.execute(sql, (id, ))
        row = cursor.fetchone()
        if row == None:
            return 'User not found', 404
        user = user_model.User(
            user_id  = row[0],
            username = row[1],
            password = row[2],
            position = row[3],
            email    = row[4]
        )
        return user, 200

    def add(self, user: user_model.User):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            INSERT INTO User
            VALUES(?, ?, ?, ?, ?)
        """
        cursor.execute(sql, (user.user_Id,user.user_Name,user.user_Pass,user.user_Position,user.user_Email))
        conn.commit()
        return 'Inserted successfully!'
    
    def delete(self, user: user_model.User):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            DELETE FROM User WHERE user_Id = ?
        """
        cursor.execute(sql, (user.user_Id,))
        conn.commit()
        count = cursor.rowcount
        if count == 0:
            return 'User not found', 404
        return 'Deleted successfully', 200

    def update(self, id: int, user: user_model.User):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            UPDATE User
            SET user_Name = ?, user_Pass = ?, user_Position = ?, user_Email = ?
            WHERE user_Id = ?
        """
        cursor.execute(sql, (user.user_Name,user.user_Pass,user.user_Position,user.user_Email,id))
        conn.commit()
        n = cursor.rowcount
        if n == 0:
            return 'User not found', 404
        return 'Updated successfully', 200
