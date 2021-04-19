import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import Exam, { ExamType } from '../../entity/Exam';
import Question from '../../entity/Question';

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
			questions: [],
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
			relations: ['questions'],
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
			relations: ['questions', 'questions.options'],
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

		res.status(200).json({
			message: 'Successfully deleted.',
		});
	} catch (err) {
		next(err);
	}
}

export async function addQuestionToExam(req: Request, res: Response, next: NextFunction): Promise<void> {
	const examRepository = getRepository(Exam);
	const questionRepository = getRepository(Question);

	try {
		const { examId, questionId } = req.params;

		const exam = await examRepository.findOne({
			relations: ['questions', 'questions.options'],
			where: {
				id: examId,
			},
		});

		if (!exam) {
			throw new AppError('Exam does not exists.');
		}

		const question = await questionRepository.findOne({
			relations: ['options'],
			where: {
				id: questionId,
			},
		});

		if (!question) {
			throw new AppError('Question does not exists.');
		}

		if (exam.questions.find((examQuestion) => examQuestion.id === question.id)) {
			throw new AppError('Question is already on exam.');
		}

		exam.questions.push(question);

		await examRepository.save(exam);

		res.status(200).json(exam);
	} catch (err) {
		next(err);
	}
}

export async function deleteQuestionFromExam(req: Request, res: Response, next: NextFunction): Promise<void> {
	const examRepository = getRepository(Exam);
	const questionRepository = getRepository(Question);

	try {
		const { examId, questionId } = req.params;

		const exam = await examRepository.findOne({
			relations: ['questions', 'questions.options'],
			where: {
				id: examId,
			},
		});

		if (!exam) {
			throw new AppError('Exam does not exists.');
		}

		const question = await questionRepository.findOne({
			relations: ['options'],
			where: {
				id: questionId,
			},
		});

		if (!question) {
			throw new AppError('Question does not exists.');
		}

		const questionIndex = exam.questions.findIndex((examQuestion) => examQuestion.id === question.id);

		if (questionIndex < 0) {
			throw new AppError('Question is not on exam.');
		}

		exam.questions.splice(questionIndex, 1);

		await examRepository.save(exam);

		res.status(200).json(exam);
	} catch (err) {
		next(err);
	}
}
