from cek_links import cek_links
from cek_cookie import cek_cookie

def tampilkan_menu():
    print("\n=== FlexiTUBE Tools ===")
    print("1. Cek Link")
    print("2. Cek Cookie")
    print("0. Keluar")

def main():
    while True:
        tampilkan_menu()
        pilihan = input("Pilih menu: ")

        if pilihan == "1":
            url = input("Masukkan URL: ")
            print(cek_links(url))
        elif pilihan == "2":
            url = input("Masukkan URL: ")
            print(cek_cookie(url))
        elif pilihan == "0":
            print("Keluar.")
            break
        else:
            print("Pilihan tidak valid.")

if __name__ == "__main__":
    main()
