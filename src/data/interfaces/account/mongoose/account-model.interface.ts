import { Model } from "mongoose"
import AccountDocument from "./account-document.inteface"

export default interface AccountModel extends Model<AccountDocument> {
}