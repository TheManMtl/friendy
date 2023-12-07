import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "image",
  // modelName: 'Image',
})
class Image extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fileName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fileName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  thumbnail!: string;
}
export default Image;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    thumbnail!: string;
  
 }  
 export default Image;