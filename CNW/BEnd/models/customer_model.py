
class Customer:
    
    def __init__(self,customer_id=0, customer_name='', customer_address= '', customer_phone=''):
        self.customer_Id = customer_id
        self.customer_Name = customer_name
        self.customer_Address = customer_address
        self.customer_Phone = customer_phone

    def serialize(self):
        return {
            'id': self.customer_Id,
            'cs_Name': self.customer_Name,
            'cs_Add': self.customer_Address,
            'cs_Phone': self.customer_Phone
        }