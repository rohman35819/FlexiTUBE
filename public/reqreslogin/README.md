# ReqRes Login Simulation

Simulasi login menggunakan API `https://reqres.in/api/login`.

## Cara Jalankan

1. Jalankan `mitmproxy`:

```bash
mitmproxy --listen-port 8080

Data Login
Email	Password
eve.holt@reqres.in	cityslicka

tools/
└── reqres-login/
    ├── index.html          # Halaman form login
    ├── README.md           # Penjelasan cara pakai