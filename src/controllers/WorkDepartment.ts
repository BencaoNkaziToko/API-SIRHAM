import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { WorkDepartmentSchema  } from '../schema/workDepartment'
import { z } from 'zod'
const prisma = new PrismaClient()

interface Params {
    id: string 
}

interface IID {
  id: string
}

export const getAll = async (req: Request, res: Response) => {
    const departments = await prisma.workDepartment.findMany()
    res.status(200).json(departments)
}



export const getWorkDepartmentByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const department = await prisma.workDepartment.findUnique({ 
      where: { id }
    })
    res.status(200).json(department)
  } catch (error) {
      res.status(500).json({ message: 'Erro: ' + error })
  }
}

export const Create = async (req: Request, res: Response) => {
    try {
      // 	
      const { name, competencies, organicStatute } = WorkDepartmentSchema.parse(req.body);
      const result = await prisma.workDepartment.create({
        data: { name, competencies, organicStatute },
      });
      res.status(201).json({
          message: `Gabinete ou Direção Cadastrada com sucesso.` 
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
    const data = WorkDepartmentSchema.partial().parse(req.body)
    await prisma.workDepartment.update({
      data,
      where: { id },
    })
    res.status(201).json({ message: 'Gabinete ou Direção Atualizada com sucesso!' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: error.errors[0].message,
      })
    } else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Gabinete ou Direção inexistente!' })
    } else {
      res.status(500).json({ message: 'Erro: ' + error })
    }
  }
}


export const Delete = async (req: Request<{}, {}, {}, Params>, res: Response) => {
  try {
    const { id } = req.query
    await prisma.workDepartment.delete({
      where: { id: id },
    })
    res.status(201).json({ message: 'Gabinete ou Direção eliminada com sucesso!' })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Gabinete ou Direção inexistente!' })
    } else {
      res.status(500).json({ message: 'Erro:' + error })
    }
  }
}

