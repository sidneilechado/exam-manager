import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,
} from 'typeorm';
import Question from './Question'

export type ExamType = 'ONLINE' | 'OFFLINE';

@Entity()
export default class Exam {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	type: ExamType;

	@OneToMany((type) => Question, (question) => question.exam)
	questions: Question[];
}
