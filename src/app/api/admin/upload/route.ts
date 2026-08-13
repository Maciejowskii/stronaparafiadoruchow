import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "public", "zdjecia");
    const files = await fs.readdir(dirPath);

    const imageFiles = files
      .filter((file) => /\.(jpg|jpeg|png|webp|jfif|gif)$/i.test(file))
      .map((file) => `/zdjecia/${file}`);

    return NextResponse.json({ images: imageFiles });
  } catch (err) {
    console.error("Failed to read zdjecia dir:", err);
    return NextResponse.json({ images: [] });
  }
}

export async function POST(req: Request) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File;

    const allFilesToProcess = files.length > 0 ? files : singleFile ? [singleFile] : [];

    if (allFilesToProcess.length === 0) {
      return NextResponse.json({ error: "Brak plików do przesłania" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];
    const dirPath = path.join(process.cwd(), "public", "zdjecia");

    // Ensure directory exists
    await fs.mkdir(dirPath, { recursive: true });

    for (const file of allFilesToProcess) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}-${baseName}.webp`;
      const uploadPath = path.join(dirPath, filename);

      // Ultra optimization with Sharp: convert to WebP, resize max 1920px width, quality 80
      await sharp(buffer)
        .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(uploadPath);

      uploadedUrls.push(`/zdjecia/${filename}`);
    }

    return NextResponse.json({
      url: uploadedUrls[0],
      urls: uploadedUrls,
      count: uploadedUrls.length,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Błąd podczas optymalizacji i zapisywania plików" }, { status: 500 });
  }
}
