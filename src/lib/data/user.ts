// import { db } from ""

export const getUserByEmail = async (email: string) => {
    // TODO: Connect to db with actual user fetching
//   try {
//     const user = await db.user.findUnique({
//       where: {email}
//     })
//     return user
//   } catch {
//     return null;
//   }
    const user = {email: "test@gmail.com", password: "plaeen2024"}

    return user
}

export const getUserById = async (id: string) => {
    // TODO: Connect to db with actual user fetching
//   try {
//     const user = await db.user.findUnique({
//       where: {id}
//     })
//     return user
//   } catch {
//     return null;
//   }
}