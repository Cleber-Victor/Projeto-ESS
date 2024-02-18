import prisma from '../database';
import { Prisma } from '@prisma/client';
import DuplicateFieldError from '../errors/DuplicateFieldError';
import NotFoundError from '../errors/NotFoundError';

class ClientModel {
  static async insert(
    name: string,
    cpf: string,
    email: string,
    endereco: string,
    password: string
  ) {
      const Exist_Client = await prisma.client.findFirst({
        where : {
          OR: [{cpf},{email}]
        },
      });

      if(Exist_Client){
        throw new DuplicateFieldError("Cliente já cadastrado");
      }
  }


  static async index() {
    const clients = await prisma.client.findMany({
      select: { id: true, name: true, cpf: true, email: true,endereco: true,},
    });

    return clients;
  }

  static async delete(id: number) {
    await prisma.client.delete({ where: { id } });
  }

  static async update(
    id: number,
    name: string,
    cpf: string,
    email: string,
    endereco: string,
    password: string
  ) {
    const Exist_Client = await prisma.client.findFirst({
      where : {
        OR: [{cpf},{email}]
      },
    });

    if(Exist_Client){
      throw new DuplicateFieldError("Cliente já cadastrado");
    }

    const client = await prisma.client.findFirst({ where: { id } });

    if (!client) throw new NotFoundError('Restaurant not found');

    await prisma.client.update({
      where: { id },
      data: { name, cpf, email, endereco, password },
    });
  }
}

export default ClientModel;