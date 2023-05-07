class UserProfileDto {
  constructor({ email, _id, projects }) {
    this.email = email;
    this._id = _id;
    this.projects = projects;
  }
}

module.exports = UserProfileDto;
