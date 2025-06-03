import sys
import os
import signal
import argparse
from exception import NoSQLMapException
import nsmcouch
import nsmmongo
import nsmscan
import nsmweb

optionSet = [False] * 9

# Global vars default
platform = "MongoDB"
dbPort = 27017
myIP = "Not Set"
myPort = "Not Set"
victim = "Not Set"
webPort = 80
uri = "Not Set"
https = False  # boolean
verb = False   # boolean
httpMethod = "GET"
requestHeaders = {}
postData = {}

def signal_handler(sig, frame):
    print("\nCtrl+C caught. Exiting...")
    sys.exit(0)

def build_request_headers(reqHeadersIn):
    if not reqHeadersIn:
        return {}
    try:
        reqHeadersArray = reqHeadersIn.split(",")
        if len(reqHeadersArray) % 2 != 0:
            print("[!] Invalid headers format. Must be comma separated key,value pairs.")
            return {}
        headerNames = reqHeadersArray[0::2]
        headerValues = reqHeadersArray[1::2]
        return dict(zip(headerNames, headerValues))
    except Exception as e:
        print(f"[!] Error parsing headers: {e}")
        return {}

def build_post_data(postDataIn):
    if not postDataIn:
        return {}
    try:
        pdArray = postDataIn.split(",")
        if len(pdArray) % 2 != 0:
            print("[!] Invalid post data format. Must be comma separated key,value pairs.")
            return {}
        paramNames = pdArray[0::2]
        paramValues = pdArray[1::2]
        return dict(zip(paramNames, paramValues))
    except Exception as e:
        print(f"[!] Error parsing post data: {e}")
        return {}

def attack(args):
    """
    Fungsi ini menjalankan attack sesuai platform.
    Ini contoh dasar, harus disesuaikan dengan modul nyata.
    """
    global platform, victim, webPort, dbPort, myIP
    if victim == "Not Set":
        print("[!] Target belum diset, gunakan opsi untuk set target.")
        return
    
    print(f"[*] Starting attack on {victim} with platform {platform} ...")
    
    if platform == "MongoDB":
        nsmmongo.netAttacks(victim, int(dbPort), myIP, myPort)
    elif platform == "CouchDB":
        nsmcouch.netAttacks(victim, int(dbPort), myIP)
    else:
        print(f"[!] Platform {platform} tidak dikenal.")
    
    print("[*] Attack selesai.")

def main():
    global platform, dbPort, myIP, myPort, victim, webPort, uri, https, verb, httpMethod, requestHeaders, postData
    
    signal.signal(signal.SIGINT, signal_handler)

    parser = argparse.ArgumentParser(description="NoSQLMap - NoSQL Injection Tool")
    parser.add_argument("--platform", choices=["MongoDB", "CouchDB"], help="Pilih platform database (default MongoDB)")
    parser.add_argument("--dbPort", type=int, help="Port database (default 27017 for MongoDB, 5984 for CouchDB)")
    parser.add_argument("--myIP", help="IP lokal attacker / listener")
    parser.add_argument("--myPort", help="Port listener attacker")
    parser.add_argument("--victim", help="Target IP / hostname")
    parser.add_argument("--webPort", type=int, help="Port HTTP target web app (default 80)")
    parser.add_argument("--uri", help="URI path aplikasi web target")
    parser.add_argument("--https", action="store_true", help="Gunakan HTTPS")
    parser.add_argument("--verb", action="store_true", help="Verbose mode")
    parser.add_argument("--httpMethod", choices=["GET", "POST"], help="HTTP Method (default GET)")
    parser.add_argument("--requestHeaders", help="Header HTTP, format key,value,key,value,...")
    parser.add_argument("--postData", help="Data POST, format key,value,key,value,...")
    parser.add_argument("--attack", action="store_true", help="Jalankan attack langsung tanpa menu")
    args = parser.parse_args()

    # Set defaults dan override jika args ada
    if args.platform:
        platform = args.platform
        dbPort = 27017 if platform == "MongoDB" else 5984
    if args.dbPort:
        dbPort = args.dbPort
    if args.myIP:
        myIP = args.myIP
    if args.myPort:
        myPort = str(args.myPort)
    if args.victim:
        victim = args.victim
    if args.webPort:
        webPort = args.webPort
    if args.uri:
        uri = args.uri
    if args.https:
        https = True
    if args.verb:
        verb = True
    if args.httpMethod:
        httpMethod = args.httpMethod
    if args.requestHeaders:
        requestHeaders = build_request_headers(args.requestHeaders)
    if args.postData:
        postData = build_post_data(args.postData)

    if args.attack:
        attack(args)
    else:
        mainMenu()

# --- fungsi mainMenu, options, platSel, validate_ip_or_dns tetap seperti sebelumnya ---

# ... (salin fungsi mainMenu(), options(), platSel(), validate_ip_or_dns() dari kode sebelumnya)

if __name__ == "__main__":
    main()
