export const BIRTHDATE = new Date('1996-01-11'); 

export function getAge(birthdate: Date = BIRTHDATE, today: Date = new Date()): number {
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
}
