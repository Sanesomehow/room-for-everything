// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import prisma from './prismaConfig';

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     callbackURL: "/auth/google/callback"
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await prisma.user.findFirst({
//             where: {
//                 OR: [
//                     {googleId: profile.id},
//                     {email: profile.emails?.[0]?.value}
//                 ]
//             }
//         });

//         if(user) {
//             if(!user.googleId) {
//                 user = await prisma.user.update({
//                     where: {id: user.id},
//                     data:{
//                         googleId: profile.id,
//                         name: user.name || profile.displayName,
//                         profilePicture: profile.photos?.[0]?.value
//                     }
//                 });
//             }
//             return done(null, user);
//         }

//         const newUser = await prisma.user.create({
//             data: {
//                 email: profile.emails?.[0]?.value || '',
//                 name: profile.displayName,
//                 googleId: profile.id,
//                 profilePicture: profile.photos?.[0]?.value
//             }
//         });
//         return done(null, newUser);
//     } catch (error) {
//         console.error('Google OAuth error: ', error);
//         return done(error, false);
//     }
// }))

// export default passport;