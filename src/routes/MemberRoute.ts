import MemberController from "../controllers/MemberConroller";
import * as express from 'express'

const member = new MemberController()

let router = express.Router()

// displaya all members
router.get('/', member.getAll)

// display member by id
router.get('/:memberId',member.getOne)

// create new member
router.post('/', member.create)

// deleteby id
router.delete('/delete_member/:memberId',member.deleteById)

// update  telephone
router.patch('/update_member/:memberId', member.updateMemberInfo)

module.exports = router;


