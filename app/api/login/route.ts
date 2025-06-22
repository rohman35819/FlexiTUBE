import { NextResponse } from 'next/server';

const users = [
  { username: 'admin', password: 'supersecret' },
  { username: 'bani', password: 'pentester123' },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = users.find((u) => u.username === username);

  if (!user) {
    await sleep(200); // Username tidak valid → cepat
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }

  const actualPassword = user.password;
  let delay = 0;

  // Delay per karakter password yang benar
  for (let i = 0; i < password.length; i++) {
    if (password[i] === actualPassword[i]) {
      delay += 200; // setiap karakter benar → tambah delay
    } else {
      break; // stop jika ada karakter salah
    }
  }

  await sleep(delay);

  if (user.password !== password) {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }

  // Jika password match sempurna, return success
  return NextResponse.json({ message: 'Login successful' });
}
