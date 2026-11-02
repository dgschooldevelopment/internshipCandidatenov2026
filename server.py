#!/usr/bin/env python3
"""
DreamsGuider & Sarvaj Edtech Pvt. Ltd.
GenAI Training & Internship Registration Server
Serves static frontend files and writes registration & payment records to CSV & JSON.
"""

import os
import sys
import json
import csv
from http.server import SimpleHTTPRequestHandler, HTTPServer
import urllib.parse

PORT = 5000
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
JSON_FILE = os.path.join(DATA_DIR, "registrations.json")
CSV_FILE = os.path.join(DATA_DIR, "registrations.csv")

os.makedirs(DATA_DIR, exist_ok=True)

if not os.path.exists(JSON_FILE):
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump([], f, indent=2)

CSV_HEADERS = [
    "Registration ID", "Enrolled", "Stage / Status", "Transaction / UTR ID", "Amount (INR)",
    "Full Name", "Phone", "Email", "Track Name", "Duration",
    "College / Institution", "Degree", "Passout Year", "Status",
    "Experience Level", "LinkedIn", "GitHub", "Notes", "Registration Date"
]

if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        writer.writerow(CSV_HEADERS)


def save_records_to_csv(records):
    """Rewrites CSV file with complete headers and updated records."""
    try:
        with open(CSV_FILE, "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.writer(f)
            writer.writerow(CSV_HEADERS)
            for r in records:
                enrolled_status = r.get("enrolled")
                if not enrolled_status:
                    enrolled_status = "Yes (Enrolled)" if r.get("paymentStatus") == "PAID" else "No (Pending Payment)"

                status_text = r.get("statusText") or r.get("stage")
                if not status_text:
                    status_text = "Payment Completed" if r.get("paymentStatus") == "PAID" else "Payment Page Reached"

                utr = r.get("utrNumber") or "Pending"
                if not utr or utr.strip() == "":
                    utr = "Pending"

                writer.writerow([
                    r.get("regId", ""),
                    enrolled_status,
                    status_text,
                    utr,
                    r.get("amount", ""),
                    r.get("fullName", ""),
                    r.get("phone", ""),
                    r.get("email", ""),
                    r.get("trackName", ""),
                    r.get("duration", ""),
                    r.get("college", ""),
                    r.get("degree", ""),
                    r.get("passoutYear", ""),
                    r.get("currentStatus", ""),
                    r.get("experienceLevel", ""),
                    r.get("linkedinUrl", ""),
                    r.get("githubUrl", ""),
                    r.get("notes", ""),
                    r.get("readableDate", r.get("registeredAt", ""))
                ])
    except Exception as e:
        print("Error saving CSV:", e)


class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        if path == "/api/registrations":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            try:
                with open(JSON_FILE, "r", encoding="utf-8") as f:
                    data = f.read()
                self.wfile.write(data.encode("utf-8"))
            except Exception as e:
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        elif path == "/api/export-csv":
            self.send_response(200)
            self.send_header("Content-Type", "text/csv")
            self.send_header("Content-Disposition", "attachment; filename=dreamsguider_registrations.csv")
            self.end_headers()
            try:
                with open(CSV_FILE, "rb") as f:
                    self.wfile.write(f.read())
            except Exception as e:
                self.wfile.write(f"Error reading CSV: {e}".encode("utf-8"))
            return

        return super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        if path == "/api/register":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            
            try:
                candidate = json.loads(body.decode("utf-8"))

                try:
                    with open(JSON_FILE, "r", encoding="utf-8") as f:
                        records = json.load(f)
                except Exception:
                    records = []
                
                # Update existing record or prepend new
                existing_idx = next((i for i, r in enumerate(records) if r.get("regId") == candidate.get("regId")), None)
                if existing_idx is not None:
                    records[existing_idx] = candidate
                else:
                    records.insert(0, candidate)

                with open(JSON_FILE, "w", encoding="utf-8") as f:
                    json.dump(records, f, indent=2, ensure_ascii=False)

                # Update CSV file
                save_records_to_csv(records)

                response_data = {
                    "success": True,
                    "message": "Candidate record saved/updated successfully.",
                    "regId": candidate.get("regId")
                }

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(response_data).encode("utf-8"))

            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()


def run_server():
    if hasattr(sys.stdout, 'reconfigure'):
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except Exception:
            pass

    server_address = ("", PORT)
    httpd = HTTPServer(server_address, CustomHandler)
    print("=" * 65)
    print(" [DreamsGuider & Sarvaj Edtech Internship Server Running]")
    print(f" Web Link: http://localhost:{PORT}")
    print(f" Data Directory: {DATA_DIR}")
    print(f" Excel / CSV File: {CSV_FILE}")
    print("=" * 65)
    print("Press Ctrl+C to stop the server.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()


if __name__ == "__main__":
    run_server()
