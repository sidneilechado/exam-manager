import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import Exam, { ExamType } from '../../entity/Exam';

export async function createExam(req: Request, res: Response, next: NextFunction): Promise<void> {
	const examRepository = getRepository(Exam);

	try {
		const {
			name,
			description,
			examType,
		} = req.body;

		if (!(examType === ExamType.online || examType === ExamType.offline)) {
			throw new AppError('Invalid Data.');
		}

		const exam = examRepository.create({
			name,
			description,
			type: examType,
		});

		await examRepository.save(exam);

		res.status(200).json(exam);
	} catch (err) {
		next(err);
	}
}

export async function modifyExam(req: Request, res: Response, next: NextFunction): Promise<void> {
	const examRepository = getRepository(Exam);

	try {
		const { id } = req.params;
		const {
			name,
			description,
			examType,
		} = req.body;

		if (!(examType === ExamType.online || examType === ExamType.offline)) {
			throw new AppError('Invalid Exam Type.');
		}

		const exam = await examRepository.findOne({
			where: {
				id,
			},
		});

		if (!exam) {
			throw new AppError('Exam does not exists.');
		}

		exam.description = description;
		exam.name = name;
		exam.type = examType;

		await examRepository.save(exam);

		res.status(200).json(exam);
	} catch (err) {
		next(err);
	}
}

export async function retrieveExam(req: Request, res: Response, next: NextFunction): Promise<void> {
	const examRepository = getRepository(Exam);

	try {
		const { id } = req.params;

		const exam = await examRepository.findOne({
			where: {
				id,
			},
		});

		if (!exam) {
			throw new AppError('Exam does not exists.');
		}

		res.status(200).json(exam);
	} catch (err) {
		next(err);
	}
}

export async function deleteExam(req: Request, res: Response, next: NextFunction): Promise<void> {
	const examRepository = getRepository(Exam);

	try {
		const { id } = req.params;

		const exam = await examRepository.findOne({
			where: {
				id,
			},
		});

		if (!exam) {
			throw new AppError('Exam does not exists.');
		}

		await examRepository.delete(exam);

		res.status(200);
	} catch (err) {
		next(err);
	}
}
