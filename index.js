"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsOfAge23 = exports.usersOfAge23 = exports.persons = void 0;
exports.logPerson = logPerson;
exports.filterPersons = filterPersons;
exports.persons = [
    { type: 'user', name: 'James', age: 20, occupation: 'janitor' },
    { type: 'admin', name: 'Mary', age: 35, role: 'Administrator' },
    { type: 'user', name: 'Eze', age: 23, occupation: 'teacher' },
    { type: 'admin', name: 'Bernad', age: 60, role: 'realtor' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'foot-Ball' },
    { type: 'admin', name: 'Agnes', age: 23, role: 'engineer' },
    { type: 'user', name: 'Henry', age: 25, occupation: 'hair-dresser' },
    { type: 'admin', name: 'Obi', age: 28, role: 'business' }
];
function logPerson(person) {
    console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(person.type === 'admin' ? person.role : person.occupation));
}
function filterPersons(persons, personType, criteria) {
    return persons
        .filter(function (person) { return person.type === personType; })
        .filter(function (person) {
        for (var key in criteria) {
            if (criteria.hasOwnProperty(key)) {
                if (personType === 'user') {
                    var userCriteria = criteria; // Type assertion for User
                    var user = person; // Type assertion for User
                    if (user[key] !== userCriteria[key]) {
                        return false;
                    }
                }
                else { // Must be admin
                    var adminCriteria = criteria; // Type assertion for Admin
                    var admin = person; // Type assertion for Admin
                    if (admin[key] !== adminCriteria[key]) {
                        return false;
                    }
                }
            }
        }
        return true;
    });
}
// Example:
var partialUsers = [
    { name: "nnenna", age: 30 },
    { name: "Boby" },
    { age: 25 },
    { name: "Charlie", age: 35 },
];
exports.usersOfAge23 = filterPersons(exports.persons, 'user', { age: 23 });
exports.adminsOfAge23 = filterPersons(exports.persons, 'admin', { age: 23 });
console.log('Users of age 23:');
exports.usersOfAge23.forEach(logPerson);
console.log();
console.log('Admins of age 23:');
exports.adminsOfAge23.forEach(logPerson);
