from .models.customer_model import Customer
from .action.customer_action import CustomerAction
from .models.employee_model import Employee
from .action.employee_action import EmployeeAction
from .models.product_model import Product
from .action.product_action import ProductAction
from .models.user_model import User
from .action.user_action import UserAction
from .models.account_model import Account
from .action.account_action import AccountAction

from flask import Flask, json
from flask import jsonify
from flask import request
from flask import send_file,Response
from time import time

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'phambao7320'
jwt = JWTManager(app)

connection_data = './ListDB.db'

# Customer
@app.route('/customers')
@jwt_required()
def get_customers():            # lấy ra thông tin danh sách tất cả khách hàng
    current_user = get_jwt_identity()
    if current_user['ac_Position'] in ['Admin','Employee']:

        customer_actions = CustomerAction(connection_data)
        result = customer_actions.get_all()
        
        return jsonify(result),200,{'Content-Range':len(result),'Access-Control-Expose-Headers':'Content-Range'}
    else:
        return jsonify({
            'message' : 'You dont have permission'
        }),403

@app.route('/customer/<int:id>', methods=['GET','PUT','DELETE'])
@jwt_required()
def get_customer(id):
    current_user = get_jwt_identity()
    if current_user['ac_Position'] in ['Admin','Employee']:
        if request.method == 'GET':        # lấy ra thông tin 1 khách hàng tham số truyền vào id
            customer_actions = CustomerAction(connection_data)
            result, status_code = customer_actions.get_by_id(id)
            if status_code == 200:
                return jsonify(result.serialize()), status_code,{'Content-Range':1,'Access-Control-Expose-Headers':'Content-Range'}
            return jsonify({
                'message': result
            }), status_code
        elif request.method == 'PUT':       # sửa
            body = request.json

            customer_Id = body.get('customer_Id','')
            customer_Name = body.get('customer_Name', '')
            customer_Address = body.get('customer_Address', '')
            customer_Phone = body.get('customer_Phone', '')

            customer = Customer(customer_id=customer_Id,customer_name=customer_Name,customer_address=customer_Address,customer_phone=customer_Phone)
            customer_action = CustomerAction(connection_data)
            message, status_code = customer_action.update(id, customer)
            return jsonify({
                'message': message
            }), status_code
        elif request.method == 'DELETE':      #xóa
            customer = Customer(customer_id=id)
            customer_action = CustomerAction(connection_data)
            message, status_code = customer_action.delete(customer)
            return jsonify({
                'message': message
            }), status_code
        else:
            pass
    else:
        return jsonify({
            'message' : 'You dont have permission'
        }),403

@app.route('/customer', methods=['POST'])
def add_customer():  # thêm khách hàng, có thể dùng cho phần đăng kí tài khoản khách hàng
    # Get data from request body
    body = request.json

    customer_Id = body.get('customer_Id', '')
    customer_Name = body.get('customer_Name', '')
    customer_Address = body.get('customer_Address', '')
    customer_Phone = body.get('customer_Phone', '')

    customer = Customer(customer_id=customer_Id,customer_name=customer_Name,customer_address=customer_Address,customer_phone=customer_Phone)
    customer_actions = CustomerAction(connection_data)
    result = customer_actions.add(customer)
    return jsonify({
        'message': result
    }), 201

#----------------------------------------------------------------------------------------
@app.route('/employees')            #show list nhân viên
@jwt_required()
def get_employees():
    current_user = get_jwt_identity()
    if current_user['ac_Position'] == 'Admin':   #chỉ cho phép admin show list nhân viên
        employee_actions = EmployeeAction(connection_data)
        result = employee_actions.get_all()
        return jsonify(result)
    else:
        return jsonify({
            'message' : 'You dont have permission'
        }),403

