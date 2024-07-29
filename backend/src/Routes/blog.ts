import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from "@2781xsaumayy/blog-common"
import { decode, verify } from "hono/jwt";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
	Variables: {
		userId :any
	}
}>();

blogRouter.use("/*",async (c,next)=>{
	//this will verify jwt
	//this will send the author/user id from jwt to further routes.
	const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        }
		else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
	}
	catch(e){
		c.status(403)
		console.log(e);
		c.json({msg:"Some Error Occured"});
	}
})

blogRouter.post("/",async (c)=>{
	//creates a new blog=>we need to use env variables.
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
	  const authorId = c.get("userId");
	  const body =await c.req.json();
	  const {success} = createBlogInput.safeParse(body);
	  if(!success){
		c.status(411);
		return c.json("Invalid Input Format");
	  }
	  try{
		const blog = await prisma.post.create({
			data:{
				title:body.title,
				content:body.content,
				//author id jwt se nikaalna pdega
				//we sent it in jwt=>middleware nikalega authorId
				authorId:Number(authorId),
				published:true
			}
		  })
		  return c.json({
			id:blog.id,
			msg:"Blog created"
		  })
	  }
	  catch(e){
		console.log(e);
		c.text("Some Error Occured");
	  }
})
blogRouter.put("/",async (c)=>{
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

	  const body =await c.req.json();
	  const {success} = updateBlogInput.safeParse(body);
	  if(!success){
		c.status(411);
		return c.json("Invalid Input Format");
	  }
	  try{
		const blog = await prisma.post.update({
			where:{
				id: body.id
			},
			data:{
				title:body.title,
				content:body.content,
			}
		  })
		  return c.json({
			id:blog.id,
			msg:"Blog updated"
		  })
	  }
	  catch(e){
		console.log(e);
		c.text("Some Error Occured");
	  }
})

// Add pagination to the blogs
blogRouter.get("/bulk",async (c)=>{
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
	  try{
		const blogArr = await prisma.post.findMany({
			select:{
				title:true,
				content:true,
				id:true,
				author:{
					select:{
						name:true
					}
				}
			}
		})
		  if(!blogArr){
			return c.json({
				msg:"BlogS not Found"
			})
		  }
		  return c.json({
			blogArr
		  })
	  }
	  catch(e){
		console.log(e);
		c.text("Some Error Occured");
	  }
})

blogRouter.get("/:id",async (c)=>{
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
	  const id =c.req.param("id");
	  try{
		const blog = await prisma.post.findUnique({
			where:{
				id: Number(id),
			},
			select:{
				title:true,
				content:true,
				id:true,
				author:{
					select:{
						name:true
					}
				}
			}
		  })
		  if(!blog){
			return c.json({
				msg:"Blog not Found"
			})
		  }
		  return c.json({
			blog
		  })
	  }
	  catch(e){
		console.log(e);
		c.text("Some Error Occured");
	  }
})


