export default function isAdmin(test) {
  const admin1 = process.env.NEXT_PUBLIC_STORE_ADMIN_1 || "";
  const admin2 = process.env.NEXT_PUBLIC_STORE_ADMIN_2 || "";
  const admin = [admin1, admin2];
  return typeof test === "string" && test.length > 0 && admin.includes(test);
}
