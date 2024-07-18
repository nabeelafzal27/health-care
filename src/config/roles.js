const allRoles = {
  user: ["getPatients", "managePatients"],
  admin: ["getUsers", "manageUsers", "getPatients", "managePatients"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
