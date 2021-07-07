class Product:
    
    def __init__(self,product_id=0,product_name='',product_note ='',product_img='',product_price= 0,
            product_detail='',product_video = '',product_tp = '', product_sc = '' , product_th = ''):

        self.product_Id     = product_id
        self.product_Name   = product_name
        self.product_Note   = product_note
        self.product_Img    = product_img
        self.product_Price  = product_price
        self.product_Detail = product_detail
        self.product_Video  = product_video
        self.product_TP     = product_tp
        self.product_SC     = product_sc
        self.product_TH     = product_th


    def serialize(self):
        return {
            'product_Id'    : self.product_Id,
            'product_Name'  : self.product_Name,
            'product_Note'  : self.product_Note,
            'product_Img'   : self.product_Img,
            'product_Price' : self.product_Price,
            'product_Detail': self.product_Detail,
            'product_Video' : self.product_Video,
            'product_TP'    : self.product_TP,
            'product_SC'    : self.product_SC,
            'product_TH'    : self.product_TH
        }