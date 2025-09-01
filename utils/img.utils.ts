import path from "node:path";
import fs from "node:fs/promises";

export const deleteImage = async (imageName: string) => {
    const filePath = path.join(__dirname, '../', 'uploads', imageName);
    await fs.unlink(filePath);
}