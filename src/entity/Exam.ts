import {
	Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,
} from 'typeorm';
import Question from './Question';

export enum ExamType {
	online = 'ONLINE',
	offline = 'OFFLINE',
}

@Entity()
export default class Exam {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({
		type: 'enum',
		enum: ExamType,
		default: ExamType.online,
	})
	type: ExamType;

	@ManyToMany((type) => Question, (question) => question.exams)
	@JoinTable()
	questions: Question[];
}
