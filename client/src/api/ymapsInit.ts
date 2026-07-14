

export default async function initMap(
    container: HTMLDivElement | null,
) {
    if (!container) return null;

    if (typeof(window as any).ymaps3 === 'undefined' && !document.getElementById('ymaps-script')) {
        const script = document.createElement('script');
        script.id = 'ymaps-script';
        script.src = 'https://api-maps.yandex.ru/v3/?apikey=d6a02117-88b1-4de6-8555-bcf8b3ab3afd&lang=ru_RU';
        document.head.appendChild(script);
    }

    while (typeof(window as any).ymaps3 === 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    const ymaps = (window as any).ymaps3;

    await ymaps.ready
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = ymaps;
    const map = new YMap(container, {
        location: {
            center: [38.975313, 45.03547],
            zoom: 13
        }
    });
    map.addChild(new YMapDefaultSchemeLayer({}));

    map.addChild(new YMapDefaultFeaturesLayer({}));

    // try{
    //     const markersPackage = await ymaps.import('@yandex/ymaps3-markers@0.0.1');
    //     (window as any).YMapDefaultMarker = markersPackage.YMapDefaultMarker;
    //     window.dispatchEvent(new Event('ymaps3-markers-ready'));
    // } catch(e) {
    //     console.error("Не удалось динамически загрузить маркеры Яндекса:", e);
    // } 

try {
        const { YMapMarker } = ymaps;

        // Пишем свой мини-класс, который полностью заменяет YMapDefaultMarker
        class CustomMarkerEmulator extends YMapMarker {
            constructor(props: any) {
                // Создаем HTML-внешку для маркера
                const element = document.createElement('div');
                element.className = 'custom-yandex-marker';
                element.style.width = '20px';
                element.style.height = '20px';
                element.style.backgroundColor = '#007af5'; // Красивый синий цвет
                element.style.borderRadius = '50%';
                element.style.border = '2px solid white';
                element.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
                element.style.cursor = 'pointer';

                // Если во фронтенде на маркер вешался клик, можно поймать его тут:
                if (props.onClick) {
                    element.addEventListener('click', props.onClick);
                }

                // Передаем настройки и созданный DOM-элемент в родительский класс Яндекса
                super({ location: props.location }, element);
            }
        }

        // Закидываем наш эмулятор в window, чтобы другие компоненты его увидели, когда координаты прилетят
        (window as any).YMapDefaultMarker = CustomMarkerEmulator;
        
        // Машем флажком: "Гитхаб-экшен отработал, маркеры готовы к рендеру!"
        window.dispatchEvent(new Event('ymaps3-markers-ready'));

    } catch (e) {
        console.error("Не удалось проинициализировать эмулятор маркеров:", e);
    }

    return map;
}
