import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signUpValidation, signInValidation} from "@2781xsaumayy/blog-common"
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";

const saltRounds = 10;


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

userRouter.post("/signup",async (c)=>{
  console.log("Inside Signin")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      console.log("prisma connected")
    const body = await c.req.json();
    const {success} = signUpValidation.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        msg:"Inputs are not Valid",
      })
    }
    console.log("Validated")
    try{
      const alreadyExist = await prisma.user.findUnique({
        where:{
          email:body.email,
        }
      })
      if(alreadyExist){
        c.status(400);
        return c.json({
          msg:"User Already Exists",
        })
      }
      const hashedPassword =await bcrypt.hash(body.password,saltRounds);
      const user = await prisma.user.create({
        data:{
          email:body.email,
          password:hashedPassword,
          name:body.name
        }
      })
      const jwt =await sign({id:user.id},c.env.JWT_SECRET);
      return c.text(jwt);
    }
    catch(e){
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
});


userRouter.post("/signin",async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const {success} = signInValidation.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      msg:"Inputs are not Valid",
    })
  }
  //find hashed password
  try{
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
      }
    });
    if(!user){
      c.status(403);
      return c.json({error:"User does not exist"});
    }
    else{
      const hashedPassword = user.password;
      const isMatch = await bcrypt.compare(body.password,hashedPassword);
      if(!isMatch){
        c.status(403);
        return c.json({error:"Incorrect Password"});
      }
    }
    const jwt =await sign({id:user.id},c.env.JWT_SECRET);
    return c.text(jwt);
  }
  catch(e){
    console.log(e);
    c.status(411);
    return c.text('Invalid')
  }
})
