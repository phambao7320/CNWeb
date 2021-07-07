class Employee:
    
    def __init__(self, employee_id=0, employee_name = '',employee_address='',employee_phone = ''):
        self.employee_Id = employee_id
        self.employee_Name = employee_name
        self.employee_Address = employee_address
        self.employee_Phone = employee_phone

    def serialize(self):
        return {
            'Id': self.employee_Id,
            'employee_Name': self.employee_Name,
            'employee_Address': self.employee_Address,
            'employee_Phone': self.employee_Phone
        }