// pages/api/readfile.ts

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: NextRequest) {
  const fileParam = req.nextUrl.searchParams.get('file');

  if (!fileParam) {
    return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
  }

  const baseDir = path.resolve('./files'); // hanya boleh akses dalam folder ini
  const targetPath = path.resolve(baseDir, fileParam);

  // Cegah akses ke luar baseDir
  if (!targetPath.startsWith(baseDir)) {
    return NextResponse.json({ error: 'Unauthorized access detected' }, { status: 403 });
  }

  try {
    const content = fs.readFileSync(targetPath, 'utf-8');
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'File not found or unreadable' }, { status: 404 });
  }
}
