import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../types.js';

// Key for metadata
export const ROLES_KEY = 'roles';

// Custom decorator
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
