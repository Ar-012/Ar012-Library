#!/usr/bin/env python3
"""Optional external URL probe. No catalog mutation; HTTP status is not content verification."""
import concurrent.futures
import datetime
import json
from pathlib import Path
import subprocess
ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'data/catalog.js').read_text().split('=', 1)[1].strip().rstrip(';'))
urls = sorted({link['url'] for resource in data for link in resource['links']})
def check(url):
    args = ['curl', '--silent', '--show-error', '--location', '--head', '--max-time', '12', '--max-redirs', '5', '--output', '/dev/null', '--write-out', '%{http_code}\n%{url_effective}', url]
    p = subprocess.run(args, capture_output=True, text=True)
    result = p.stdout.splitlines()
    status = int(result[0]) if result and result[0].isdigit() else 0
    head_status = status
    if status in [404, 405, 410]:
        args.remove('--head')
        args[1:1] = ['--range', '0-0', '--max-filesize', '1048576']
        p = subprocess.run(args, capture_output=True, text=True)
        result = p.stdout.splitlines()
        status = int(result[0]) if result and result[0].isdigit() else 0
    return {'headStatus': head_status, 'url': url, 'status': status, 'effectiveURL': result[1] if len(result)>1 else url, 'curlExit': p.returncode, 'error': p.stderr.strip(), 'result': 'responded' if 200 <= status < 400 else 'not-found' if status in [404,410] else 'unconfirmed'}
with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
    results = list(pool.map(check, urls))
report = {'checkedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'method': 'HEAD (GET range retry for 404/405/410), follow redirects, 12s timeout; no automatic deletion or URL rewrite; responded does not verify content', 'summary': {key: sum(row['result']==key for row in results) for key in ['responded','not-found','unconfirmed']}, 'results': results}
(ROOT / 'docs/link-check.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
print(json.dumps(report['summary'], ensure_ascii=False))
