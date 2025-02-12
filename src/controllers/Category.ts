import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { CategorySchema  } from '../schema/category'
import { z } from 'zod'
const prisma = new PrismaClient()

interface Params {
	id: string
}


export const getAll = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany()
    res.status(200).json(categories)
}

export const Create = async (req: Request, res: Response) => {
    try {
      // 	
      const { name, netSalary, grossSalary } = CategorySchema.parse(req.body);
      const result = await prisma.category.create({
        data: { name, netSalary, grossSalary },
      });
      res.status(201).json({
          message: `Categoria Cadastrada com sucesso.` 
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
    const data = CategorySchema.partial().parse(req.body)
    await prisma.category.update({
      data,
      where: { id },
    })
    res.status(201).json({ message: 'Categoria Atualizada com sucesso!' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: error.errors[0].message,
      })
    } else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Categoria inexistente!' })
    } else {
      res.status(500).json({ message: 'Erro: ' + error })
    }
  }
}


export const Delete = async (req: Request<{}, {}, {}, Params>, res: Response) => {
  try {
    const { id } = req.query
    await prisma.category.delete({
      where: { id: id },
    })
    res.status(201).json({ message: 'Categoria eliminada com sucesso!' })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Categoria inexistente!' })
    } else {
      res.status(500).json({ message: 'Erro:' + error })
    }
  }
}