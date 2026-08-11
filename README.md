# Cyberbullying Detector — Backend API

Flask API that serves the ML model behind the "Cyberbullying Detector" Chrome
extension. `POST /detect` with form field `user_input` and it returns whether
the text is offensive plus the predicted cyberbullying category.

## What was broken (and is now fixed)

1. **`app.run(..., request_timeout=3)`** — `request_timeout` is not a valid
   argument for Flask/Werkzeug's dev server. This crashed the app on every
   single startup with `TypeError: run_simple() got an unexpected keyword
   argument 'request_timeout'`. This is almost certainly the real reason the
   deployment never stayed "up" — it wasn't just Railway sleeping, the process
   was failing to boot at all.
2. **Binary detection logic was wrong.** `binary_cyberbullying_detection`
   compared the *class index* returned by the multi-class model to a
   hardcoded `1`. Since the label encoder maps `1 → "ethnicity"`, the app
   only ever flagged text as "unsafe" when it was ethnicity-related bullying
   — everything else (insults, harassment, threats in other categories) was
   reported as "safe". It's fixed to flag anything that isn't the
   `not_cyberbullying` class.
3. **Dev server in production.** `Procfile` ran `python app.py`, i.e.
   Flask's single-threaded development server, not something you should run
   in production (Flask itself warns about this). It's now `gunicorn`.
4. Minor cleanup: the model files were loaded twice, `Pillow`/`Image.open`
   was imported and never used, `requirements.txt` had a lot of unused
   packages (pandas, statsmodels, tweepy, tornado, google-trans-new...) that
   just slow down every fresh install/deploy.

## Redeploying

Railway pauses/deactivates free-tier services after inactivity, and can
require a card on file to resume — that's what happened to the original
deployment. Two free options:

### Option A — Railway (new project)
1. Push this folder to a GitHub repo.
2. On [railway.app](https://railway.app), New Project → Deploy from GitHub repo.
3. Railway auto-detects `requirements.txt` + `Procfile` (Nixpacks). No extra config needed.
4. Once deployed, copy the public URL Railway gives you (Settings → Networking → Generate Domain).

### Option B — Render (render.com)
1. Push this folder to a GitHub repo.
2. New → Web Service → connect the repo.
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn app:app --bind 0.0.0.0:$PORT`
5. Free tier also spins down after inactivity, but wakes on the next request (takes ~30-60s for the first request after idle — this is normal for free hosting, not a bug).

### Testing locally first
```bash
pip install -r requirements.txt
python app.py
# then in another terminal:
curl -X POST -F "user_input=I hate you, you are so stupid" http://127.0.0.1:33507/detect
```

## After redeploying

Copy your new backend URL and paste it into `background.js` in the extension
package, replacing:
```js
const API_BASE_URL = "https://YOUR-BACKEND-URL.example.com";
```
Then re-zip the extension folder (or just reload it unpacked in Chrome).
