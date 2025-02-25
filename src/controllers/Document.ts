import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { DocumentSchema  } from '../schema/document'
import { z } from 'zod'
const prisma = new PrismaClient()

interface Params {
    id: string
}

interface IEmployeerID{
    id?: '' | string 
}

export const getAll = async (req: Request, res: Response) => {
    const document = await prisma.document.findMany()
    res.status(200).json(document)
}


export const getDocumentByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const document = await prisma.document.findUnique({ 
      where: { id }
    })
    res.status(200).json(document)
  } catch (error) {
      res.status(500).json({ message: 'Erro: ' + error })
  }
}

export const Create = async (req: Request, res: Response) => {
    try {
      const { title, dateOfIssuance, path, employeeId } = req.body;
      const result = await prisma.document.create({
        data: { title, dateOfIssuance, path, employeeId },
      });
      res.status(201).json({
          message: `Documento cadastrado com sucesso.` 
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
    const data = DocumentSchema.partial().parse(req.body)
    await prisma.document.update({
      data,
      where: { id },
    })
    res.status(201).json({ message: 'Documento Atualizado com sucesso!' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: error.errors[0].message,
      })
    } else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Documento inexistente!' })
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




