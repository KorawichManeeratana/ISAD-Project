import fs from "node:fs/promises";
import crypto from 'crypto';
import { buffer } from "stream/consumers";

export default class pictureManager {
    public static async savePicture(file: File, folderPath: string): Promise<string> {
        let fileType = "." + file.name.split('.').at(-1);

        let name = this.randomName();
        
        folderPath = (folderPath[0] === '/') ?  folderPath : "/" + folderPath;
        const path = (folderPath.at(-1) === '/') ? folderPath : folderPath + '/';

        while(await this.checkFile(path + name + fileType)) {name = this.randomName();}

        const AV = await file.arrayBuffer()
        const buf = Buffer.from(AV);
        
        try {
            await fs.writeFile("public" + path + name + fileType, new Uint8Array(buf));
            return path + name + fileType;
        } catch (error) {
            console.error("Error writing file:", error);
            throw error; // หรือจัดการ error ตามที่คุณต้องการ
        }
    }

    public static async deletePicture(filePath: string): Promise<boolean>{
        try {
            filePath = "public" + filePath;
            await fs.rm(filePath);
            return true;
        } catch (error) {
            return false; 
        }
        
    }

    private static randomName() {
        return crypto.randomBytes(8).toString('hex');
    }

    private static async checkFile(path: string): Promise<boolean> {
        try {
            const status = await fs.stat(path);
            return true;
        } catch {
            return false;
        }
    }
}
