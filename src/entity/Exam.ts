import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,
} from 'typeorm';
import Question from './Question'

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
		type: "enum",
		enum: ExamType,
		default: ExamType.online
	})
	type: ExamType;

	@OneToMany((type) => Question, (question) => question.exam)
	questions: Question[];
}
