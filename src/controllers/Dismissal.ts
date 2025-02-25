import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { z } from 'zod'
const prisma = new PrismaClient()

interface Params {
    id: string
}


export const getAll = async (req: Request, res: Response) => {
    const dismissal = await prisma.dismissal.findMany()
    res.status(200).json(dismissal)
}


export const getDismissalByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const dismissal = await prisma.dismissal.findUnique({ 
      where: { id }
    })
    res.status(200).json(dismissal)
  } catch (error) {
      res.status(500).json({ message: 'Erro: ' + error })
  }
}

export const Create = async (req: Request, res: Response) => {
    try {
      // 	
      const { motive, description, startDate, endDate, dateOfIssuance, documentId, document } = req.body;
      const result = await prisma.dismissal.create({
        data: { motive, description, startDate, endDate, dateOfIssuance, documentId, document },
      });
      res.status(201).json({
          message: `Dispensa Cadastrada com sucesso.` 
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
    const data = req.body
    await prisma.dismissal.update({
      data,
      where: { id },
    })
    res.status(201).json({ message: 'Dispensa Atualizada com sucesso!' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: error.errors[0].message,
      })
    } else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Dispensa inexistente!' })
    } else {
      res.status(500).json({ message: 'Erro: ' + error })
    }
  }
}


export const Delete = async (req: Request<{}, {}, {}, Params>, res: Response) => {
  try {
    const { id } = req.query
    await prisma.dismissal.delete({
      where: { id: id },
    })
    res.status(201).json({ message: 'Dispensa eliminada com sucesso!' })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Dispensa inexistente!' })
    } else {
      res.status(500).json({ message: 'Erro:' + error })
    }
  }
}