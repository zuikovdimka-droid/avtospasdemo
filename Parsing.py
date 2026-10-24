from playwright.sync_api import sync_playwright
import time
import csv
import json
import datetime

URL = "https://yandex.ru/maps/org/avtospas/1070164398/prices/?display-text=Автодиагностика&ll=37.643776%2C55.777561&mode=search&sll=37.628181%2C55.756142&source=serp_navig&sspn=0.125932%2C0.042991&tab=prices&text=category_id%3A%28211814391477%29&z=13.32"

def run():
    with sync_playwright() as p:
        print("1. Открываем браузер...")
        browser = p.chromium.launch(headless=False) 
        page = browser.new_page()

        print("2. Переходим по ссылке и ждем загрузки...")
        page.goto(URL, wait_until="domcontentloaded", timeout=60000)
        time.sleep(5)

        print("3. Медленно прокручиваем страницу, чтобы загрузились все фото...")
        # Наводим курсор на центр боковой панели
        page.mouse.move(500, 500)
        
        # Прокручиваем вниз небольшими шагами
        for _ in range(20):
            page.mouse.wheel(0, 400)
            time.sleep(1) # Ждем 1 секунду на каждом шаге

        print("4. Ждем завершения загрузки картинок...")
        time.sleep(5) # Даем 5 секунд, чтобы всё точно прогрузилось

        print("5. Извлекаем данные...")
        # Ищем все элементы с ценой
        price_elements = page.locator("xpath=//*[contains(text(), '₽')]").all()
        
        results = []
        
        for el in price_elements:
            try:
                row_json = el.evaluate("""node => {
                    let curr = node;
                    
                    for (let i = 0; i < 8; i++) {
                        if (!curr.parentElement) break;
                        curr = curr.parentElement;
                        
                        let text = (curr.innerText || "").trim();
                        let lines = text.split('\\n').map(s => s.trim()).filter(s => s.length > 0);
                        
                        // Если строк слишком много, мы залезли в глобальный блок
                        if (lines.length > 10) break;

                        if (lines.length >= 2 && text.includes('₽')) {
                            let priceLine = lines.find(l => l.includes('₽'));
                            let nameLine = lines.find(l => !l.includes('₽') && !l.includes('шт') && !l.includes('руб') && l.length > 3);
                            
                            if (nameLine && priceLine && !nameLine.includes('АвтоСпас')) {
                                let cleanPrice = priceLine.split(' ').filter(w => w.includes('₽') || /^\\d+$/.test(w)).join(' ');
                                
                                let imgUrl = "";
                                // Ищем ТОЛЬКО картинки с домена аватарок Яндекса
                                let imgs = curr.querySelectorAll('img');
                                for (let img of imgs) {
                                    let src = img.src || img.getAttribute('data-src');
                                    if (src && src.includes('avatars.mds.yandex.net')) {
                                        imgUrl = src;
                                        break;
                                    }
                                }
                                
                                // Если нашли картинку, возвращаем результат
                                if (imgUrl) {
                                    return JSON.stringify({ 
                                        title: nameLine, 
                                        price: cleanPrice, 
                                        image: imgUrl 
                                    });
                                }
                            }
                        }
                    }
                    return null;
                }""")
                
                if row_json:
                    data = json.loads(row_json)
                    if data["title"]:
                        results.append(data)
            except Exception as e:
                pass

        # Убираем дубликаты
        unique_results = []
        seen = set()
        for r in results:
            if r["title"] not in seen:
                unique_results.append(r)
                seen.add(r["title"])

        # Сохраняем в CSV
        current_time = datetime.datetime.now().strftime("%H-%M-%S")
        filename = f"prices_photos_{current_time}.csv"
        
        try:
            with open(filename, "w", encoding="utf-8-sig", newline="") as f:
                writer = csv.writer(f, delimiter=';')
                writer.writerow(["Название услуги", "Цена", "Ссылка на фото"])
                
                for item in unique_results:
                    writer.writerow([item["title"], item["price"], item["image"]])
                    
            print(f"\nУСПЕХ! Сохранено {len(unique_results)} записей в файл {filename}.")
            
            # Проверяем, у скольких услуг нашлись фото
            with_photos = sum(1 for r in unique_results if r["image"])
            print(f"Из них с фотографиями: {with_photos} из {len(unique_results)}")
            
        except PermissionError:
            print(f"\n❌ ОШИБКА: Не удалось сохранить файл {filename}. Закройте его в Excel.")
            
        browser.close()

if __name__ == "__main__":
    run()