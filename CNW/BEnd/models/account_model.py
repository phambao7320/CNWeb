class Account:
    
    def __init__(self, accname = '', accpass = '', accpos= '', accmail = ''):
        self.acc_Name     = accname
        self.acc_Pass     = accpass
        self.acc_Pos      = accpos
        self.acc_Email    = accmail

    def serialize(self):
        return {
            'ac_Name': self.acc_Name,
            'ac_Position': self.acc_Pos
        }