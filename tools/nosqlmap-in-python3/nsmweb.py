#!/usr/bin/python3
# -*- coding: utf-8 -*-
# NoSQLMap Web Module

from exception import NoSQLMapException
import requests
import urllib3
import os
import sys

def args():
    return [
        # jika perlu argumen khusus untuk modul ini
    ]

def getApps(webPort, victim, uri, https, verb, requestHeaders, args=None):
    # NoSQLMap Web GET function
    print("[*] NoSQL Web App attacks (GET)")

    protocol = "https" if https else "http"
    url = f"{protocol}://{victim}:{webPort}{uri}"

    try:
        response = requests.get(url, headers=requestHeaders, timeout=10)
        if verb:
            print(f"[DEBUG] GET {url} headers: {requestHeaders}")
            print(f"[DEBUG] Response status code: {response.status_code}")
            print(f"[DEBUG] Response body:\n{response.text[:500]}")  # tampilkan 500 char saja
        print(f"[+] GET request to {url} selesai dengan status {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"[!] Error saat GET request: {e}")

def postApps(victim, webPort, uri, https, verb, postData, requestHeaders, args=None):
    # NoSQLMap Web POST function
    print("[*] NoSQL Web App attacks (POST)")

    protocol = "https" if https else "http"
    url = f"{protocol}://{victim}:{webPort}{uri}"

    try:
        response = requests.post(url, data=postData, headers=requestHeaders, timeout=10)
        if verb:
            print(f"[DEBUG] POST {url} headers: {requestHeaders}")
            print(f"[DEBUG] POST data: {postData}")
            print(f"[DEBUG] Response status code: {response.status_code}")
            print(f"[DEBUG] Response body:\n{response.text[:500]}")  # tampilkan 500 char saja
        print(f"[+] POST request to {url} selesai dengan status {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"[!] Error saat POST request: {e}")
