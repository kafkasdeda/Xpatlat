from playwright.sync_api import sync_playwright
import json
import asyncio
from playwright.async_api import async_playwright

# 🔍 Ayarlanabilir Parametreler
HASHTAG = "%22jon jones%22%20filter%3Aimages%20min_faves%3A400%20lang%3Atr&src=typed_query4"       
MAX_TWEETS = 10            # En fazla kaç tweet çekilsin
COOKIE_FILE = "twitter_cookies.json"  # Daha önce giriş yapılarak kaydedilmiş cookie'ler

async def scrape():
    tweets = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # Headless=True: tarayıcı görünmez
        context = await browser.new_context()

        # 🍪 Cookie'leri yükle ve bağlam (context) içine ekle
        with open(COOKIE_FILE, "r") as f:
            cookies = json.load(f)
        await context.add_cookies(cookies)

        # 🔐 Auth cookie ile sayfaya erişim
        page = await context.new_page()
        search_url = f"https://x.com/search?q={HASHTAG}"
        await page.goto(search_url)

        # ⏳ Sayfanın yüklenmesini bekle
        await page.wait_for_timeout(5000)
        for _ in range(5):
            await page.mouse.wheel(0, 3000)
            await page.wait_for_timeout(3000)
        

        # 🧾 Tweet'leri sayfadan al (genelde dil bilgisi içeren div'ler gerçek tweet metnidir)
        tweet_elements = await page.query_selector_all("article div[lang]")

        for i, tweet in enumerate(tweet_elements):
            if i >= MAX_TWEETS:
                break
            try:
                text = await tweet.inner_text()
                tweets.append(text)
            except Exception as e:
                print(f"⚠️ Hata: {e}")

        await browser.close()

    # 🎉 Sonuçları yazdır
    print(f"\n📦 Toplam {len(tweets)} tweet bulundu:")
    for i, t in enumerate(tweets, 1):
        print(f"\n{i}. {t}")

if __name__ == "__main__":
    asyncio.run(scrape())