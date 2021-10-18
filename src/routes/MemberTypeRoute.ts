import MemberTypeController from "../controllers/MemberTypeController";
import * as express from 'express'
import {check} from 'express-validator'

const MemberType = new MemberTypeController()

let router = express.Router()


// displaya all member type
router.get('/', MemberType.getAll)

// display member type by id
router.get('/:memberTypeId',MemberType.getOne)

module.exports = router;


