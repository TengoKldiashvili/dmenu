// types/menu.ts
import { Prisma } from "@prisma/client";

export type PublicMenu = Prisma.MenuGetPayload<{
  include: {
    categories: {
      include: {
        items: true;
      };
    };
  };
}>;
