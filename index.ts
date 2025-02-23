interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  { type: 'user', name: 'James', age: 20, occupation: 'janitor' },
  { type: 'admin', name: 'Mary', age: 35, role: 'Administrator' },
  { type: 'user', name: 'Eze', age: 23, occupation: 'teacher' },
  { type: 'admin', name: 'Bernad', age: 60, role: 'realtor' },
  { type: 'user', name: 'Wilson', age: 23, occupation: 'foot-Ball' },
  { type: 'admin', name: 'Agnes', age: 23, role: 'engineer' },
  { type: 'user', name: 'Henry', age: 25, occupation: 'hair-dresser' },
  { type: 'admin', name: 'Obi', age: 28, role: 'business' }
];

export function logPerson(person: Person) {
  console.log(
      ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
  );
}

type UserCriteria = Omit<Partial<User>, 'type'>;
type AdminCriteria = Omit<Partial<Admin>, 'type'>;

export function filterPersons<T extends 'user' | 'admin'>(
  persons: Person[],
  personType: T,
  criteria: T extends 'user' ? UserCriteria : AdminCriteria
): (T extends 'user' ? User : Admin)[] {
  return persons
      .filter((person) => person.type === personType)
      .filter((person) => {
          for (const key in criteria) {
              if (criteria.hasOwnProperty(key)) {
                  if (personType === 'user') {
                      const userCriteria = criteria as UserCriteria; // Type assertion for User
                      const user = person as User;                // Type assertion for User
                      if (user[key as keyof User] !== userCriteria[key as keyof UserCriteria]) {
                          return false;
                      }
                  } else { // Must be admin
                      const adminCriteria = criteria as AdminCriteria; // Type assertion for Admin
                      const admin = person as Admin;                 // Type assertion for Admin
                      if (admin[key as keyof Admin] !== adminCriteria[key as keyof AdminCriteria]) {
                          return false;
                      }
                  }
              }
          }
          return true;
      }) as (T extends 'user' ? User : Admin)[];
}
// Example:
const partialUsers: UserCriteria[] = [
  { name: "nnenna", age: 30 },
  { name: "Boby" },
  { age: 25 },
  { name: "Charlie", age: 35 },
];

export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);