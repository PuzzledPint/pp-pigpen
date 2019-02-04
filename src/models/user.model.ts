export class User {
  private roles: Roles[] = new Array<Roles>();

  hasRole(role: Roles): boolean {
    return this.roles.includes(role);
    }

  addRole(role: Roles) {
    this.roles.push(role);
  }
}
