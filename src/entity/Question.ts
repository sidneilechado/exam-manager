import {
	Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany,
} from 'typeorm';
import Option from './Option';
import Exam from './Exam';

@Entity()
export default class Question {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	statement: string;

	@Column()
	correctAnswer: string;

	@OneToMany(
		(type) => Option, (option) => option.question,
		{ onDelete: 'CASCADE' },
	)
	options: Option[];

	@ManyToMany((type) => Exam, (exam) => exam.questions)
	exams: Exam[];
}
