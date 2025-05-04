from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # 👀 Headless kapalı: kullanıcı giriş yapsın
    page = browser.new_page()
    page.goto("https://twitter.com/login")
    
    print("➡️ Giriş yapmanı bekliyorum... (500 saniye içinde)")
    page.wait_for_timeout(150000)  # 30 saniye bekle
    
    cookies = page.context.cookies()
    with open("twitter_cookies.json", "w") as f:
        json.dump(cookies, f)

    browser.close()