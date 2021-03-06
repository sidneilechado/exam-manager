import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import Question from './Question';

@Entity()
export default class Option {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	key: string;

	@Column()
	value: string;

	@ManyToOne((type) => Question, (question) => question.options)
	question: Question;
}
