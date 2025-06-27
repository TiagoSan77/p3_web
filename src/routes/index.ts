import { Router } from 'express'; // Importa o Router do Express
import ReservaController from '../controllers/ReservController'; // Importa o controlador

const router = Router();

// Definindo as rotas para as operações CRUD

// Criar uma nova reserva
router.post('/reservas', ReservaController.criarReserva);

// Listar todas as reservas
router.get('/reservas', ReservaController.listarReservas);

// Listar reservas por nome do cliente
router.get('/reservas/cliente/:nomeCliente', ReservaController.listarReservasPorCliente);

// Listar reservas por número da mesa
router.get('/reservas/mesa/:numeroMesa', ReservaController.listarReservasPorMesa);

// Atualizar uma reserva
router.put('/reservas/:id', ReservaController.atualizarReserva);

// Excluir uma reserva
router.delete('/reservas/:id', ReservaController.excluirReserva);

// Verificar disponibilidade de uma mesa
router.get('/reservas/disponibilidade', ReservaController.verificarDisponibilidade);

export default router;
