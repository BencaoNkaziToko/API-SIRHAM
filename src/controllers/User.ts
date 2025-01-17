import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { UserSchema } from '../schema/user'
import { z } from 'zod'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

// Esquema de validação
interface Params {
	id: string
}

const prisma = new PrismaClient()

export const getAll = async (req: Request, res: Response) => {
	const users = await prisma.user.findMany()
	res.status(200).json(users)
}


export const Create = async (req: Request, res: Response) => {
	try {
	  // 	
	  const { name, email } = UserSchema.parse(req.body);
	  const result = await prisma.user.create({
	  	data: { name, email },
	  });
	  res.status(201).json({
	  	  message: `Usuário Cadastrado com sucesso.` 
	  })
	} catch (error) {
	  if (error instanceof z.ZodError) {
		res.status(400).json({
		  message: error.errors[0].message,
		});
	  } else {
		res.status(500).json({
		  message: 'Erro interno do servidor!',
		});
	  }
	}
};
  

export const Update = async (req: Request<{}, {}, {}, Params>, res: Response) => {
	try {
		const { id } = req.query
		const data = UserSchema.partial().parse(req.body)
		await prisma.user.update({
			data,
			where: { id },
		})
		res.status(201).json({ message: 'Usuário Atualizado com sucesso!' })
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(400).json({
				message: error.errors[0].message,
			})
		} else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
			res.status(404).json({ message: 'Usuário inexistente!' })
		} else {
			res.status(500).json({ message: 'Erro: ' + error })
		}
	}
}


export const Delete = async (req: Request<{}, {}, {}, Params>, res: Response) => {
	try {
		const { id } = req.query
		await prisma.user.delete({
			where: { id: id },
		})
		res.status(201).json({ message: 'Eliminado com sucesso!' })
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
			res.status(404).json({ message: 'Usuário inexistente!' })
		} else {
			res.status(500).json({ message: 'Erro:' + error })
		}
	}
}