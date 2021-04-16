import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,
} from 'typeorm';
import Option from './Option'
import Exam from './Exam'

@Entity()
export default class Question {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	statement: string;

	@OneToMany((type) => Option, (option) => option.question)
	options: Option[];

	@ManyToOne((type) => Exam, (exam) => exam.questions)
	exam: Exam;
}
