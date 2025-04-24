"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const router = (0, express_1.Router)();
router.route('/')
    .get(userController_1.getUsers)
    .post(userController_1.createUser);
router.route('/:userId')
    .get(userController_1.getSingleUser)
    .put(userController_1.updateUser)
    .delete(userController_1.deleteUser);
router.route('/:userId/friends/:friendId')
    .post(userController_1.addFriend)
    .delete(userController_1.removeFriend);
exports.default = router;
