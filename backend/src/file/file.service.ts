import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  constructor() {}
  async createFile(file: any, format: string): Promise<string> {
    try {
      const fileName = uuid.v4() + format;
      const filePath = path.resolve(__dirname, '..', '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        `Ошибка при записи файла ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fileName: string): Promise<boolean> {
    try {
      const filePath = path.resolve(__dirname, '..', '..', 'static', fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true; // Возвращаем true, если файл успешно удален
      } else {
        return false; // Возвращаем false, если файл не существует
      }
    } catch (e) {
      throw new HttpException(
        `Ошибка при удалении файла ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
