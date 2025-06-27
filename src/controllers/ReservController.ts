import { Request, Response } from 'express'; // Importando Request e Response
import Reserva from '../models/ReservModels'; // Modelo de Reserva

class ReservaController {
  // Criar uma nova reserva
  static async criarReserva(req: Request, res: Response): Promise<void> {
    try {
      const { nomeCliente, numeroMesa, dataHoraReserva, status, contatoCliente } = req.body;

      // Criar nova reserva
      const novaReserva = new Reserva({
        nomeCliente,
        numeroMesa,
        dataHoraReserva,
        status: status || 'reservado', // status padrão se não for fornecido
        contatoCliente,
      });

      // Salvar no banco de dados
      await novaReserva.save();
      res.status(201).json({ message: 'Reserva criada com sucesso', reserva: novaReserva });
    } catch (err: any) {
      res.status(400).json({ error: 'Erro ao criar a reserva', message: err.message });
    }
  }

  // Listar todas as reservas
  static async listarReservas(req: Request, res: Response): Promise<void> {
    try {
      const reservas = await Reserva.find();
      res.status(200).json(reservas);
    } catch (err: any) {
      res.status(400).json({ error: 'Erro ao listar reservas', message: err.message });
    }
  }

  // Listar reservas por cliente
  static async listarReservasPorCliente(req: Request, res: Response): Promise<void> {
    try {
      const reservas = await Reserva.find({ nomeCliente: req.params.nomeCliente });
      res.status(200).json(reservas);
    } catch (err: any) {
      res.status(400).json({ error: 'Erro ao listar reservas do cliente', message: err.message });
    }
  }

  // Listar reservas por número da mesa
  static async listarReservasPorMesa(req: Request, res: Response): Promise<void> {
    try {
      const reservas = await Reserva.find({ numeroMesa: req.params.numeroMesa });
      res.status(200).json(reservas);
    } catch (err: any) {
      res.status(400).json({ error: 'Erro ao listar reservas da mesa', message: err.message });
    }
  }

  // Atualizar uma reserva
  static async atualizarReserva(req: Request, res: Response): Promise<void> {
    try {
      const reservaAtualizada = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!reservaAtualizada) {
         res.status(404).json({ error: 'Reserva não encontrada' });
      }
      res.status(200).json({ message: 'Reserva atualizada com sucesso', reserva: reservaAtualizada });
    } catch (err: any) {
      res.status(400).json({ error: 'Erro ao atualizar a reserva', message: err.message });
    }
  }

  // Excluir uma reserva
  static async excluirReserva(req: Request, res: Response): Promise<void> {
    try {
      const reservaExcluida = await Reserva.findByIdAndDelete(req.params.id);
      if (!reservaExcluida) {
         res.status(404).json({ error: 'Reserva não encontrada' });
      }
      res.status(200).json({ message: 'Reserva excluída com sucesso' });
    } catch (err: any) {
      res.status(400).json({ error: 'Erro ao excluir a reserva', message: err.message });
    }
  }

  // Verificar disponibilidade de uma mesa
  static async verificarDisponibilidade(req: Request, res: Response): Promise<void> {
    try {
      const { numeroMesa, dataHoraReserva } = req.query;
      const reserva = await Reserva.findOne({ numeroMesa, dataHoraReserva });

      if (reserva) {
         res.status(200).json({ disponibilidade: false, reserva });
      }
      res.status(200).json({ disponibilidade: true });
    } catch (err: any) {
      res.status(400).json({ error: 'Erro ao verificar disponibilidade', message: err.message });
    }
  }
}

export default ReservaController; // Exportando o controller
