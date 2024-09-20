import { Connection } from 'typeorm';
import { Culture } from '../cultures/culture.entity';

export async function seed(connection: Connection) {
  const cultures = [
    { name: 'Soybean' },
    { name: 'Corn' },
    { name: 'Cotton' },
    { name: 'Coffee' },
    { name: 'Sugarcane' },
  ];

  await connection.getRepository(Culture).save(cultures);
}
