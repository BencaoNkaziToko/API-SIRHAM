import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { UserSchema } from '../schema/user'
import { z } from 'zod'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

interface Params {
	id: string
}

const prisma = new PrismaClient()

export const getAll = async (req: Request, res: Response) => {
	const users = await prisma.user.findMany()
	res.status(200).json(users)
}


// Encontrei um erro depois de cadastar, a message de erro, está assim:
/*{
	"message": "Required"
}*/
// A mensagem de erro deveria ser: "O nome é obrigatório"
// ou "O e-mail deve ser válido"



export const Create = async (req: Request, res: Response) => {
	try {
	  
	  const { name } = UserSchema.parse(req.body);
	  const { email } = req.body;
	  // Criar o usuário no banco de dados
	  const result = await prisma.user.create({
		data: {
		  name,
		  email,
		},
	  });
  
	  res.status(201).send(result);
	} catch (error) {
	  if (error instanceof z.ZodError) {
		res.status(400).json({	
		  message: error.errors[0].message, // Retorna o primeiro erro
		});
	  } else {
		res.status(500).json({
		  message: 'Erro interno do servidor',
		});
	  }
	}
}
  
//Edita o user, mas nao retorna message: 'Atualizado com sucesso' 
export const Update = async (req: Request<{}, {}, {}, Params>, res: Response) => {
	try {
		const { id } = req.query
		const data = UserSchema.partial().parse(req.body)
		await prisma.user.update({
			data,
			where: { id },
		})
		res.status(204).json({ message: 'Atualizado com sucesso.' })
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(400).json({
				message: error.errors[0].message,
			})
		} else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
			res.status(404).json({ message: 'Usuário inexistente' })
		} else {
			res.status(500).json({ message: 'Erro: ' + error })
		}
	}
}

//Excluir o user, mas nao retorna message: 'Eliminado com sucesso' 
export const Delete = async (req: Request<{}, {}, {}, Params>, res: Response) => {
	try {
		const { id } = req.query
		await prisma.user.delete({
			where: { id: id },
		})
		res.status(204).json({ message: 'Eliminado com sucesso' })
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
			res.status(404).json({ message: 'Usuário inexistente' })
		} else {
			res.status(500).json({ message: 'Erro:' + error })
		}
	}
}