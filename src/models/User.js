/* eslint-disable camelcase,prefer-const */
import { Model } from 'js-abstract-model'
// import API_ADDRESS from '../api/Addresses'

class User extends Model {
  constructor (data) {
    super(data, [
      // {
      //   key: 'baseRoute',
      //   default: API_ADDRESS.user.base
      // },
      { key: 'id' },
      { key: 'user_id' },
      { key: 'creation_time' },
      { key: 'email' },
      { key: 'email_verified' },
      { key: 'failed_login_attempts' },
      { key: 'groups' },
      { key: 'is_active' },
      { key: 'is_delete' },
      { key: 'is_locked_out' },
      { key: 'is_superuser' },
      { key: 'last_login' },
      { key: 'last_modification_time' },
      { key: 'lockout_end_date' },
      { key: 'mobile_number' },
      { key: 'mobile_number_verified' },
      { key: 'national_code' },
      { key: 'nickname' },
      { key: 'father_name' },
      { key: 'password' },
      { key: 'phone_number' },
      { key: 'phone_number_verified' },
      { key: 'potential_dates' },
      { key: 'roles' },
      { key: 'gender' },
      { key: 'marital_status' },
      { key: 'address' },
      { key: 'moballegh_info' },
      { key: 'user_permissions' }

    ])

    if (this.user_id !== null) {
      this.id = this.user_id
    }
  }

  hasRole (targetName) {
    if (!this.roles) {
      return false
    }
    return !!this.roles.find(role => role.name === targetName)
  }

  isSuperUser () {
    return this.hasRole('superuser')
  }
}

export { User }
