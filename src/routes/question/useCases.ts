import { Request, Response, NextFunction } from 'express';
import { getRepository, getConnection } from 'typeorm';

import AppError from '../../errors/AppError';
import Question from '../../entity/Question';
import Option from '../../entity/Option';

function findDuplicates(array: Option[], compareFunction = (a, b) => a === b): Option[] {
	return array.reduce((dupes, element, i) => {
		const isDupe = array.slice(i + 1).find((el) => compareFunction(el, element))
      || dupes.find((el) => compareFunction(el, element));

		if (isDupe) {
			dupes.push(element);
		}

		return dupes;
	}, []);
}

async function createOptions(options: Option[]): Promise<Option[]> {
	const optionRepository = getRepository(Option);

	try {
		const createdOptions = options.map((option) => {
			const repositoryOption = optionRepository.create({
				key: option.key,
				value: option.value,
			});

			return repositoryOption;
		});

		await optionRepository.save(createdOptions);
		return createdOptions;
	} catch (err) {
		console.log(err);
	}
}

export async function createQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
	const questionRepository = getRepository(Question);

	try {
		const {
			statement,
			options,
			correctAnswer,
		} = req.body;

		const shouldCreateExam = findDuplicates(options, (a, b) => a.key === b.key || a.value === b.value);

		if (shouldCreateExam.length > 0) {
			throw new AppError('One or more questions are invalid, please review your input.');
		}

		const question = questionRepository.create({
			options,
			statement,
			correctAnswer,
			exams: [],
		});

		await questionRepository.save(question);

		question.options = await createOptions(options);

		await questionRepository.save(question);

		res.status(200).json(question);
	} catch (err) {
		next(err);
	}
}

export async function retrieveQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
	const questionRepository = getRepository(Question);

	try {
		const { id } = req.params;

		const question = await questionRepository.findOne({
			relations: ['options'],
			where: {
				id,
			},
		});

		if (!question) {
			throw new AppError('Question does not exists.');
		}

		res.status(200).json(question);
	} catch (err) {
		next(err);
	}
}

export async function deleteQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
	const questionRepository = getRepository(Question);

	try {
		const { id } = req.params;

		const question = await questionRepository.findOne({
			where: {
				id,
			},
		});

		if (!question) {
			throw new AppError('Question does not exists.');
		}

		await getConnection()
			.createQueryBuilder()
			.delete()
			.from(Option)
			.where('questionId = :id', { id: question.id })
			.execute();

		await questionRepository.delete(question);

		res.status(200).json({
			message: 'Question successfully deleted.',
		});
	} catch (err) {
		next(err);
	}
}

export async function modifyQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
	const questionRepository = getRepository(Question);

	try {
		const { id } = req.params;
		const {
			statement,
			correctAnswer,
			options,
		} = req.body;

		const question = await questionRepository.findOne({
			where: {
				id,
			},
		});

		if (!question) {
			throw new AppError('Question does not exists.');
		}

		const shouldModifyQuestion = findDuplicates(options, (a, b) => a.key === b.key || a.value === b.value);

		if (shouldModifyQuestion.length > 0) {
			throw new AppError('One or more questions are invalid, please review your input.');
		}

		question.statement = statement;
		question.correctAnswer = correctAnswer;
		question.options = await createOptions(options);

		await questionRepository.save(question);

		res.status(200).json(question);
	} catch (err) {
		next(err);
	}
}

export async function insertSingleOption(req: Request, res: Response, next: NextFunction): Promise<void> {
	const questionRepository = getRepository(Question);
	const optionRepository = getRepository(Option);

	try {
		const { id } = req.params;
		const option = req.body;

		const question = await questionRepository.findOne({
			relations: ['options'],
			where: {
				id,
			},
		});

		if (!question) {
			throw new AppError('Question does not exists.');
		}

		const shouldInsertOption = findDuplicates(
			[option, ...question.options],
			(a, b) => a.key === b.key || a.value === b.value,
		);

		if (shouldInsertOption.length > 0) {
			throw new AppError('Invalid option, please review your input.');
		}

		const newOption = optionRepository.create({
			key: option.key,
			value: option.value,
		});

		await optionRepository.save(newOption);
		question.options.push(newOption);

		await questionRepository.save(question);

		res.status(200).json(question);
	} catch (err) {
		next(err);
	}
}

export async function deleteSingleOption(req: Request, res: Response, next: NextFunction): Promise<void> {
	const questionRepository = getRepository(Question);

	try {
		const { id, key } = req.params;

		const question = await questionRepository.findOne({
			relations: ['options'],
			where: {
				id,
			},
		});

		if (!question) {
			throw new AppError('Question does not exists.');
		}

		const optionIndex = question.options.findIndex((option) => option.key === key);

		if (optionIndex < 0) {
			throw new AppError('Invalid option, please review your input.');
		}

		question.options.splice(optionIndex, 1);

		await questionRepository.save(question);

		res.status(200).json(question);
	} catch (err) {
		next(err);
	}
}
