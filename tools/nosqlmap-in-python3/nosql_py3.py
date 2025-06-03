import os
import sys
import json
import signal
import argparse
from exception import NoSQLMapException
import nsmcouch
import nsmmongo
import nsmscan
import nsmweb
import re
# Variabel global default contoh (sesuaikan dengan programmu)
platform = "Not Set"
victim = "Not Set"
dbPort = 27017
myIP = "127.0.0.1"
myPort = 8080
webPort = 80
uri = "Not Set"
https = False
verb = ""
httpMethod = "GET"
requestHeaders = {}
postData = {}

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
        print("0 - Load options file")
        print("1 - Set options")
        print("2 - NoSQL DB Access Attacks")
        print("3 - NoSQL Web App attacks")
        print("4 - Scan for Anonymous " + platform + " Access")
        print("5 - Change Platform (Current: " + platform + ")")
        print("a - Load options from saved Burp request")
        print("b - Save options file")
        print("c - Clear all options (reset to default)")
        print("h - Set headers")
        print("v - View current options")
        print("x - Exit")

        select = input("Select an option: ").strip().lower()

        if select == "0":
            load_options_file()
        elif select == "1":
            options()
        elif select == "2":
            if victim != "Not Set":
                attack()
            else:
                input("Target not set! Check options. Press enter to continue...")
        elif select == "3":
            if victim != "Not Set" and uri != "Not Set":
                try:
                    if httpMethod.upper() == "GET":
                        nsmweb.getApps(webPort, victim, uri, https, verb, requestHeaders)
                    elif httpMethod.upper() == "POST":
                        nsmweb.postApps(victim, webPort, uri, https, verb, postData, requestHeaders)
                    else:
                        print("[!] HTTP Method tidak dikenali.")
                except Exception as e:
                    print(f"[!] Error during Web App attack: {e}")
                input("Press enter to continue...")
            else:
                input("Options not set! Check host and URI path. Press enter to continue...")
        elif select == "4":
            try:
                scanResult = nsmscan.massScan(platform)
                if scanResult and len(scanResult) > 1:
                    victim = scanResult[1]
                    input(f"Scan found vulnerable target: {victim}. Press enter to continue...")
                else:
                    input("No vulnerable targets found. Press enter to continue...")
            except Exception as e:
                print(f"[!] Error during scanning: {e}")
                input("Press enter to continue...")
        elif select == "5":
            platSel()
        elif select == "a":
            load_burp_request()
        elif select == "b":
            save_options_file()
        elif select == "c":
            clear_options()
        elif select == "h":
            set_headers()
        elif select == "v":
            view_options()
        elif select == "x":
            print("Exiting...")
            sys.exit(0)
        else:
            input("Invalid selection. Press enter to continue...")

def load_options_file():
    global victim, webPort, uri, https, platform, httpMethod, postData, myIP, myPort, verb, dbPort, requestHeaders
    filename = input("Enter options filename to load: ").strip()
    try:
        with open(filename, "r") as f:
            data = json.load(f)
        victim = data.get("victim", victim)
        webPort = data.get("webPort", webPort)
        uri = data.get("uri", uri)
        https = data.get("https", https)
        platform = data.get("platform", platform)
        httpMethod = data.get("httpMethod", httpMethod)
        postData = data.get("postData", postData)
        myIP = data.get("myIP", myIP)
        myPort = data.get("myPort", myPort)
        verb = data.get("verb", verb)
        dbPort = data.get("dbPort", dbPort)
        requestHeaders = data.get("requestHeaders", requestHeaders)
        input(f"Options loaded from {filename}. Press enter to continue...")
    except Exception as e:
        input(f"[!] Failed to load options: {e}. Press enter to continue...")

def save_options_file():
    global victim, webPort, uri, https, platform, httpMethod, postData, myIP, myPort, verb, dbPort, requestHeaders
    filename = input("Enter filename to save options: ").strip()
    try:
        data = {
            "victim": victim,
            "webPort": webPort,
            "uri": uri,
            "https": https,
            "platform": platform,
            "httpMethod": httpMethod,
            "postData": postData,
            "myIP": myIP,
            "myPort": myPort,
            "verb": verb,
            "dbPort": dbPort,
            "requestHeaders": requestHeaders,
        }
        with open(filename, "w") as f:
            json.dump(data, f, indent=4)
        input(f"Options saved to {filename}. Press enter to continue...")
    except Exception as e:
        input(f"[!] Failed to save options: {e}. Press enter to continue...")

