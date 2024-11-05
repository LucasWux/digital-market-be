import { BaseEntity } from 'src/utils/base/base-entity';
import { productTypeTransformer } from 'src/utils/tranformers/product-tranformer';
import { Column, Entity } from 'typeorm';

@Entity()
export class Chat extends BaseEntity {
    @Column({ nullable: false, default: 1 })
    status: boolean; //active: 1, hidden: 0
    
    @Column({ nullable: false}) // how to be auto-incremental???
    id: number;
    
    @Column({ nullable: false })
    senderId: number;
    
    @Column({ nullable: false })
    receiverId: number;
    
    @Column({ nullable: false })
    content: string;
    
    @Column({ nullable: true})
    image: string[];
}
