"""
خادم تشغيل محلي فائق السرعة لموقع ولوحة تحكم مطعم كشري الزعيم
Local HTTP Server for Koshary El Zaeem
"""

import http.server
import socketserver
import os
import sys

# Ensure UTF-8 output encoding for Windows command line
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("============================================================")
        print("Koshary El Zaeem Server Running Successfully!")
        print(f"Main Website:    http://localhost:{PORT}/index.html")
        print(f"Full Menu:       http://localhost:{PORT}/menu.html")
        print(f"Order Tracking:  http://localhost:{PORT}/track.html")
        print(f"Admin Dashboard: http://localhost:{PORT}/admin.html")
        print("============================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)

if __name__ == '__main__':
    run()
