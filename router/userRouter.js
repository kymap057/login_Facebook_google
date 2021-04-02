const router = require('express').Router();
const userController = require('../controller/uerController');

router.get('/:id',userController.getUser);
router.get('/',userController.getAllUser);
router.post('/',userController.create);
router.post('/login',userController.login);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

module.exports=router;