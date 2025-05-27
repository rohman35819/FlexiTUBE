# utils/logger.py
import datetime
import os

LOG_FOLDER = "logs"
if not os.path.exists(LOG_FOLDER):
    os.makedirs(LOG_FOLDER)

def log_akses(ip, endpoint, method="GET", user_agent="-"):
    waktu = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_entry = f"[{waktu}] IP: {ip} - Endpoint: {endpoint} - Method: {method} - Agent: {user_agent}\n"
    with open(os.path.join(LOG_FOLDER, "akses.log"), "a") as f:
        f.write(log_entry)

def log_error(error_message, context="General"):
    waktu = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_entry = f"[{waktu}] ERROR in {context}: {error_message}\n"
    with open(os.path.join(LOG_FOLDER, "error.log"), "a") as f:
        f.write(log_entry)

# Tambahan fungsi untuk logging custom event (opsional)
def log_event(event_message):
    waktu = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_entry = f"[{waktu}] EVENT: {event_message}\n"
    with open(os.path.join(LOG_FOLDER, "event.log"), "a") as f:
        f.write(log_entry)
