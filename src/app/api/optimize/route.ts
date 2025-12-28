import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { OptimizationOptions } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const optionsStr = formData.get("options") as string;

    if (!file || !optionsStr) {
      return NextResponse.json({ error: "Missing file or options" }, { status: 400 });
    }

    const options: OptimizationOptions = JSON.parse(optionsStr);
    const buffer = Buffer.from(await file.arrayBuffer());

    let pipeline = sharp(buffer);

    // Resize (Optional)
    if (options.width || options.height) {
      pipeline = pipeline.resize(options.width, options.height, { fit: 'inside', withoutEnlargement: true });
    }

    // Determine format
    const metadata = await sharp(buffer).metadata();
    let format = options.format === 'original' ? metadata.format : options.format;

    // Normalize format
    if (format === 'jpg') format = 'jpeg';

    // Apply compression settings based on format
    switch (format) {
      case 'jpeg':
        pipeline = pipeline.jpeg({ quality: options.quality, mozjpeg: true });
        break;
      case 'png':
        // High compression using palette (quantization) similar to TinyPNG
        pipeline = pipeline.png({ quality: options.quality, palette: true, compressionLevel: 9 });
        break;
      case 'webp':
        pipeline = pipeline.webp({ quality: options.quality });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality: options.quality, effort: 4 }); // effort 4 is balanced
        break;
      default:
        // Fallback for others, just force jpeg if unknown or keep original without specific opts
        pipeline = pipeline.jpeg({ quality: options.quality });
        format = 'jpeg';
        break;
    }

    const optimizedBuffer = await pipeline.toBuffer();

    // CORS headers can be handled by Next.js middleware if needed, but for same-origin, not needed.
    return new NextResponse(optimizedBuffer as any, {
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Length": optimizedBuffer.length.toString(),
        "X-Original-Size": file.size.toString(),
        "X-Optimized-Size": optimizedBuffer.length.toString(),
      }
    });

  } catch (error) {
    console.error("Optimization error:", error);
    return NextResponse.json({ error: "Optimization failed: " + (error as Error).message }, { status: 500 });
  }
}
