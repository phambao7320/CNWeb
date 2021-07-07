class User:
    
    def __init__(self, user_id=0, username='', password='', position='',email=''):
        self.user_Id = user_id
        self.user_Name = username
        self.user_Pass = password
        self.user_Position = position
        self.user_Email = email

    def serialize(self):
        return {
            'user_Id'       : self.user_Id,
            'user_Name'     : self.user_Name,
            'user_Pass'     : self.user_Pass,
            'user_Position' : self.user_Position,
            'user_Email'    : self.user_Email
        }