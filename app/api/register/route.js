import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import User from '../../models/User'

export async function POST(req) {
   const body = await req.json();
   mongoose.connect(process.env.MONGO_URL);
   const pass = body.password;

   if (!pass?.length || pass.length < 5) {
      new Error('Password must be atleast 5 characters')
      // we will use bcrypt to hash our password, otherwise the password will be visible in database 
      return false;
   }

   const salt = bcrypt.genSaltSync(10);
    const notHashedPassword = pass;
    body.password = bcrypt.hashSync(notHashedPassword, salt);

   const createdUser = await User.create(body);
   return Response.json(createdUser)

}