import MemberController from "../controllers/MemberConroller";
import * as express from 'express'
import {check} from 'express-validator'

const member = new MemberController()

let router = express.Router()

router.post(
    '/login',
    [
        check('telephone', 'telephone number is required').not().isEmpty(),
        check('password', 'member password  is required').not().isEmpty(),
    ],
    member.memberLogin
    )

// displaya all members
router.get('/', member.getAll)

// display member by id
router.get('/:memberId',member.getOne)

// create new member
router.post(
    '/',
    [
        check('firstName', 'first Name number is required it can not be empty').not().isEmpty(),
        check('lastName', 'last Name number is required').not().isEmpty(),
        check('telephone', 'telephone number is required').not().isEmpty(),
        check('password', 'password number is required').not().isEmpty(),
    ],
    member.create
 )

// deleteby id
router.delete('/delete_member/:memberId',member.deleteById)

// update  telephone
router.patch(
    '/update_member/:memberId',
    [
        check('telephone', 'telephone number is required').not().isEmpty()        
    ], 
    member.updateMemberInfo)

// activate or disactivate member
router.patch(
    '/setMemberStatus/:memberId',
    [
        check('isActive', 'isActive field can not be empty').not().isEmpty()
    ],
    member.updateStatus
    )

module.exports = router;


