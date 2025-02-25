
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { EmployeerSchema  } from '../schema/employeer'
import { z } from 'zod'
const prisma = new PrismaClient()

interface Params {
    id: string
}


export const getAll = async (req: Request, res: Response) => {
    const employeers = await prisma.employee.findMany()
    res.status(200).json(employeers)
}


export const getEmployeerByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const employeer = await prisma.employee.findUnique({ 
      where: { id }
    })
    res.status(200).json(employeer)
  } catch (error) {
      res.status(500).json({ message: 'Erro: ' + error })
  }
}

export const Create = async (req: Request, res: Response) => {
    try {
      // 	
      const { agentNumber, name, gender, dateOfBirth, phone, categoryId, workDepartmentId, dateOfAppointment } = req.body;
      const result = await prisma.employee.create({
        data: { agentNumber, name, gender, dateOfBirth, phone, categoryId, workDepartmentId, dateOfAppointment },
      });
      res.status(201).json({
          message: `Agente Cadastrado com sucesso.` 
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
    const data = EmployeerSchema.partial().parse(req.body)
    await prisma.employee.update({
      data,
      where: { id },
    })
    res.status(201).json({ message: 'Dados do Agente Atualizados com sucesso!' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: error.errors[0].message,
      })
    } else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Agente inexistente!' })
    } else {
      res.status(500).json({ message: 'Erro: ' + error })
    }
  }
}


export const Delete = async (req: Request<{}, {}, {}, Params>, res: Response) => {
  try {
    const { id } = req.query
    await prisma.employee.delete({
      where: { id: id },
    })
    res.status(201).json({ message: 'Agente eliminada com sucesso!' })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Agente inexistente!' })
    } else {
      res.status(500).json({ message: 'Erro:' + error })
    }
  }
}