@app.route('/employee/<int:id>', methods=['GET','PUT','DELETE'])
@jwt_required()
def get_employee(id):                   # quản lí nhân viên
    current_user = get_jwt_identity()
    if current_user['ac_Position'] == 'Admin': #chỉ cho phép admin quản lí nhân viên
        if request.method == 'GET':
            employee_actions = EmployeeAction(connection_data)
            result, status_code = employee_actions.get_by_id(id)
            if status_code == 200:
                return jsonify(result.serialize()), status_code
            return jsonify({
                'message': result
            }), status_code
        elif request.method == 'PUT':
            body = request.json

            employee_Name = body.get('employee_Name', '')
            employee_Address = body.get('employee_Address', '')
            employee_Phone = body.get('employee_Phone', '')

            employee = Employee(employee_name=employee_Name,employee_address=employee_Address,employee_phone=employee_Phone)
            employee_actions = EmployeeAction(connection_data)
            message, status_code = employee_actions.update(id, employee)
            return jsonify({
                'message': message
            }), status_code
        elif request.method == 'DELETE':
            employee = Employee(employee_id=id)
            employee_actions = EmployeeAction(connection_data)
            message, status_code = employee_actions.delete(employee)
            return jsonify({
                'message': message
            }), status_code
        else:
            pass
    else:
        return jsonify({
            'message' : 'You dont have permission'
        }),403

@app.route('/employee', methods=['POST'])
@jwt_required()
def add_employee():                                 # thêm nhân viên
    current_user = get_jwt_identity()
    if current_user['ac_Position'] == 'Admin':      #chỉ cho phép admin thêm nhân viên
        body = request.json

        employee_ID = body.get('employee_Id', '')
        employee_Name = body.get('employee_Name', '')
        employee_Address = body.get('employee_Address', '')
        employee_Phone = body.get('employee_Phone', '')

        employee = Employee(employee_id =employee_ID,employee_name=employee_Name,employee_address=employee_Address,employee_phone=employee_Phone)
        employee_actions = EmployeeAction(connection_data)
        result = employee_actions.add(employee)
        return jsonify({
            'message': result
        }), 201
    else:
        return jsonify({
            'message' : 'You dont have permission'
        }),403


#-------------------------------------------------------------------------------------------------
#Product
@app.route('/products')                     # show danh sách sản phẩm
def get_products():     
    product_actions = ProductAction(connection_data)
    result = product_actions.get_all()
    return jsonify(result)

@app.route('/productget/<int:id>')                     # show danh sách sản phẩm
def get_product(id):     
    product_actions = ProductAction(connection_data)
    result, status_code = product_actions.get_by_id(id)
    if status_code == 200:
        return jsonify(result.serialize()), status_code
    return jsonify({
        'message': result
    }), status_code

@app.route('/product/<int:id>', methods=['PUT','DELETE'])
# @jwt_required()
def set_product(id):
        if request.method == 'PUT':
            body = request.json

            product_Name    = body.get('product_Name','')
            product_Price   = body.get('product_Price','')
            product_Img     = body.get('product_Img','')
            product_Note    = body.get('product_Note','')
            product_Detail  = body.get('product_Detail','')
            product_Video   = body.get('product_Video','')
            product_TP      = body.get('product_TP','') 
            product_SC      = body.get('product_SC','')
            product_TH      = body.get('product_TH','')

            product = Product(product_name=product_Name,product_price=product_Price,product_img=product_Img,product_note=product_Note,
                product_detail=product_Detail,product_video=product_Video,product_tp=product_TP,product_sc=product_SC,product_th=product_TH)
            product_actions = ProductAction(connection_data)
            message, status_code = product_actions.update(id, product)
            return jsonify({
                'message': message
            }), status_code
        elif request.method == 'DELETE':
            product = Product(product_id=id)
            product_actions = ProductAction(connection_data)
            message, status_code = product_actions.delete(product)
            return jsonify({
                'message': message
            }), status_code
        else: 
            pass
    # else:
    #     return jsonify({
    #         'message' : 'You dont have permission'
    #     }),403

@app.route('/product', methods=['POST'])
@jwt_required()         # chỉ cho phép admin hoặc employee thêm sản phẩm
def add_product():
    # current_user = get_jwt_identity()
    # if current_user['ac_Position'] in ['Admin','Employee']:
        body = request.json

        product_Id      = body.get('product_Id','')
        product_Name    = body.get('product_Name','')
        product_Price   = body.get('product_Price','')
        product_Img     = body.get('product_Img','')
        product_Note    = body.get('product_Note','')
        product_Detail  = body.get('product_Detail','')
        product_Video   = body.get('product_Video','')
        product_TP      = body.get('product_TP','') 
        product_SC      = body.get('product_SC','')
        product_TH      = body.get('product_TH','')

        product = Product(product_id=product_Id,product_name=product_Name,product_price=product_Price,product_img=product_Img,product_note=product_Note,
                product_detail=product_Detail,product_video=product_Video,product_tp=product_TP,product_sc=product_SC,product_th=product_TH)
        product_tions = ProductAction(connection_data)
        result = product_tions.add(product)
        return jsonify({
            'message': result
        }), 201
    # else:
    #     return jsonify({
    #         'message' : 'You dont have permission'
    #     }),403

