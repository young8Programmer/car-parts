// installation qo'llanmasi yaratildi
// bundle size optimallashtirildi
import { SetMetadata } from '@nestjs/common';

// ESLint qoidalariga moslashtirish
// type error tuzatildi
// bundle size optimallashtirildi
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
// changelog yangilandi
