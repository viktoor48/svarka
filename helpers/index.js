function transliterate(str) {
    const rusToEngMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };

    return str.split('').map(char => rusToEngMap[char] || char).join('');
}

function convertToSlug(str) {
    return transliterate(str.toLowerCase())
        .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
        .replace(/[^\w\-]+/g, '') // Удаляем все символы кроме букв, цифр, дефисов и знаков подчеркивания
        .replace(/\-\-+/g, '-') // Заменяем два и более дефиса подряд на один дефис
        .replace(/^-+/, '') // Удаляем дефисы с начала строки
        .replace(/-+$/, ''); // Удаляем дефисы с конца строки
}

function getIdFromUrl(str) {
    const parts = str.split('/');
    return parts[parts.length - 1];
}

export { convertToSlug, getIdFromUrl }