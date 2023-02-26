import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Joueur } from '../../joueurs/entities/joueur.entity';

@Entity()
export class Classement {
  @PrimaryGeneratedColumn()
  idClassement: number;

  @OneToOne(() => Joueur, {nullable:false})
  @JoinColumn()
  idJoueur: Joueur;

  @Column({nullable:false})
  ELO: number;
}
