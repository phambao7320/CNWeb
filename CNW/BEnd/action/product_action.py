import sqlite3

from ..models import product_model

class ProductAction:

    def __init__(self, db_connection) -> None:
        self.db_connection = db_connection

    def get_all(self):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = "SELECT * FROM Product "
        cursor.execute(sql)
        rows = list(cursor.fetchall())
        if len(rows) == 0:
            return 'Product not found', 404
        result = []
        for row in rows:
            product = product_model.Product(
                product_id    = row[0],
                product_name  = row[1],
                product_price = row[2],
                product_img   = row[3],
                product_note  = row[4],
                product_detail= row[5],
                product_video = row[6],
                product_tp    = row[7],
                product_sc    = row[8],
                product_th    = row[9]
            )
            result.append(product.serialize())
        return result



    def get_by_id(self, id):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            SELECT * FROM Product WHERE product_Id = ?
        """
        cursor.execute(sql, (id, ))
        row = cursor.fetchone()
        if row == None:
            return 'Product not found', 404
        product = product_model.Product(
            product_id    = row[0],
            product_name  = row[1],
            product_price = row[2],
            product_img   = row[3],
            product_note  = row[4],
            product_detail= row[5],
            product_video = row[6],
            product_tp    = row[7],
            product_sc    = row[8],
            product_th    = row[9]
        )
        return product, 200

    def add(self, product: product_model.Product):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            INSERT INTO Product
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        cursor.execute(sql, (product.product_Id,product.product_Name,product.product_Price,product.product_Img,product.product_Note,product.product_Detail,product.product_Video,product.product_TP,product.product_SC,product.product_TH)) ;
        conn.commit()
        return 'Inserted successfully!'
    
    def delete(self, product: product_model.Product):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            DELETE FROM Product WHERE product_Id = ?
        """
        cursor.execute(sql, (product.product_Id,))
        conn.commit()
        count = cursor.rowcount
        if count == 0:
            return 'Product not found', 404
        return 'Deleted successfully', 200

    def update(self, id: int, product: product_model.Product):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            UPDATE Product
            SET product_Name = ?, product_Price = ?, product_Img = ? , product_Notes = ?,product_Details = ?,
            product_Video = ?, product_TP = ?, product_SC = ? , product_TH = ? 
            WHERE product_Id = ?
        """
        cursor.execute(sql, (product.product_Name,product.product_Price,product.product_Img,product.product_Note,
            product.product_Detail,product.product_Video,product.product_TP,product.product_SC,product.product_TH,id))
        conn.commit()
        n = cursor.rowcount
        if n == 0:
            return 'Product not found', 404
        return 'Updated successfully', 200