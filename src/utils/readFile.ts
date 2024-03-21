import { promises as fs } from 'fs';
import * as path from 'path';
export const readContract = async (): Promise<string> => {
    try {
        const filePath = path.resolve(__dirname, '../..', 'contract.docx'); // Change the file path accordingly
        let content = await fs.readFile(filePath, 'utf-8');

    // Manipulate the content as needed
    await content
      .replace('طرف أول مالك مؤجر', 'Owner/Landlord')
      .replace('طرف ثان مستأجر', 'Tenant')
      .replace('مادة 1', 'Article 1');
   
    await fs.writeFile(filePath, content, 'utf-8');
    return 'modifiedContent';
  } catch (error) {
    console.error('Error reading the contract:', error);
    throw error; // You might want to handle this error more gracefully
  }
};
