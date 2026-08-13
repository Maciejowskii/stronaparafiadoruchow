import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { put, del } from "@vercel/blob";

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "public", "zdjecia");
    let localFiles: string[] = [];
    try {
      const files = await fs.readdir(dirPath);
      localFiles = files
        .filter((file) => /\.(jpg|jpeg|png|webp|jfif|gif)$/i.test(file))
        .map((file) => `/zdjecia/${file}`);
    } catch {}

    return NextResponse.json({ images: localFiles });
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
    const useVercelBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

    const dirPath = path.join(process.cwd(), "public", "zdjecia");
    if (!useVercelBlob) {
      await fs.mkdir(dirPath, { recursive: true });
    }

    for (const file of allFilesToProcess) {
      const bytes = await file.arrayBuffer();
      const rawBuffer = Buffer.from(bytes);

      const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}-${baseName}.webp`;

      // Ultra optimization with Sharp: convert to WebP, max 1920px
      const optimizedBuffer = await sharp(rawBuffer)
        .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      if (useVercelBlob) {
        // Upload to Vercel Blob cloud storage
        const blob = await put(`zdjecia/${filename}`, optimizedBuffer, {
          access: "public",
          contentType: "image/webp",
        });
        uploadedUrls.push(blob.url);
      } else {
        // Fallback to local storage
        const uploadPath = path.join(dirPath, filename);
        await fs.writeFile(uploadPath, optimizedBuffer);
        uploadedUrls.push(`/zdjecia/${filename}`);
      }
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

export async function DELETE(req: Request) {
  if (!checkIsAdmin()) {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("file");

    if (!fileUrl) {
      return NextResponse.json({ error: "Nieprawidłowa ścieżka pliku" }, { status: 400 });
    }

    if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
      // Delete from Vercel Blob if cloud URL
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        await del(fileUrl).catch(() => {});
      }
    } else if (fileUrl.startsWith("/zdjecia/")) {
      // Delete from local disk
      const filename = path.basename(fileUrl);
      const filePath = path.join(process.cwd(), "public", "zdjecia", filename);
      await fs.unlink(filePath).catch(() => {});
    }

    return NextResponse.json({ success: true, message: "Usunięto zdjęcie" });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: "Błąd podczas usuwania zdjęcia" }, { status: 500 });
  }
}
