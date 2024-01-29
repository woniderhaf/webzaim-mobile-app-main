type Translation = Record<string, Record<string, string>>;

const translation: Translation = {
    ru: {

    }
};

class Locales {
    locales: Record<string, string> | null = null;

    constructor(lang: string) {
        if (!lang || !translation[lang]) {
            throw new Error('');
        }

        this.locales = translation[lang];
    }

    locale() {
        return this.locales;
    }
}

export default Locales;
