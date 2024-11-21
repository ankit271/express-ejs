# Express.js MVC Naming Conventions

### Models : 

- Use singular, PascalCase naming
- Append "Model" to the end (optional)

```javascript
// models/User.js or models/UserModel.js
const User = mongoose.model('User', userSchema);

// models/Product.js or models/ProductModel.js
const Product = mongoose.model('Product', productSchema);
```

### Controllers : 

- Use plural, PascalCase naming
- Append "Controller" to the end

```javascript
// controllers/UsersController.js
class UsersController {
    index(req, res) { }
    show(req, res) { }
    create(req, res) { }
    update(req, res) { }
    delete(req, res) { }
}

// controllers/ProductsController.js
class ProductsController {
    // controller methods
}
```

### Routes : 

- Use plural, lowercase naming
- Group related routes

```javascript
// routes/users.js
const router = express.Router();
router.get('/', usersController.index);
router.get('/:id', usersController.show);
router.post('/', usersController.create);

// routes/products.js
const router = express.Router();
router.get('/', productsController.index);
```

### Views (if using template engines): 

- Use lowercase with hyphens
- Group in folders by feature
```javascript
views/
  users/
    index.ejs
    show.ejs
    edit.ejs
  products/
    index.ejs
    show.ejs
```

### Method Naming in Controllers :
```javascript
class UsersController {
    // GET /users
    index(req, res) { }
    
    // GET /users/:id
    show(req, res) { }
    
    // GET /users/create
    create(req, res) { }
    
    // POST /users
    store(req, res) { }
    
    // GET /users/:id/edit
    edit(req, res) { }
    
    // PUT /users/:id
    update(req, res) { }
    
    // DELETE /users/:id
    destroy(req, res) { }
}
```
## Directory Structure :

```javascript
project/
  ├── src/
  │   ├── models/
  │   │   ├── User.js
  │   │   └── Product.js
  │   ├── controllers/
  │   │   ├── UsersController.js
  │   │   └── ProductsController.js
  │   ├── routes/
  │   │   ├── users.js
  │   │   └── products.js
  │   ├── views/
  │   │   ├── users/
  │   │   └── products/
  │   ├── config/
  │   │   └── database.js
  │   └── utils/
  │       └── helpers.js
  ├── app.js
  └── package.json
```