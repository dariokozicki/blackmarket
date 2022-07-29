import { Role } from '@roles/models/enums/role.enum';

describe('Role Enum', () => {
  it('matches', () => {
    expect(Role.Admin).toBe('admin');
    expect(Role.User).toBe('user');
  });
});
