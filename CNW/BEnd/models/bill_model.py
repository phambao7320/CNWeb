from . import customer_model
from . import employee_model
from . import product_model

class Bill:
    
    def __init__(self, bill_id=0, customer: customer_model.Customer = None, employee: employee_model.Employee = None, order_date='',product: product_model.Product = None):
        self.bill_Id = bill_id
        self.customer = customer
        self.employee = employee
        self.product = product
        self.order_date = order_date

    def serialize(self):
        return {
            'bill_id': self.bill_Id,
            'customer': self.customer.serialize(),
            'employee': self.employee.serialize(),
            'product': self.product.serialize(),
            'order_date': self.order_date
        }