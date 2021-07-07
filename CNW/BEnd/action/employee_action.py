import sqlite3

from ..models import employee_model

class EmployeeAction:

    def __init__(self, db_connection) -> None:
        self.db_connection = db_connection

    def get_all(self):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = "SELECT * FROM Employee "
        cursor.execute(sql)
        rows = list(cursor.fetchall())
        if len(rows) == 0:
            return 'Employee not found', 404
        result = []
        for row in rows:
            employee = employee_model.Employee(
                employee_id = row[0],
                employee_name = row[1],
                employee_address = row[2],
                employee_phone = row[3]
            )
            result.append(employee.serialize())
        return result



    def get_by_id(self, id):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            SELECT * FROM employee WHERE employee_Id = ?
        """
        cursor.execute(sql, (id, ))
        row = cursor.fetchone()
        if row == None:
            return 'Employee not found', 404
        employee = employee_model.Employee(
            employee_id=row[0],
            employee_name=row[1],
            employee_address=row[2],
            employee_phone=row[3]
        )
        return employee, 200

    def add(self, employee: employee_model.Employee):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            INSERT INTO Employee
            VALUES(?, ?, ?, ?)
        """
        cursor.execute(sql, (employee.employee_Id,employee.employee_Name,employee.employee_Address, employee.employee_Phone))
        conn.commit()
        return 'Inserted successfully!'
    
    def delete(self, employee: employee_model.Employee):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            DELETE FROM Employee WHERE employee_Id = ?
        """
        cursor.execute(sql, (employee.employee_Id,))
        conn.commit()
        count = cursor.rowcount
        if count == 0:
            return 'Employee not found', 404
        return 'Deleted successfully', 200

    def update(self, id: int, employee: employee_model.Employee):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            UPDATE Employee
            SET employee_Name = ?, employee_Address = ?, employee_Phone = ?
            WHERE employee_Id = ?
        """
        cursor.execute(sql, (employee.employee_Name, employee.employee_Address,employee.employee_Phone,id))
        conn.commit()
        n = cursor.rowcount
        if n == 0:
            return 'Employee not found', 404
        return 'Updated successfully', 200