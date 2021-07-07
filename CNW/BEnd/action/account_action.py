import sqlite3
from hashlib import md5

from ..models import account_model

class AccountAction:

    def __init__(self, db_connection):
        self.db_connection = db_connection
    
    def login(self, account: account_model.Account):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            SELECT *
            FROM User
            WHERE user_Name LIKE ? AND user_Pass LIKE ?
        """
        #hashed = md5(user.user_Pass.encode).hexdigest()
        cursor.execute(sql, (account.acc_Name,account.acc_Pass))
        row = cursor.fetchone()
        if row == None:
            return 'Invalid username or password', 401
        
        authenticated_user = account_model.Account(
            accname = row[1],
            accpos  = row[3]
        )
        return authenticated_user, 200
    
    def resetpass(self, account: account_model.Account):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            UPDATE User
            SET user_Pass = ?
            WHERE user_Name = ? and user_Email = ?
        """
        #hashed = md5(user.user_Pass.encode).hexdigest()
        cursor.execute(sql,(account.acc_Pass,account.acc_Name,account.acc_Email))
        conn.commit()
        row = cursor.rowcount
        if row == 0:
            return "Not found Account", 404
        return 'Reset Password successfully', 200
