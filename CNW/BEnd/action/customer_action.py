import sqlite3

from ..models import customer_model

class CustomerAction:

    def __init__(self, db_connection) -> None:
        self.db_connection = db_connection

    def get_all(self):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = "SELECT * FROM Customer "
        cursor.execute(sql)
        rows = list(cursor.fetchall())
        if len(rows) == 0:
            return 'Customer not found', 404
        result = []
        for row in rows:
            customer = customer_model.Customer(
                customer_id = row[0],
                customer_name = row[1],
                customer_address = row[2],
                customer_phone = row[3]
            )
            result.append(customer.serialize())
        return result



    def get_by_id(self, id):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            SELECT * FROM Customer WHERE customer_Id = ?
        """
        cursor.execute(sql, (id, ))
        row = cursor.fetchone()
        if row == None:
            return 'Customer not found', 404
        customer = customer_model.Customer(
            customer_id=row[0],
            customer_name=row[1],
            customer_address=row[2],
            customer_phone=row[3]
        )
        return customer, 200

    def add(self, customer: customer_model.Customer):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            INSERT INTO Customer
            VALUES(?, ?, ?, ?)
        """
        cursor.execute(sql, (10,customer.customer_Name,customer.customer_Address, customer.customer_Phone))
        conn.commit()
        return 'Inserted successfully!'
    
    def delete(self, customer: customer_model.Customer):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            DELETE FROM Customer WHERE customer_Id = ?
        """
        cursor.execute(sql, (customer.customer_Id,))
        conn.commit()
        count = cursor.rowcount
        if count == 0:
            return 'Customer not found', 404
        return 'Deleted successfully', 200

    def update(self, id: int, customer: customer_model.Customer):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            UPDATE Customer
            SET customer_Name = ?, customer_Address = ?, customer_Phone = ?
            WHERE customer_Id = ?
        """
        cursor.execute(sql, (customer.customer_Name, customer.customer_Address,customer.customer_Phone,id))
        conn.commit()
        n = cursor.rowcount
        if n == 0:
            return 'Customer not found', 404
        return 'Updated successfully', 200