def load_burp_request():
    global victim, webPort, uri, https, platform, httpMethod, postData, myIP, myPort, verb, dbPort, requestHeaders
    filename = input("Enter Burp request filename to load: ").strip()
    try:
        with open(filename, "r") as f:
            lines = f.readlines()

        method = None
        uri_path = None
        headers = {}
        post_data = {}
        is_headers = False
        is_body = False
        body_lines = []

        for line in lines:
            line = line.strip()
            if not line:
                # Header-body boundary
                is_headers = False
                is_body = True
                continue
            if method is None:
                parts = line.split()
                if len(parts) >= 3:
                    method, uri_path = parts[0], parts[1]
                    httpMethod = method.upper()
                    uri = uri_path
                    is_headers = True
                continue
            if is_headers:
                if ":" in line:
                    k, v = line.split(":", 1)
                    headers[k.strip()] = v.strip()
            elif is_body:
                body_lines.append(line)

        host = headers.get("Host")
        if host:
            victim = host.split(":")[0]

        if httpMethod == "POST" and body_lines:
            body = "\n".join(body_lines)
            postData.clear()
            for pair in body.split("&"):
                if "=" in pair:
                    k, v = pair.split("=", 1)
                    postData[k] = v

        requestHeaders.clear()
        requestHeaders.update(headers)

        input(f"Burp request loaded from {filename}. Press enter to continue...")
    except Exception as e:
        input(f"[!] Failed to load Burp request: {e}. Press enter to continue...")

def set_headers():
    global requestHeaders
    print("Current headers:")
    for k, v in requestHeaders.items():
        print(f"{k}: {v}")
    print("Enter headers in format key,value,key,value,... or empty to cancel.")
    headers_in = input("Headers: ").strip()
    if not headers_in:
        return
    try:
        reqHeadersArray = headers_in.split(",")
        if len(reqHeadersArray) % 2 != 0:
            input("[!] Invalid headers format. Press enter to continue...")
            return
        headerNames = reqHeadersArray[0::2]
        headerValues = reqHeadersArray[1::2]
        requestHeaders = dict(zip(headerNames, headerValues))
        input("Headers updated. Press enter to continue...")
    except Exception as e:
        input(f"[!] Error parsing headers: {e}. Press enter to continue...")

def clear_options():
    global platform, victim, dbPort, myIP, myPort, webPort, uri, https, verb, httpMethod, requestHeaders, postData
    platform = "Not Set"
    victim = "Not Set"
    dbPort = 27017
    myIP = "127.0.0.1"
    myPort = 8080
    webPort = 80
    uri = "Not Set"
    https = False
    verb = ""
    httpMethod = "GET"
    requestHeaders = {}
    postData = {}
    input("All options cleared to default. Press enter to continue...")

def view_options():
    global platform, victim, dbPort, myIP, myPort, webPort, uri, https, verb, httpMethod, requestHeaders, postData
    print("Current Options:")
    print(f"Platform      : {platform}")
    print(f"Victim       : {victim}")
    print(f"DB Port      : {dbPort}")
    print(f"My IP        : {myIP}")
    print(f"My Port      : {myPort}")
    print(f"Web Port     : {webPort}")
    print(f"URI          : {uri}")
    print(f"HTTPS        : {https}")
    print(f"Verb         : {verb}")
    print(f"HTTP Method  : {httpMethod}")
    print(f"Request Headers:")
    for k, v in requestHeaders.items():
        print(f"  {k}: {v}")
    print(f"Post Data    : {postData}")
    input("\nPress enter to continue...")

# Dummy placeholder functions for missing parts in your original program
def options():
    input("Options menu placeholder. Press enter to continue...")

def attack():
    input("Attack function placeholder. Press enter to continue...")

def platSel():
    input("Platform selection placeholder. Press enter to continue...")

# Dummy imported modules placeholders, replace with actual imports if needed
class nsmweb:
    @staticmethod
    def getApps(webPort, victim, uri, https, verb, requestHeaders):
        print(f"Simulate getApps with {victim} {uri}")

    @staticmethod
    def postApps(victim, webPort, uri, https, verb, postData, requestHeaders):
        print(f"Simulate postApps with {victim} {uri}")

class nsmscan:
    @staticmethod
    def massScan(platform):
        print(f"Simulate massScan on platform {platform}")
        return [None, "192.168.1.100"]

if __name__ == "__main__":
    mainMenu()
