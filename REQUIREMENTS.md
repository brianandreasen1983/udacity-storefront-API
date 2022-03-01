# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
    Orders
    app.get('/orders, index)
    app.get('/orders/:userid', currentOrderByUserId, verifyAuthToken) -- requires token
    app.post('/orders, create)
    
    Products
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products',verifyAuthToken, create) -- requires token

    Users
    app.get('/users', verifyAuthToken, index) -- requires token
    app.get('/users/:id', verifyAuthToken, show) -- requires token
    app.post('/users', create)

#### Products
- Index
- Show
- Create [token required]

#### Users
- Index [token required]
- Show [token required]
- Create

#### Orders
- Current Order by user (args: user id)[token required] 

## Data Shapes
#### Product
-  id 
- name 
- price

#### User
- id
- firstname
- lastname
- password

#### Orders
- id
- id of each product in the order (product_id)
- quantity of each product in the order (quantity)
- user_id
- status of order (active or complete) (status)