"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = require("../../controllers/thoughtController");
const router = (0, express_1.Router)();
router.route('/')
    .get(thoughtController_1.getThoughts)
    .post(thoughtController_1.createThought);
router.route('/:thoughtId')
    .get(thoughtController_1.getSingleThought)
    .put(thoughtController_1.updateThought)
    .delete(thoughtController_1.deleteThought);
router.route('/:thoughtId/reactions')
    .post(thoughtController_1.addReaction);
router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController_1.removeReaction);
exports.default = router;
