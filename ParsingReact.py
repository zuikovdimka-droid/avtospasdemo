from playwright.sync_api import sync_playwright
import time
import csv
import datetime
import json
import re

URL = "https://yandex.ru/maps/org/avtospas/1070164398/reviews/"

def run():
    with sync_playwright() as p:
        print("1. Открываем браузер...")
        browser = p.chromium.launch(headless=False) 
        page = browser.new_page()

        print("2. Переходим на страницу отзывов...")
        page.goto(URL, wait_until="domcontentloaded", timeout=60000)
        time.sleep(5)

        print("3. Прокручиваем страницу для загрузки ВСЕХ отзывов...")
        page.mouse.move(500, 500)
        for i in range(50): 
            page.mouse.wheel(0, 1500)
            time.sleep(1.5) 
            try:
                btn = page.locator("button:has-text('Показать ещё')").first
                if btn.is_visible():
                    btn.click()
                    time.sleep(2)
            except:
                pass

        print("4. Ждем 3 секунды и начинаем сбор...")
        time.sleep(3)

        # Извлекаем отзывы, включая дату
        reviews_json = page.evaluate("""() => {
            let results = [];
            let blocks = document.querySelectorAll('div[class*="business-review-view"]');
            
            for (let block of blocks) {
                let text = "";
                let rating = "";
                let dateStr = "";
                
                // 1. Оценка
                let metaRating = block.querySelector('meta[itemprop="ratingValue"]');
                if (metaRating) rating = metaRating.getAttribute('content');
                
                // 2. Текст
                let textEl = block.querySelector('span[itemprop="reviewBody"]') || 
                             block.querySelector('div[class*="spoiler-view__text"]') ||
                             block.querySelector('div[class*="business-review-view__body-text"]');
                if (textEl) text = textEl.innerText.trim();
                
                // 3. Дата (ищем в микроразметке meta)
                let metaDate = block.querySelector('meta[itemprop="datePublished"]');
                if (metaDate) {
                    dateStr = metaDate.getAttribute('content'); // Обычно в формате YYYY-MM-DD
                } else {
                    // Если нет meta, ищем по классу
                    let dateEl = block.querySelector('span[class*="date"]');
                    if (dateEl) dateStr = dateEl.innerText.trim();
                }
                
                if (text && text.length > 5) {
                    results.push({ 
                        rating: rating ? rating + " ⭐" : "Без оценки", 
                        date: dateStr,
                        text: text.replace(/\\n/g, ' ') 
                    });
                }
            }
            return JSON.stringify(results);
        }""")

        data = json.loads(reviews_json)
        
        unique_reviews = []
        seen = set()
        for r in data:
            clean_text = r['text']
            # На всякий случай чистим от прилипших дат в начале текста
            clean_text = re.sub(r'^[а-яА-Я]{3,8}\.\d{2}\s*', '', clean_text) 
            clean_text = re.sub(r'^\d{1,2}\s+[а-яА-Я]+\s+\d{4}\s*', '', clean_text) 
            
            # Обрабатываем дату (если она в формате YYYY-MM-DD, меняем на DD.MM.YYYY)
            date_val = r['date']
            if re.match(r'^\d{4}-\d{2}-\d{2}$', date_val):
                try:
                    dt = datetime.datetime.strptime(date_val, "%Y-%m-%d")
                    date_val = dt.strftime("%d.%m.%Y")
                except:
                    pass
            
            if clean_text and clean_text not in seen:
                unique_reviews.append({
                    "rating": r["rating"],
                    "date": date_val if date_val else "Дата не найдена",
                    "text": clean_text.strip()
                })
                seen.add(clean_text)

        # Сохраняем в CSV (теперь 3 колонки)
        current_time = datetime.datetime.now().strftime("%H-%M-%S")
        filename = f"reviews_with_date_{current_time}.csv"
        
        try:
            with open(filename, "w", encoding="utf-8-sig", newline="") as f:
                writer = csv.writer(f, delimiter=';')
                writer.writerow(["Оценка", "Дата", "Текст отзыва"])
                
                for item in unique_reviews:
                    writer.writerow([item["rating"], item["date"], item["text"]])
                    
            print(f"\nУСПЕХ! Сохранено {len(unique_reviews)} отзывов в файл {filename}.")
            
            print("\nПримеры первых 3 отзывов:")
            for r in unique_reviews[:3]:
                print(f"⭐ {r['rating']} | 📅 {r['date']}")
                print(f"📝 {r['text'][:100]}...")
                print("-" * 30)
                
        except PermissionError:
            print(f"\n❌ ОШИБКА: Не удалось сохранить файл {filename}. Закройте его в Excel.")
            
        browser.close()

if __name__ == "__main__":
    run()