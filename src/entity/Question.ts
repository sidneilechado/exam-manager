import {
	Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany,
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

	@OneToMany((type) => Option, (option) => option.question)
	options: Option[];

	@ManyToMany((type) => Exam, (exam) => exam.questions)
	exams: Exam[];
}
