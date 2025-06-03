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
    global platform, victim, webPort, dbPort, myIP, myPort
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

def mainMenu():
    global platform, victim, dbPort, myIP, myPort, webPort, uri, https, verb, httpMethod, requestHeaders, postData

    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        print(" _ _ ___ ___ _ __ __ ")
        print("| \\| |___/ __|/ _ \\| | | \\/ |__ _ _ __ ")
        print("| . / _ \\__ \\ (_) | |__| |\\/| / _ \\| '_ \\")
        print("|_|\\_\\___/___/\\__\\_\\____|_| |_\\__,_| .__/")
        print(" v0.7 codingo@protonmail.com |_| ")
        print("\n")
        print("1-Set options")
        print("2-NoSQL DB Access Attacks")
        print("3-NoSQL Web App attacks")
        print("4-Scan for Anonymous " + platform + " Access")
        print("5-Change Platform (Current: " + platform + ")")
        print("x-Exit")

        select = input("Select an option: ").strip()

        if select == "1":
            options()
        elif select == "2":
            if victim != "Not Set":
                if platform == "MongoDB":
                    nsmmongo.netAttacks(victim, int(dbPort), myIP, myPort)
                elif platform == "CouchDB":
                    nsmcouch.netAttacks(victim, int(dbPort), myIP)
            else:
                input("Target not set! Check options. Press enter to continue...")
        elif select == "3":
            if victim != "Not Set" and uri != "Not Set":
                if httpMethod == "GET":
                    nsmweb.getApps(webPort, victim, uri, https, verb, requestHeaders)
                elif httpMethod == "POST":
                    nsmweb.postApps(victim, webPort, uri, https, verb, postData, requestHeaders)
            else:
                input("Options not set! Check host and URI path. Press enter to continue...")
        elif select == "4":
            scanResult = nsmscan.massScan(platform)
            if scanResult:
                victim = scanResult[1]
                input(f"Scan found vulnerable target: {victim}. Press enter to continue...")
        elif select == "5":
            platSel()
        elif select.lower() == "x":
            print("Exiting...")
            sys.exit(0)
        else:
            input("Invalid selection. Press enter to continue...")

def platSel():
    global platform, dbPort
    while True:
        print("\n1-MongoDB")
        print("2-CouchDB")
        pSel = input("Select a platform: ").strip()
        if pSel == "1":
            platform = "MongoDB"
            dbPort = 27017
            break
        elif pSel == "2":
            platform = "CouchDB"
            dbPort = 5984
            break
        else:
            input("Invalid selection. Press enter to continue...")

def options():
    global victim, webPort, uri, https, platform, httpMethod, postData, myIP, myPort, verb, dbPort, requestHeaders

    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        print("\nOptions")
        print(f"1-Set target host/IP (Current: {victim})")
        print(f"2-Set web app port (Current: {webPort})")
        print(f"3-Set App Path (Current: {uri})")
        print(f"4-Toggle HTTPS (Current: {'ON' if https else 'OFF'})")
        print(f"5-Set {platform} Port (Current : {dbPort})")
        print(f"6-Set HTTP Request Method (GET/POST) (Current: {httpMethod})")
        print(f"7-Set my local {platform}/Shell IP (Current: {myIP})")
        print(f"8-Set shell listener port (Current: {myPort})")
        print(f"9-Toggle Verbose Mode: (Current: {'ON' if verb else 'OFF'})")
        print("x-Back to main menu")

        select = input("Select an option: ").strip()

        if select == "1":
            victim_input = input("Enter the host IP/DNS name: ").strip()
            if validate_ip_or_dns(victim_input):
                victim = victim_input
            else:
                input("Invalid IP or DNS. Press enter to continue...")
        elif select == "2":
            webPort = int(input("Enter the HTTP port for web apps: ").strip())
        elif select == "3":
            uri = input("Enter the URI of the application: ").strip()
        elif select == "4":
            https = not https
            print(f"HTTPS turned {'ON' if https else 'OFF'}")
            input("Press enter to continue...")
        elif select == "5":
            dbPort = int(input(f"Enter the {platform} Port number: ").strip())
        elif select == "6":
            httpMethod = "POST" if httpMethod == "GET" else "GET"
            print(f"HTTP Method set to {httpMethod}")
            input("Press enter to continue...")
        elif select == "7":
            myIP = input("Enter your local IP: ").strip()
        elif select == "8":
            myPort = input("Enter the port to listen on: ").strip()
        elif select == "9":
            verb = not verb
            print(f"Verbose mode {'ON' if verb else 'OFF'}")
            input("Press enter to continue...")
        elif select.lower() == "x":
            break
        else:
            input("Invalid selection. Press enter to continue...")

def validate_ip_or_dns(address):
    # Simple IP or DNS validation
    octets = address.split(".")
    if len(octets) == 4:
        try:
            for octet in octets:
                if not 0 <= int(octet) <= 255:
                    return False
            return True
        except:
            return False
    # Simple DNS validation (can be improved)
    if len(address) > 0 and " " not in address:
        return True
    return False

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

if __name__ == "__main__":
    main()