#------------------------------------------------------------------------------------------------
# User
@app.route('/users')            # Lấy ra thông tin danh sách users
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    if current_user['ac_Position'] == 'Admin':
        user_actions = UserAction(connection_data)
        result = user_actions.get_all()
        
        return jsonify(result),200,{'Content-Range':len(result),'Access-Control-Expose-Headers':'Content-Range'}
    else:
        return jsonify({
            'message' : 'You dont have permission'
        }),403

@app.route('/user/<int:id>', methods=['GET','PUT','DELETE'])        # Thao tác trên 1 user
@jwt_required()
def get_user(id):
    current_user = get_jwt_identity()
    if current_user['ac_Position'] == 'Admin':
        if request.method == 'GET':
            user_actions = UserAction(connection_data) ;
            result, status_code = user_actions.get_by_id(id)
            if status_code == 200:
                return jsonify(result.serialize()), status_code,{'Content-Range':1,'Access-Control-Expose-Headers':'Content-Range'}
            return jsonify({
                'message': result
            }), status_code
        elif request.method == 'PUT':
            body = request.json
            user_Id       = body.get('user_Id','')
            user_Name     = body.get('user_Name', '')
            user_Pass     = body.get('user_Pass', '')
            user_Position = body.get('user_Position', '')
            user_Email    = body.get('user_Email','')

            user = User(user_id=user_Id,username=user_Name,password=user_Pass,position=user_Position,email=user_Email)    
            user_actions = UserAction(connection_data)
            message, status_code = user_actions.update(id, user)
            return jsonify({
                'message': message
            }), status_code
        elif request.method == 'DELETE':      #xóa
            user = User(user_id=id)
            user_actions = UserAction(connection_data)
            message, status_code = user_actions.delete(user)
            return jsonify({
                'message': message
            }), status_code
        else:  pass
    else:
        return jsonify({
            'message' : 'You dont have permission'
        }),403

@app.route('/user', methods=['POST'])           # Tạo mới 1 user
@jwt_required()
def add_user():
    current_user = get_jwt_identity()
    if current_user['ac_Position'] == 'Admin':
        body = request.json
        user_Id       = body.get('user_Id','')
        user_Name     = body.get('user_Name', '')
        user_Pass     = body.get('user_Pass', '')
        user_Position = body.get('user_Position', '')
        user_Email    = body.get('user_Email','')

        user = User(user_id=user_Id,username=user_Name,password=user_Pass,position=user_Position,email=user_Email)    
        user_actions = UserAction(connection_data)
        result = user_actions.add(user)
        return jsonify({
            'message': result
        }), 201
    else:
        return jsonify({
            'message' : 'You dont have permission'
        }),403

#---------------------------------------------------------------------------------------------------
@app.route('/login', methods=['POST'])          # đăng nhập
def login():
    body = request.json

    username = body.get('username', None)
    password = body.get('password', None)
    
    if username == None or password is None:
        return jsonify({
            'message': 'Missing username or password'
        }), 400
    account_actions = AccountAction(connection_data)
    result,status_code = account_actions.login(Account(accname=username,accpass=password))
    if status_code != 200:
        return jsonify({
            'message': result
        }), status_code
    access_token = create_access_token(identity=result.serialize())
    print(result)
    return jsonify({
        'token': access_token
    })

@app.route('/resetpass', methods=['PUT'])           #reset pass
def reset():
    body = request.json

    username = body.get('username', None)
    password = body.get('pass', None)
    email    = body.get('email', None)
    
    if username == None or password is None or email is None:
        return jsonify({
            'message': 'Missing username or password or email'
        }), 400
    account = Account(accname=username,accpass=password,accmail=email) ;
    account_actions = AccountAction(connection_data)
    result,status_code = account_actions.resetpass(account) ;
    return jsonify({
        'message': result
    }), status_code
    