import { Item } from "@prisma/client";
export function generateDailyStory(
  items: Item[],
  count = 3
) {
  if (!items || items.length === 0) return null;

  const today = new Date().toISOString().slice(0, 10);

  const shuffled = [...items].sort((a, b) => {
    const ha = hash(today + a.id);
    const hb = hash(today + b.id);
    return ha - hb;
  });

  const selected = shuffled.slice(0, count);

  return {
    title: "დღის რეკომენდაცია",
    items: selected,
  };
}

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

